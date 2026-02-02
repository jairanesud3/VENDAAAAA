import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  onNavigate?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transformações baseadas no scroll
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]); // Padding vertical diminui
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "85%"]); // Largura diminui para centralizar
  const navTop = useTransform(scrollY, [0, 100], ["0rem", "1rem"]); // Desce um pouco para flutuar
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "24px"]); // Fica arredondado
  
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]); // Logo diminui
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.6]); // Fundo aparece
  const blurAmount = useTransform(scrollY, [0, 100], [0, 12]); // Blur aumenta

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav 
        style={{
            paddingTop: navPadding,
            paddingBottom: navPadding,
            width: navWidth,
            marginTop: navTop,
            borderRadius: navRadius,
            backgroundColor: useTransform(bgOpacity, v => `rgba(15, 5, 24, ${v})`),
            backdropFilter: useTransform(blurAmount, v => `blur(${v}px)`),
            border: isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent'
        }}
        className="pointer-events-auto transition-shadow duration-300 flex items-center justify-between px-6 md:px-10"
        >
            {/* Logo Area */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={onNavigate}>
                <motion.div 
                style={{ scale: logoScale }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                <Zap className="text-white w-6 h-6 fill-white" />
                </motion.div>
                <motion.div 
                    style={{ x: useTransform(scrollY, [0, 100], [0, -5]) }}
                    className="flex flex-col"
                >
                    <span className="text-white font-bold text-lg tracking-wide group-hover:text-primary transition-colors leading-tight">DROPHACKER</span>
                    <span className="text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase">AI Suite</span>
                </motion.div>
            </div>

            {/* Right Actions */}
            <motion.div 
                style={{ gap: useTransform(scrollY, [0, 100], ["24px", "12px"]) }}
                className="flex items-center"
            >
                <button onClick={onNavigate} className="hidden md:block text-slate-300 text-sm font-medium hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full">
                Login
                </button>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNavigate} 
                    className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                Começar Grátis
                </motion.button>
            </motion.div>
        </motion.nav>
    </div>
  );
};

export default Navbar;