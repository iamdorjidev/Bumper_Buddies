import React, { useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';

const BookingStep3 = ({ formData, updateData, onPrev, onSubmit, isSubmitting, availability }) => {
  const { 
    bookedSlots, 
    fullyBookedDates, 
    loading, 
    error, 
    TIME_SLOTS 
  } = availability;

  // Reset selected time if it becomes booked due to real-time updates
  useEffect(() => {
    if (formData.time && bookedSlots.includes(formData.time)) {
      updateData({ time: '' });
    }
  }, [bookedSlots, formData.time, updateData]);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <Label>Select Date *</Label>
          <div className="border rounded-md inline-block bg-card relative">
            {loading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => updateData({ date, time: '' })}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Disable past dates and Sundays
                if (date < today || date.getDay() === 0) return true;

                // Check if date is fully booked
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;

                return fullyBookedDates.includes(dateStr);
              }}
              modifiers={{
                fullyBooked: (date) => {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const day = String(date.getDate()).padStart(2, '0');
                  return fullyBookedDates.includes(`${year}-${month}-${day}`);
                }
              }}
              modifiersStyles={{
                fullyBooked: { textDecoration: 'line-through', opacity: 0.5 }
              }}
              className="rounded-md"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Crossed out dates are fully booked.
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <Label>Select Time *</Label>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking availability...
            </div>
          ) : !formData.date ? (
            <p className="text-sm text-muted-foreground mt-2">Please select a date first.</p>
          ) : (
            <Select 
              value={formData.time} 
              onValueChange={(val) => updateData({ time: val })}
            >
              <SelectTrigger className="w-full text-foreground bg-background">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  return (
                    <SelectItem 
                      key={slot} 
                      value={slot}
                      disabled={isBooked}
                      className={isBooked ? "line-through text-muted-foreground opacity-50" : ""}
                    >
                      {slot} {isBooked && '(Booked)'}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isSubmitting}>Back</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!formData.date || !formData.time || isSubmitting || error}
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...</>
          ) : 'Complete Booking'}
        </Button>
      </div>
    </div>
  );
};

export default BookingStep3;