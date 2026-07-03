import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const openBooking = (service = '') => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setTimeout(() => setPreselectedService(''), 300);
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, preselectedService }}>
      {children}
    </BookingContext.Provider>
  );
};