import React from 'react';
import { Helmet } from 'react-helmet';
import ProductsList from '@/components/ProductsList';

const PlansPage = () => {
  return (
    <>
      <Helmet>
        <title>Service Plans - Bumper Buddies</title>
        <meta name="description" content="Browse our mobile automotive service packages. Choose the plan that fits your needs and book online today." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Choose your service plan
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-prose mx-auto">
                Select from our range of mobile automotive services. All plans include professional service at your location.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProductsList />
          </div>
        </section>
        
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-balance leading-snug">
                All plans include
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Satisfaction guarantee</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">ASE</div>
                  <p className="text-sm text-muted-foreground">Certified technicians</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">12mo</div>
                  <p className="text-sm text-muted-foreground">Parts warranty</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlansPage;