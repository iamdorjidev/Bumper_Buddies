import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

const BookingStep1 = ({ formData, updateData, onNext }) => {
  const handleNext = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input 
          id="name" 
          required 
          value={formData.name} 
          onChange={(e) => updateData({ name: e.target.value })} 
          placeholder="John Doe" 
          className="text-foreground"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input 
          id="phone" 
          type="tel" 
          required 
          value={formData.phone} 
          onChange={(e) => updateData({ phone: e.target.value })} 
          placeholder="(555) 123-4567" 
          className="text-foreground"
        />
      </div>

      <div className="space-y-3 pt-2">
        <Label>Service Location *</Label>
        <RadioGroup 
          value={formData.location} 
          onValueChange={(val) => updateData({ location: val })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="store" id="loc-store" />
            <Label htmlFor="loc-store" className="font-normal cursor-pointer">In-Store (Our Facility)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="home" id="loc-home" />
            <Label htmlFor="loc-home" className="font-normal cursor-pointer">Mobile (We come to you)</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.location === 'home' && (
        <div className="space-y-2 pt-2">
          <Label htmlFor="address">Service Address *</Label>
          <Input 
            id="address" 
            required 
            value={formData.address} 
            onChange={(e) => updateData({ address: e.target.value })} 
            placeholder="123 Main St, City, Zip" 
            className="text-foreground"
          />
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default BookingStep1;