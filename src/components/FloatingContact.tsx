import { MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsVisible(latest > 500);
    });
  }, [scrollY]);

  return (
    <motion.a
      href="https://m.me/yourfacebookpage" 
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 w-14 h-14 rounded-full border border-ink-light/20 dark:border-ink-dark/20 flex items-center justify-center text-ink-light dark:text-ink-dark bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-xl hover:bg-gold hover:text-white hover:border-gold transition-all duration-500 ${!isVisible && 'pointer-events-none'}`}
      aria-label="Contact Us"
    >
      <MessageCircle strokeWidth={1} size={20} />
      <span className="absolute top-0 right-0 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
      </span>
    </motion.a>
  );
}
