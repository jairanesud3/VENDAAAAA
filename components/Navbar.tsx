import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  onNavigate?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform values for smooth animations based on scroll position
  const height = useTransform(scrollY, [0, 50], [96, 70]); // 24 (h-24) to 16 (h-16) roughly
  const backgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.9]);
  const blurAmount = useTransform(scrollY, [0, 50], [0, 16]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.nav 
      style={{
        height,
        backgroundColor: useTransform(backgroundOpacity, v => `rgba(5, 1, 13, ${v})`),
        backdropFilter: useTransform(blurAmount, v => `blur(${v}px)`),
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-colors duration-300"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={onNavigate}>
          <motion.div 
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
          >
            <Zap className="text-white w-6 h-6 fill-white" />
          </motion.div>
          <span className="text-white font-bold text-lg tracking-wide group-hover:text-primary transition-colors">DROPHACKER</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button onClick={onNavigate} className="hidden md:block text-slate-300 text-sm font-medium hover:text-white transition-colors">
            Login
          </button>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigate} 
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-white/10 transition-all duration-300"
          >
            Começar Grátis
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;