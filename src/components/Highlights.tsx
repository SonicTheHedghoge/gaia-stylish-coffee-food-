import { Tilt } from './Tilt';
import { motion } from 'motion/react';

const HIGHLIGHTS = [
  {
    title: "Strawberry Pistachio Waffle",
    description: "Crisp vanilla waffle, fresh Djerbian strawberries, house-made pistachio cream, and 24k gold leaf.",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80",
    price: "18 TND"
  },
  {
    title: "Signature V60 Pour Over",
    description: "Ethiopian single-origin beans, light roast, delicately brewed to emphasize floral & berry tasting notes.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80",
    price: "12 TND"
  },
  {
    title: "Avocado & Truffle Toast",
    description: "Sourdough toast, smashed hass avocado, confit tomatoes, micro-greens, and a drizzle of white truffle oil.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
    price: "24 TND"
  }
];

export function Highlights() {
  return (
    <section id="menu" className="py-32 px-6 md:px-12 bg-surface-light dark:bg-surface-dark transition-colors duration-700">
      <div className="max-w-[90rem] mx-auto">
        <Tilt intensity={5} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-12" style={{ transform: "translateZ(30px)" }}>
            <div className="flex flex-col">
              <span className="text-gold tracking-[0.5em] text-[10px] font-semibold uppercase mb-6 drop-shadow-sm">Culinary Collection</span>
              <h2 className="text-6xl md:text-[100px] font-serif font-light text-ink-light dark:text-ink-dark leading-none tracking-tighter drop-shadow-xl" style={{ transform: "translateZ(60px)" }}>
                Curated <br/> <span className="italic opacity-70">Signatures</span>
              </h2>
            </div>
            <a href="#" className="inline-block text-[10px] uppercase tracking-[0.3em] text-ink-light dark:text-ink-dark hover:text-gold transition-colors pb-2 border-b border-gold/50 hover:border-gold mb-4 whitespace-nowrap drop-shadow-sm" style={{ transform: "translateZ(20px)" }}>
              View Archive
            </a>
          </div>
        </Tilt>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`group cursor-pointer flex flex-col ${index === 1 ? 'md:mt-32' : ''} ${index === 2 ? 'md:-mt-16' : ''}`}>
                <Tilt intensity={15} className="w-full">
                  <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-ink-light/5 dark:bg-ink-dark/5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform-gpu hover:shadow-[0_45px_100px_-15px_rgba(0,0,0,0.7)] transition-shadow duration-700">
                    <div className="absolute inset-0 bg-ink-light/20 dark:bg-ink-dark/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" style={{ transform: "translateZ(10px)" }} />
                    <motion.img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-[0.8] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:grayscale-0 group-hover:blur-[2px] brightness-75 group-hover:brightness-50"
                      style={{ transform: "translateZ(0px)" }}
                    />
                    {/* Text overlay appearing on hover */}
                    <div 
                      className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] p-8 text-center bg-black/30 backdrop-blur-sm pointer-events-none"
                      style={{ transform: "translateZ(50px)" }}
                    >
                       <h3 className="font-serif italic font-light tracking-tight text-3xl text-white mb-4 drop-shadow-2xl">
                         {item.title}
                       </h3>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6 drop-shadow-md">
                         {item.price}
                       </span>
                       <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/70 leading-loose max-w-[200px]">
                         {item.description}
                       </p>
                    </div>
                  </div>
                </Tilt>
              
              {/* Default Text when not hovered */}
              <div className="flex flex-col group-hover:opacity-0 transition-opacity duration-700 h-24 pl-4 md:pl-0 border-l border-ink-light/10 dark:border-ink-dark/10 md:border-none">
                <span className="text-[10px] uppercase tracking-[0.4em] text-ink-light/40 dark:text-ink-dark/40 mb-3 md:border-b md:border-ink-light/10 md:dark:border-ink-dark/10 pb-3">No. {String(index+1).padStart(2,'0')}</span>
                <h3 className="font-serif text-2xl text-ink-light dark:text-ink-dark tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
