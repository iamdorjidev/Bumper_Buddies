import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wrench, Clock, MapPin, Shield, Star, Zap } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext.jsx';

const HomePage = () => {
  const { openBooking } = useBooking();

  const features = [
    {
      icon: MapPin,
      title: 'Mobile Service',
      description: 'We come to your home, office, or anywhere you need us. No more waiting at the shop.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book appointments that fit your schedule, including evenings and weekends.',
    },
    {
      icon: Shield,
      title: 'Certified Technicians',
      description: 'ASE-certified professionals with years of experience in automotive care.',
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'We stand behind our work with comprehensive warranties on all services.',
    },
    {
      icon: Wrench,
      title: 'Full-Service Care',
      description: 'From bumper repair to full detailing, we handle all your automotive needs.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Most services completed on-site in under an hour. Get back on the road quickly.',
    },
  ];
  
  return (
    <>
      <Helmet>
        <title>Bumper Buddies - Expert Mobile Automotive Care</title>
        <meta name="description" content="Professional mobile automotive service delivered to your location. Bumper repair, detailing, and more. Book online today." />
      </Helmet>
      
      <div className="min-h-screen">
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1635275490685-65db202f43cb"
              alt="Professional car detailing service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-foreground/30" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Expert automotive care comes to you
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-prose"
              >
                Skip the shop and save time with professional mobile service. Our certified technicians bring quality auto body repair and detailing directly to your driveway.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => openBooking()}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8 py-6 transition-all duration-200 active:scale-[0.98]"
                >
                  Book a service
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-semibold text-base px-8 py-6 transition-all duration-200 active:scale-[0.98]"
                >
                  <Link to="/services">View services</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-balance leading-snug">
                Why choose mobile service?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We bring the shop to you, saving you time and hassle while delivering the same professional quality you expect.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-balance leading-snug">
                Ready to experience hassle-free automotive care?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Choose your service and book an appointment in less than 2 minutes. Simple, fast, and entirely on your terms.
              </p>
              <Button
                onClick={() => openBooking()}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 transition-all duration-200 active:scale-[0.98]"
              >
                Start Your Booking
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;