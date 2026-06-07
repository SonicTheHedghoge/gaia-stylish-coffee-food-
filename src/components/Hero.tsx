import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Tilt } from './Tilt';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-base-dark flex flex-col justify-center items-center">
      
      {/* Background Image with Parallax & Scale */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <div 
          className="absolute inset-0 bg-[url('https://i.imgur.com/ROnBGVv.jpeg')] bg-cover bg-center object-cover opacity-60 dark:opacity-40 mix-blend-luminosity" 
        />
        {/* Extreme gradients to merge image */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-dark via-transparent to-base-dark opacity-100" />
      </motion.div>

      {/* Hero Content */}
      <motion.div style={{ y: textY }} className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 mt-20 pointer-events-auto">
        <Tilt intensity={20} className="w-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden mb-2" style={{ transform: "translateZ(80px)" }}>
              <motion.p 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-gold tracking-[0.5em] text-[10px] md:text-xs font-medium uppercase drop-shadow-md"
              >
                L'Art de Vivre • Djerba
              </motion.p>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="font-serif text-[20vw] md:text-[16vw] leading-[0.7] text-white tracking-tighter text-center mix-blend-overlay drop-shadow-2xl"
              style={{ transform: "translateZ(150px)" }}
            >
              Gaïa<span className="italic opacity-80 text-gold mix-blend-normal">.</span>
            </motion.h1>

            <div className="overflow-hidden mt-6" style={{ transform: "translateZ(40px)" }}>
              <motion.h2 
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="font-sans font-light text-xs md:text-lg uppercase tracking-[0.8em] text-white/50 text-center ml-[0.8em]"
              >
                Stylish Coffee
              </motion.h2>
            </div>
          </div>
        </Tilt>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        className="absolute bottom-12 left-6 md:bottom-16 md:left-12 max-w-[200px]"
      >
        <p className="text-[9px] uppercase tracking-widest text-[#EBE7E0]/40 leading-loose">
          A visceral culinary experience designed for the discerning palette.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
        className="absolute bottom-12 right-6 md:bottom-16 md:right-12"
      >
        <a 
          href="#menu" 
          className="px-6 py-4 border border-white/20 text-[#EBE7E0] text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-ink-light transition-all duration-500 block text-center"
        >
          Enter
        </a>
      </motion.div>
    </section>
  );
}
