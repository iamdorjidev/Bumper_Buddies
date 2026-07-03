import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext.jsx';
import { Wrench, Brush, Hammer, Droplets, CarFront, Sparkles } from 'lucide-react';

const ServicesPage = () => {
  const { openBooking } = useBooking();

  const services = [
    {
      id: 'Bumper Repair',
      icon: CarFront,
      title: 'Bumper Repair',
      price: 'from $150',
      description: 'Fix cracks, dents, and scratches on your bumper. We restore your bumper to factory condition using premium materials.',
    },
    {
      id: 'Paint Touch-up',
      icon: Brush,
      title: 'Paint Touch-up',
      price: 'from $85',
      description: 'Precision color-matching for minor scratches and chips. Prevents rust and keeps your vehicle looking pristine.',
    },
    {
      id: 'Dent Removal',
      icon: Hammer,
      title: 'Dent Removal',
      price: 'from $120',
      description: 'Paintless dent removal (PDR) for smooth finishes without the need for repainting. Fast and eco-friendly.',
    },
    {
      id: 'Scratch Repair',
      icon: Wrench,
      title: 'Scratch Repair',
      price: 'from $95',
      description: 'Deep buffing and clear-coat restoration to eliminate surface scratches and swirls.',
    },
    {
      id: 'Undercarriage Wash',
      icon: Droplets,
      title: 'Undercarriage Wash',
      price: 'from $60',
      description: 'Thorough cleaning of your vehicle underside to remove road salt, grime, and prevent long-term corrosion.',
    },
    {
      id: 'Full Detail',
      icon: Sparkles,
      title: 'Full Detail',
      price: 'from $250',
      description: 'Complete interior and exterior deep clean. Includes waxing, vacuuming, leather conditioning, and window polishing.',
    },
  ];
  
  return (
    <>
      <Helmet>
        <title>Our Services - Bumper Buddies</title>
        <meta name="description" content="Explore our mobile automotive services including bumper repair, paint touch-ups, and full detailing." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Premium services at your convenience
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-prose mx-auto">
                Whether you need a quick scratch repair or a full exterior detail, our experts bring the equipment and expertise right to you.
              </p>
              <div className="mt-8">
                <Button 
                  onClick={() => openBooking()} 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  Book a Service Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full text-sm">
                          {service.price}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full border-primary/20 hover:bg-primary/5"
                        onClick={() => openBooking(service.id)}
                      >
                        Select this service
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;