import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">BB</span>
              </div>
              <span className="ml-2 text-xl font-bold">Bumper Buddies</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Professional mobile automotive care delivered to your location. Quality service without the hassle.
            </p>
          </div>
          
          <div>
            <span className="font-semibold text-lg mb-4 block">Quick Links</span>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Services
              </Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Contact
              </Link>
              <Link to="/plans" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Service Plans
              </Link>
            </nav>
          </div>
          
          <div>
            <span className="font-semibold text-lg mb-4 block">Contact Info</span>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">info@bumperbuddies.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">Serving Greater Metro Area</span>
              </div>
            </div>
          </div>
          
          <div>
            <span className="font-semibold text-lg mb-4 block">Business Hours</span>
            <div className="flex items-start space-x-2 mb-4">
              <Clock className="h-4 w-4 text-accent mt-0.5" />
              <div className="text-sm text-primary-foreground/80">
                <p>Mon - Fri: 7:00 AM - 7:00 PM</p>
                <p>Sat: 8:00 AM - 5:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">
            © 2026 Bumper Buddies. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;