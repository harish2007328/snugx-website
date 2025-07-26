import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <img src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx Logo" className="h-10" />
                        <p className="text-gray-400 text-sm mt-2">
              © Copyright 2025 snugx.
            </p>
          </div>

          {/* Close and other icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://x.com/Harishs86646512" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10" aria-label="Twitter">
              <Twitter size={24} />
            </a>
                        <a href="https://www.linkedin.com/in/harish-s-43853831a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
                        <a href="https://www.instagram.com/snugx.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors p-2 rounded-full hover:bg-neon-green/10" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;