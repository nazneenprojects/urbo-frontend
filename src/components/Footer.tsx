import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-green-600 hover:text-green-800">Get in Touch</Link></li>
              <li><Link to="/support" className="text-green-600 hover:text-green-800">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Sitemap</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-600 hover:text-green-800">Home</Link></li>
              <li><Link to="/features" className="text-green-600 hover:text-green-800">Features</Link></li>
              <li><Link to="/how-it-works" className="text-green-600 hover:text-green-800">How it Works</Link></li>
              <li><Link to="/faq" className="text-green-600 hover:text-green-800">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-green-600 hover:text-green-800">Blog</Link></li>
              <li><Link to="/case-studies" className="text-green-600 hover:text-green-800">Case Studies</Link></li>
              <li><Link to="/documentation" className="text-green-600 hover:text-green-800">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-green-600 hover:text-green-800">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-green-600 hover:text-green-800">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-green-600 hover:text-green-800">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-green-200 text-center text-green-600">
          <p>&copy; {new Date().getFullYear()} URBO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;