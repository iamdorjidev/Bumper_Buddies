import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast.js';
import { useBooking } from '@/contexts/BookingContext.jsx';
import { useAvailability } from '@/hooks/useAvailability.js';
import pb from '@/lib/pocketbaseClient.js';
import BookingStep1 from './BookingStep1.jsx';
import BookingStep2 from './BookingStep2.jsx';
import BookingStep3 from './BookingStep3.jsx';

const INITIAL_DATA = {
  name: '',
  phone: '',
  location: 'store',
  address: '',
  service: '',
  date: null,
  time: ''
};

const BookingFlow = () => {
  const { isBookingOpen, closeBooking, preselectedService } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch availability data using the custom hook
  const availability = useAvailability(formData.date);

  useEffect(() => {
    if (isBookingOpen) {
      setStep(1);
      setFormData(prev => ({
        ...INITIAL_DATA,
        service: preselectedService || prev.service
      }));
      // Refetch availability when modal opens to ensure fresh data
      availability.refetch();
    }
  }, [isBookingOpen, preselectedService]);

  const updateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Final safety check before submission
      if (availability.bookedSlots.includes(formData.time)) {
        throw new Error('This time slot was just booked by someone else. Please select another time.');
      }

      const payload = {
        customerName: formData.name,
        customerPhone: formData.phone,
        serviceType: formData.service,
        serviceLocation: formData.location,
        customerAddress: formData.location === 'home' ? formData.address : '',
        bookingDate: formData.date.toISOString(),
        bookingTime: formData.time,
        bookingStatus: 'pending'
      };

      const record = await pb.collection('bookings').create(payload, { $autoCancel: false });
      
      closeBooking();
      navigate(`/booking-confirmation/${record.id}`, { state: { booking: record } });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Booking Failed',
        description: err.message || 'We could not complete your booking. Please try again.',
        variant: 'destructive'
      });
      // Refetch availability in case the failure was due to a double-booking
      availability.refetch();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isBookingOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === 1 && 'Step 1: Your Details'}
            {step === 2 && 'Step 2: Choose Service'}
            {step === 3 && 'Step 3: Select Date & Time'}
          </DialogTitle>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && (
            <BookingStep1 
              formData={formData} 
              updateData={updateData} 
              onNext={handleNext} 
            />
          )}
          {step === 2 && (
            <BookingStep2 
              formData={formData} 
              updateData={updateData} 
              onNext={handleNext} 
              onPrev={handlePrev}
              availability={availability}
            />
          )}
          {step === 3 && (
            <BookingStep3 
              formData={formData} 
              updateData={updateData} 
              onPrev={handlePrev} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
              availability={availability}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlow;