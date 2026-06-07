import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, MapPin } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Visit Us', href: '#visit' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-xl py-6 border-b border-ink-light/5 dark:border-ink-dark/5' 
            : 'bg-transparent py-10'
        }`}
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#home" className={`flex items-baseline font-serif text-3xl tracking-tighter transition-colors ${isScrolled ? 'text-ink-light dark:text-ink-dark' : 'text-white'}`}>
            <span className="italic pr-1">Gaïa</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <ul className="flex items-center space-x-10">
              {LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-gold ${
                      isScrolled ? 'text-ink-light/70 dark:text-ink-dark/70' : 'text-white/70'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className={`w-px h-3 mx-4 ${isScrolled ? 'bg-ink-light/20 dark:bg-ink-dark/20' : 'bg-white/20'}`} />
            
            <button 
              onClick={toggleTheme}
              className={`transition-colors hover:scale-110 ${
                isScrolled ? 'text-ink-light dark:text-ink-dark' : 'text-white'
              }`}
            >
              {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className={`transition-colors ${isScrolled ? 'text-ink-light dark:text-ink-dark' : 'text-white'}`}
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={1} /> : <Moon size={18} strokeWidth={1} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={isScrolled ? 'text-ink-light dark:text-ink-dark' : 'text-white'}
            >
              <Menu size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-base-light dark:bg-base-dark flex flex-col pt-24 px-6 pb-6"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-2 text-ink-light dark:text-ink-dark hover:rotate-90 transition-transform duration-500"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <ul className="flex flex-col gap-8 mt-24 mb-auto">
              {LINKS.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-5xl md:text-7xl font-serif font-light text-ink-light dark:text-ink-dark hover:text-gold hover:italic transition-all duration-300 tracking-tighter"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 border-t border-ink-light/10 dark:border-ink-dark/10 pt-8">
              <div className="flex items-center gap-3 text-ink-light/60 dark:text-ink-dark/60 text-xs tracking-[0.2em] uppercase">
                <MapPin size={16} strokeWidth={1} />
                Djerba Midoune
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
