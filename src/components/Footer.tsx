import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-4">
            <img src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx Logo" className="h-8" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              One-man agency crafting bold websites that convert. From Tenkasi to the world, powered by coffee and passion.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/Harishs86646512" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/snugx.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/harish-s-43853831a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-light-text uppercase tracking-wider">Quick Links</h3>
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
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-light-text uppercase tracking-wider">Services</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <span>Web Design</span>
              <span>Web Development</span>
              <span>Webflow</span>
              <span>Framer</span>
              <span>Brand Identity</span>
              <span>SEO</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-neon-green" />
                <span className="text-gray-400">snugx3@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-neon-green" />
                <span className="text-gray-400">+91 8122343394</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-neon-green" />
                <span className="text-gray-400">Tenkasi, Tamil Nadu</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">
              © 2024 Snugx. Crafted by Harish S.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;