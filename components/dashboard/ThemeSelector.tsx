import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { 
    id: 'purple', 
    name: 'Neon Purple', 
    color: '#A855F7', 
    vars: { primary: '168 85 247', dark: '126 34 206' } 
  },
  { 
    id: 'blue', 
    name: 'Cyber Blue', 
    color: '#3B82F6', 
    vars: { primary: '59 130 246', dark: '37 99 235' } 
  },
  { 
    id: 'green', 
    name: 'Toxic Green', 
    color: '#22C55E', 
    vars: { primary: '34 197 94', dark: '21 128 61' } 
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
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all text-sm font-medium"
        title="Alterar Tema"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden md:inline">Tema</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-48 bg-[#0F0518] border border-white/10 rounded-xl shadow-2xl p-2 z-50"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2 pt-1">
                Escolha a Vibe
            </div>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                      applyTheme(theme.id);
                      setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors border ${currentTheme === theme.id ? 'bg-white/5 border-white/10' : 'border-transparent hover:bg-white/5'}`}
                >
                  <div 
                    className="w-4 h-4 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] border border-white/10"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className={`text-sm ${currentTheme === theme.id ? 'text-white font-medium' : 'text-slate-400'}`}>
                    {theme.name}
                  </span>
                  {currentTheme === theme.id && <Check className="w-3 h-3 text-white ml-auto" />}
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