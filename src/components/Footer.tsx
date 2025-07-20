
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" 
                alt="Snugx Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-neon-green">snugx</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming digital experiences with cutting-edge web design and development solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-text">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Home
              </Link>
              <Link to="/case-studies" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Case Studies
              </Link>
              <Link to="/pricing" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Pricing
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                Blog
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-neon-green transition-colors text-sm">
                About
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-text">Services</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Web Design</p>
              <p className="text-gray-400 text-sm">Web Development</p>
              <p className="text-gray-400 text-sm">Webflow Development</p>
              <p className="text-gray-400 text-sm">Framer Development</p>
              <p className="text-gray-400 text-sm">Brand Identity</p>
              <p className="text-gray-400 text-sm">SEO Optimization</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-light-text">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest web design trends and tips.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border-white/10 text-light-text placeholder:text-gray-500"
              />
              <Button className="w-full bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-neon-green" />
              <span className="text-gray-400 text-sm">hello@snugx.agency</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-neon-green" />
              <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-neon-green" />
              <span className="text-gray-400 text-sm">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Snugx. All rights reserved. Crafted with ❤️ for digital excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
