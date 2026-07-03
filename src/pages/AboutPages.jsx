import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Target, Heart } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on the quality of our work or the parts we use. Your safety and satisfaction are our top priorities.',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Every service is tailored to your needs and schedule. We build lasting relationships through honest, reliable service.',
    },
    {
      icon: Target,
      title: 'Expertise',
      description: 'Our ASE-certified technicians bring years of experience and ongoing training to every job.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'We\'re proud to serve our local community with integrity, transparency, and a commitment to excellence.',
    },
  ];
  
  const reasons = [
    'ASE-certified technicians with 10+ years average experience',
    'Fully equipped mobile service units',
    'Transparent pricing with no hidden fees',
    'Comprehensive warranties on all work',
    'Flexible scheduling including evenings and weekends',
    'Eco-friendly disposal of all fluids and parts',
  ];
  
  return (
    <>
      <Helmet>
        <title>About Us - Bumper Buddies</title>
        <meta name="description" content="Learn about Bumper Buddies, our mission to deliver professional mobile automotive care, and why thousands of customers trust us with their vehicles." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Bringing professional automotive care to your doorstep
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-prose mx-auto">
                Since 2018, we've been revolutionizing automotive service with our mobile-first approach.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-balance leading-snug">
                  Our story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Bumper Buddies was founded on a simple idea: automotive service should fit into your life, not the other way around. We saw too many people wasting hours at repair shops, juggling schedules, and dealing with the hassle of traditional service.
                  </p>
                  <p>
                    Our founder, a master technician with over 15 years of experience, assembled a team of certified professionals who share a passion for quality work and customer service. Together, we built a mobile service model that delivers shop-quality repairs and maintenance wherever you need us.
                  </p>
                  <p>
                    Today, we serve thousands of customers across the metro area, completing over 10,000 services annually. Our commitment to excellence, transparency, and convenience has made us the trusted choice for mobile automotive care.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-muted rounded-2xl p-8"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">Our mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  To provide professional, convenient automotive care that respects your time and exceeds your expectations. We believe everyone deserves reliable service without the traditional shop hassles.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">10,000+</div>
                    <div className="text-sm text-muted-foreground">Services completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">4.9</div>
                    <div className="text-sm text-muted-foreground">Average rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">8</div>
                    <div className="text-sm text-muted-foreground">Years in business</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction guarantee</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-balance leading-snug">
                Our values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                These principles guide everything we do, from hiring technicians to serving customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-balance leading-snug">
                Why choose Bumper Buddies?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;