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
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Case Studies',
    path: '/case-studies'
  }, {
    name: 'Pricing',
    path: '/pricing'
  }, {
    name: 'Blog',
    path: '/blog'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  return <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'w-[95%] max-w-6xl' : 'w-[95%] max-w-6xl'}`}>
      <nav className="glass-strong rounded-full mx-auto py-[10px] px-[12px]">
        <div className="flex items-center justify-between py-[10px] px-[10px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <img src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx Logo" className="h-7" />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm font-medium transition-colors hover:text-neon-green ${location.pathname === item.path ? 'text-neon-green' : 'text-light-text'}`}>
                {item.name}
              </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-6 py-2 rounded-full neon-glow" asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-light-text hover:text-neon-green transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm font-medium transition-colors hover:text-neon-green ${location.pathname === item.path ? 'text-neon-green' : 'text-light-text'}`} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
              <Button className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold rounded-full w-full mt-4" asChild>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Quote</Link>
              </Button>
            </div>
          </div>}
      </nav>
    </header>;
};
export default Header;