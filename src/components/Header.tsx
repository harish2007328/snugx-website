
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isScrolled ? 'w-[95%] max-w-6xl' : 'w-[95%] max-w-6xl'
    }`}>
      <nav className={`bg-secondary/25 backdrop-blur-md border border-light-text/20 transition-all duration-500 ease-out ${
        isMenuOpen ? 'rounded-3xl' : 'rounded-full'
      } mx-auto px-0 py-0`}>
        <div className="flex items-center justify-between py-[10px] px-[10px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <img src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx Logo" className="h-7 pl-3" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-neon-green ${
                  location.pathname === item.path ? 'text-neon-green font-semibold' : 'text-light-text'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-primary px-6 py-2" asChild>
              <Link to="/contact">Let's Chat</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-light-text hover:text-neon-green transition-colors rounded-full hover:bg-light-text/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-8 pt-6 px-8 border-t border-light-text/10 bg-secondary/98 backdrop-blur-md rounded-b-3xl animate-fade-in">
            <div className="flex flex-col space-y-6">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-medium transition-all duration-300 hover:text-neon-green py-4 px-0 text-left hover:translate-x-2 ${
                    location.pathname === item.path ? 'text-neon-green font-semibold' : 'text-light-text'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="btn-primary py-4 w-full mt-6 text-base" asChild>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Let's Chat</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
