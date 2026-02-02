import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { 
    id: 'purple', 
    name: 'Roxo Neon', 
    color: '#A855F7', 
    vars: { primary: '168 85 247', dark: '126 34 206' } 
  },
  { 
    id: 'blue', 
    name: 'Azul Cyber', 
    color: '#3B82F6', 
    vars: { primary: '59 130 246', dark: '37 99 235' } 
  },
  { 
    id: 'green', 
    name: 'Verde Matrix', 
    color: '#22C55E', 
    vars: { primary: '34 197 94', dark: '21 128 61' } 
  },
  { 
    id: 'orange', 
    name: 'Laranja Sunset', 
    color: '#F97316', 
    vars: { primary: '249 115 22', dark: '194 65 12' } 
  }
];

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('drophacker_theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(themeId);
      document.documentElement.style.setProperty('--color-primary', theme.vars.primary);
      document.documentElement.style.setProperty('--color-primary-dark', theme.vars.dark);
      localStorage.setItem('drophacker_theme', themeId);
    }
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 bg-surface border border-white/10 rounded-xl hover:border-primary hover:text-primary text-slate-400 transition-all shadow-lg hover:shadow-neon-primary flex items-center gap-2"
        title="Personalizar Tema"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden md:block text-xs font-bold uppercase">Tema</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-56 bg-[#0F0518] border border-white/10 rounded-2xl shadow-2xl p-3 overflow-hidden z-50 ring-1 ring-white/5"
          >
            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider px-2">Cor do Sistema</div>
            <div className="grid grid-cols-1 gap-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                      applyTheme(theme.id);
                      setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors border ${currentTheme === theme.id ? 'bg-white/5 border-white/20' : 'border-transparent hover:bg-white/5'}`}
                >
                  <div 
                    className="w-6 h-6 rounded-full shadow-inner flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: theme.color }}
                  >
                    {currentTheme === theme.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${currentTheme === theme.id ? 'text-white' : 'text-slate-400'}`}>
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;