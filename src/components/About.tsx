import { motion } from 'motion/react';
import { Tilt } from './Tilt';

export function About() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden bg-base-light dark:bg-base-dark transition-colors duration-700">
      
      <Tilt intensity={10} className="w-full">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24" style={{ transform: "translateZ(50px)" }}>
          
          {/* Left Side: Vertical Element */}
          <div className="md:w-1/4 flex flex-col justify-start relative">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-px bg-gold mb-8 hidden md:block"
            />
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-medium mb-4 drop-shadow-sm">
              The Philosophy
            </h2>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
               <p className="font-serif italic text-2xl md:text-3xl text-ink-light/40 dark:text-ink-dark/40 leading-snug drop-shadow-md" style={{ transform: "translateZ(30px)" }}>
                 "Elegance is refusal."
               </p>
            </motion.div>
          </div>

          {/* Right Side: Heavy Typography */}
          <div className="md:w-3/4">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-[80px] font-serif font-light text-ink-light dark:text-ink-dark leading-[1.05] tracking-tighter mb-16 drop-shadow-xl"
              style={{ transform: "translateZ(80px)" }}
            >
              A visceral <span className="italic opacity-80">escape</span> into culinary minimalism, situated in the <span className="italic text-gold border-b border-gold/30 pb-2">heart</span> of Djerba.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
              style={{ transform: "translateZ(40px)" }}
            >
              <p className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-ink-light/60 dark:text-ink-dark/60 max-w-sm leading-loose drop-shadow-sm">
                We curate atmosphere, architect flavor, and distill the essence of raw, uncompromised quality.
              </p>
              <p className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-ink-light/60 dark:text-ink-dark/60 max-w-sm leading-loose drop-shadow-sm">
                This is not a cafe. It is a breathing canvas. Simply stylish, naturally beautiful.
              </p>
            </motion.div>
          </div>
          
        </div>
      </Tilt>
    </section>
  );
}
