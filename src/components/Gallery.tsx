import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram } from 'lucide-react';
import { Tilt } from './Tilt';

const IMAGES = [
  "https://i.imgur.com/QXlvcmj.jpeg",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 px-4 md:px-12 bg-[#050505] text-[#F4F0EA] relative overflow-hidden z-10 transition-colors duration-700 border-t border-white/5">
      <div className="max-w-[90rem] mx-auto">
        <Tilt intensity={5} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8" style={{ transform: "translateZ(40px)" }}>
             <h2 className="text-[12vw] md:text-[8vw] font-serif font-light leading-[0.8] tracking-tighter drop-shadow-xl" style={{ transform: "translateZ(80px)" }}>
               Visual <br/><span className="italic text-[#F4F0EA]/50">Archive.</span>
             </h2>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[#F4F0EA]/60 hover:text-gold transition-colors pb-4 border-b border-[#F4F0EA]/20 drop-shadow-sm" style={{ transform: "translateZ(30px)" }}>
               <Instagram size={14} strokeWidth={1.5} /> Follow @gaiacafe
             </a>
          </div>
        </Tilt>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {IMAGES.map((src, index) => (
            <Tilt key={index} intensity={25} className={`cursor-pointer group ${index === 0 ? 'col-span-2 row-span-2' : ''} ${index === 5 ? 'col-span-2' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden bg-white/5 w-full h-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_45px_100px_-15px_rgba(235,231,224,0.15)] transition-shadow duration-[1.5s]"
                onClick={() => setSelectedImage(src)}
              >
                <div 
                  className={`relative ${index === 0 ? 'aspect-square md:aspect-[4/3]' : index === 5 ? 'aspect-[2/1]' : 'aspect-[3/4]'} transform-gpu`}
                  style={{ transform: "translateZ(10px)" }}
                >
                  <img 
                    src={src} 
                    alt={`Gaïa atmosphere ${index + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 mix-blend-screen mix-blend-normal"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-[2s]" style={{ transform: "translateZ(30px)" }} />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 p-4 text-white/50 hover:text-white hover:rotate-90 transition-all duration-500 rounded-full border border-white/10 hover:border-white/40"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -40, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={selectedImage} 
              alt="Expanded view"
              className="max-w-[95vw] max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
