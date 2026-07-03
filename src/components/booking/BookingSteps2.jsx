import React from 'react';
import { Button } from '@/components/ui/button';

const SERVICES = [
  { id: 'Bumper Repair', name: 'Bumper Repair', price: 'from $150', desc: 'Fix cracks, dents, and scratches on your bumper.' },
  { id: 'Paint Touch-up', name: 'Paint Touch-up', price: 'from $85', desc: 'Precision color-matching for minor scratches.' },
  { id: 'Dent Removal', name: 'Dent Removal', price: 'from $120', desc: 'Paintless dent removal for smooth finishes.' },
  { id: 'Scratch Repair', name: 'Scratch Repair', price: 'from $95', desc: 'Deep buffing and clear-coat restoration.' },
  { id: 'Undercarriage Wash', name: 'Undercarriage Wash', price: 'from $60', desc: 'Thorough cleaning of your vehicle underside.' },
  { id: 'Full Detail', name: 'Full Detail', price: 'from $250', desc: 'Complete interior and exterior deep clean.' },
];

const BookingStep2 = ({ formData, updateData, onNext, onPrev, availability }) => {
  // availability prop is passed down from BookingFlow as requested, 
  // keeping the hook logic DRY and accessible across steps.
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
        {SERVICES.map((srv) => (
          <div 
            key={srv.id}
            onClick={() => updateData({ service: srv.id })}
            className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              formData.service === srv.id 
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-foreground text-sm">{srv.name}</h4>
              <span className="text-xs font-medium text-primary">{srv.price}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{srv.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrev}>Back</Button>
        <Button onClick={onNext} disabled={!formData.service}>Next Step</Button>
      </div>
    </div>
  );
};

export default BookingStep2;