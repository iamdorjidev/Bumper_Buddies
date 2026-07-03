import { useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

export const useAvailability = (selectedDate) => {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all future bookings to determine fully booked dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];

      // Using date range comparison as required by PocketBase best practices
      const records = await pb.collection('bookings').getFullList({
        filter: `bookingDate >= "${todayStr} 00:00:00"`,
        sort: 'bookingDate',
        $autoCancel: false
      });
      
      setAllBookings(records);
    } catch (err) {
      console.error('Error fetching availability:', err);
      setError('Failed to load availability. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Group bookings by date string (YYYY-MM-DD)
  const bookingsByDate = allBookings.reduce((acc, booking) => {
    const dateStr = booking.bookingDate.split(' ')[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(booking.bookingTime);
    return acc;
  }, {});

  // A date is fully booked if it has bookings for all available time slots
  const fullyBookedDates = Object.keys(bookingsByDate).filter(
    dateStr => bookingsByDate[dateStr].length >= TIME_SLOTS.length
  );

  let bookedSlots = [];
  let availableSlots = [...TIME_SLOTS];
  let isFullyBooked = false;

  if (selectedDate) {
    // Format selected date to local YYYY-MM-DD to match our grouped keys
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const selectedDateStr = `${year}-${month}-${day}`;

    bookedSlots = bookingsByDate[selectedDateStr] || [];
    availableSlots = TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));
    isFullyBooked = availableSlots.length === 0;
  }

  return {
    bookedSlots,
    availableSlots,
    fullyBookedDates,
    isFullyBooked,
    loading,
    error,
    refetch: fetchBookings,
    TIME_SLOTS
  };
};