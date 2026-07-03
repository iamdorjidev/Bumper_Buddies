import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Phone } from 'lucide-react';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Order Confirmed - Bumper Buddies</title>
        <meta name="description" content="Your service has been booked successfully. We'll contact you shortly to schedule your appointment." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
              Service booked successfully
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-prose mx-auto">
              Thank you for choosing Bumper Buddies. We've received your order and will contact you within 24 hours to schedule your mobile service appointment.
            </p>
            
            <div className="bg-muted rounded-xl p-8 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">What happens next?</h2>
              
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Confirmation email</h3>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox for order details and receipt.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Schedule appointment</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will call you to arrange a convenient time and location.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Service delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Our certified technician arrives at your location with all necessary equipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <Link to="/plans">Book another service</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <Link to="/">Return home</Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Mon-Fri: 7am-7pm, Sat: 8am-5pm</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;