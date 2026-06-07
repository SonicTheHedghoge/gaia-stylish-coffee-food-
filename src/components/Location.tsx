import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

export function Location() {
  return (
    <section id="visit" className="py-32 bg-base-light dark:bg-base-dark transition-colors duration-700 border-t border-ink-light/10 dark:border-ink-dark/10">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Background Typography */}
          <div className="absolute -top-10 -left-4 pointer-events-none opacity-5 dark:opacity-[0.02]">
             <span className="font-serif text-[240px] leading-none tracking-tighter">Locate</span>
          </div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[40%] flex flex-col justify-center relative z-10"
          >
            <span className="text-gold tracking-[0.4em] text-[10px] font-semibold uppercase block mb-8">Sanctuary</span>
            <h2 className="text-6xl md:text-[80px] font-serif font-light text-ink-light dark:text-ink-dark mb-16 tracking-tighter leading-[0.9]">
              Find <br/><span className="italic opacity-60">Us.</span>
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <MapPin className="text-gold mt-1 shrink-0 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} size={24} />
                <div className="border-b border-ink-light/10 dark:border-ink-dark/10 pb-8 w-full">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-ink-light/60 dark:text-ink-dark/60 mb-4">Coordinates</h4>
                  <p className="text-xl font-serif italic leading-snug text-ink-light dark:text-ink-dark">
                    Rond point rendez-vous,<br/>
                    Zone Touristique,<br/>
                    Djerba Midoune, Tunisia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <Clock className="text-gold mt-1 shrink-0 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} size={24} />
                <div className="border-b border-ink-light/10 dark:border-ink-dark/10 pb-8 w-full">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-ink-light/60 dark:text-ink-dark/60 mb-4">Hours</h4>
                  <p className="text-sm tracking-[0.2em] uppercase font-light text-ink-light dark:text-ink-dark mb-1">Mon - Sun</p>
                  <p className="text-sm font-serif italic text-ink-light/70 dark:text-ink-dark/70">07:00 AM - 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <Phone className="text-gold mt-1 shrink-0 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} size={24} />
                <div className="pb-8 w-full">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-ink-light/60 dark:text-ink-dark/60 mb-4">Direct</h4>
                  <p className="text-xl font-serif italic leading-snug text-ink-light dark:text-ink-dark">
                    +216 12 345 678<br/>
                    <span className="text-sm font-sans tracking-widest not-italic opacity-60">hello@gaiacafe.tn</span>
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=Rond+point+rendez-vous,+zone+touristique,+Djerba+Midoune,+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-4 px-12 py-5 border border-ink-light dark:border-ink-dark text-ink-light dark:text-ink-dark text-[10px] uppercase tracking-[0.3em] hover:bg-ink-light dark:hover:bg-ink-dark hover:text-base-light dark:hover:text-base-dark transition-all duration-500 w-max"
            >
              Get Directions <ArrowRight size={14} strokeWidth={1.5} />
            </a>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[60%] lg:min-h-[800px] w-full min-h-[500px] bg-ink-light/5 dark:bg-ink-dark/5 p-4 md:p-8"
          >
            <div className="w-full h-full relative overflow-hidden bg-black filter grayscale-[0.8] contrast-125 dark:invert-[0.9] dark:hue-rotate-180 transition-all duration-1000 group hover:grayscale-0 dark:hover:invert-0">
              <iframe 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rond%20point%20rendez-vous,%20zone%20touristique,%20Djerba%20Midoune,%20Tunisia+(Ga%C3%AFa%20Stylish%20Coffee%20&amp;%20Food)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 transition-opacity duration-1000 hover:opacity-100"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-black/10 dark:border-white/10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
