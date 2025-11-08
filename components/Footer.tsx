
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary text-brand-light/70">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-lg font-serif text-brand-primary mb-4">Gourmet Grove</h3>
            <p className="text-sm">Experience culinary excellence and unforgettable moments.</p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-brand-light mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-brand-primary transition-colors">Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-brand-primary transition-colors">Reservations</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-brand-light mb-4">Contact Us</h3>
            <address className="not-italic space-y-2 text-sm">
              <p>123 Culinary Lane, Foodie City, 10101</p>
              <p>Email: <a href="mailto:contact@gourmetgrove.com" className="hover:text-brand-primary">contact@gourmetgrove.com</a></p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>

          <div>
            <h3 className="text-md font-semibold text-brand-light mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-2.7-1.7-5.5-2.5-8.3-2.5-.7 0-1.4.1-2.1.2 2.2-2.4 2.8-5.5 1.7-8.2-2.3 2.6-4.9 4.9-7.8 6.8-1.5 1-3.1 1.8-4.8 2.3A.5.5 0 0 0 2 13c1.2.7 2.4 1.3 3.6 1.8 1.1.5 2.2.9 3.3 1.2.9.2 1.8.4 2.7.5 1.8.3 3.6.4 5.4.3.9 0 1.8-.1 2.7-.2 1.7-.3 3.4-.7 5-1.3.6-.2 1.2-.5 1.8-.8 1.1-.6 2.2-1.3 3.2-2.1-.1.8-.3 1.6-.6 2.4-1.3 3.2-3.8 5.6-7.1 6.5-1.9.5-3.8.7-5.8.6-2.1-.1-4.1-.4-6.1-1.1-2.1-.7-4-1.8-5.8-3.2-.8-.6-1.5-1.3-2.2-2-.6-.6-1.2-1.2-1.7-1.9-2.2-2.7-3.7-6-4.4-9.6C1.4 7.9 2.1 7 3.2 7c.8.2 1.6.4 2.4.7 1.1.4 2.2.8 3.3 1.2 2.3.8 4.6 1.4 7 1.6.8.1 1.6.1 2.4 0 2.2-.2 4.4-.7 6.5-1.5.8-.3 1.5-.7 2.3-1.1.8-.4 1.5-.9 2.2-1.4.3-.2.7-.4 1-.6.7-.4 1.3-1 1.7-1.7.1-.2.2-.4.3-.6.2-.4.3-.8.4-1.3.1-.4.1-.8.1-1.3 0-.1 0-.2-.1-.3-.1-.3-.2-.5-.4-.7-.2-.2-.5-.4-.8-.5-.3-.1-.6-.1-.9-.1-1 0-1.9.3-2.8.8z"></path></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-brand-light/20 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Gourmet Grove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
