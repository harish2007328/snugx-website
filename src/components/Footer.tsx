import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div>
            <img src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx Logo" className="h-10 mx-auto" />
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a href="https://x.com/Harishs86646512" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/snugx.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/harish-s-43853831a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10">
              <Linkedin size={24} />
            </a>
          </div>
          
          {/* Contact Info */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-neon-green" />
                <a href="mailto:snugx3@gmail.com" className="text-gray-400 hover:text-neon-green transition-colors">
                  snugx3@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-neon-green" />
                <a href="tel:+918122343394" className="text-gray-400 hover:text-neon-green transition-colors">
                  +91 8122343394
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-neon-green" />
                <span className="text-gray-400">Tenkasi, Tamil Nadu, India</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                © 2024 Snugx. Crafted with ❤️ by Harish S from Tenkasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;