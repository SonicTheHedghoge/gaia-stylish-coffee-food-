import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink-light text-white pt-32 pb-12 px-6 transition-colors duration-700">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32">
          
          {/* Brand */}
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-8xl md:text-[120px] font-serif font-light tracking-tighter leading-none mb-12">
              Gaïa<span className="text-gold">.</span>
            </h2>
            <p className="text-white/40 font-serif italic text-2xl md:text-3xl max-w-lg leading-relaxed">
              Elegance is refusal.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-16 w-full md:w-1/2">
            <div>
              <h5 className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/10 pb-4">Explore</h5>
              <ul className="space-y-6">
                <li><a href="#about" className="font-serif italic text-xl hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#menu" className="font-serif italic text-xl hover:text-gold transition-colors">Signatures</a></li>
                <li><a href="#gallery" className="font-serif italic text-xl hover:text-gold transition-colors">Archive</a></li>
                <li><a href="#visit" className="font-serif italic text-xl hover:text-gold transition-colors">Sanctuary</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/10 pb-4">Connect</h5>
              <div className="flex flex-col gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-sans text-xs uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-4">
                  <Instagram size={14} strokeWidth={1} /> Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-sans text-xs uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-4">
                  <Facebook size={14} strokeWidth={1} /> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center space-x-3 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em]">Currently Open</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">© {new Date().getFullYear()} Gaïa Coffee</p>
          </div>
          
          <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-gold hover:text-white transition-colors border-b border-gold/30 hover:border-white/30 pb-1">
            Book a Table
          </a>
        </div>
      </div>
    </footer>
  );
}
