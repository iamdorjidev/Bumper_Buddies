import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, User, Phone, Wrench } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we didn't receive it through router state, we try to fetch it.
    // NOTE: This might fail for public users due to access rules, so we handle it gracefully.
    if (!booking && id) {
      pb.collection('bookings').getOne(id, { $autoCancel: false })
        .then(res => {
          setBooking(res);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [id, booking]);

  return (
    <>
      <Helmet>
        <title>Booking Confirmed - Bumper Buddies</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col items-center pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-lg border border-border p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you! Your service has been successfully scheduled.
            </p>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading details...</p>
            ) : error ? (
              <div className="bg-muted rounded-xl p-6 mb-8 text-left text-sm text-muted-foreground">
                Your booking (ID: {id}) is confirmed. For privacy reasons, the full details cannot be re-fetched after refreshing the page. We will contact you shortly!
              </div>
            ) : booking ? (
              <div className="bg-muted rounded-xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Reference Number</span>
                  <span className="font-mono text-sm font-semibold">{booking.id}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.customerName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.customerPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.serviceType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {format(new Date(booking.bookingDate), 'MMM dd, yyyy')} at {booking.bookingTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2 mt-2 pt-4 border-t border-border">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">{booking.serviceLocation} Service</p>
                      {booking.serviceLocation === 'home' && booking.customerAddress && (
                        <p className="text-sm text-muted-foreground mt-1">{booking.customerAddress}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">Return to Home</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;