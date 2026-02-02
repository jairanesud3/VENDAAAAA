import React, { useState, useEffect } from 'react';
import { Megaphone, Camera, Zap, TrendingUp, Clock, Calendar, Mail, UserCircle, Wrench, ChevronRight } from 'lucide-react';
import ThemeSelector from '../ThemeSelector'; 
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import DashboardTour from './DashboardTour';
import { TOOLS_LIST } from './ExtraTools';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
  userData?: any;
}

const FREE_TIER_LIMIT = 15; // Total credits for free tier

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate, userData }) => {
  const [user, setUser] = useState<any>(userData || null);
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Real Usage Stats
  const [stats, setStats] = useState({
      creditsUsed: 0,
      adsGenerated: 0,
      imagesGenerated: 0,
      timeSaved: 0,
      roi: 0
  });

  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Time greeting logic
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // Date logic
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    setCurrentDate(new Date().toLocaleDateString('pt-BR', dateOptions));

    // 1. Fetch User Data
    if (userData) {
        setUser(userData);
        if (userData.user_metadata?.show_tour) {
            setShowTour(true);
        }
    } else {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                setUser(data.user);
                // Check if we should show tour based on metadata or if it's a fresh account
                if (data.user.user_metadata?.show_tour) {
                    setShowTour(true);
                }
            }
        };
        fetchUser();
    }

    // 2. Load Real Usage Stats from LocalStorage (Syncs with Tools)
    const textCredits = parseInt(localStorage.getItem('drophacker_text_credits') || '0');
    const imageCredits = parseInt(localStorage.getItem('drophacker_image_credits') || '0');
    
    const totalUsed = textCredits + imageCredits;
    const estimatedTime = (textCredits * 15) + (imageCredits * 30); // Minutes saved
    const estimatedRoi = (textCredits * 120) + (imageCredits * 80); // R$ estimated

    setStats({
        creditsUsed: totalUsed,
        adsGenerated: textCredits,
        imagesGenerated: imageCredits,
        timeSaved: Math.round(estimatedTime / 60), // Hours
        roi: estimatedRoi
    });

  }, [userData]);

  const handleTourComplete = async () => {
      setShowTour(false);
      // Update metadata so tour doesn't show again
      await supabase.auth.updateUser({
          data: { show_tour: false }
      });
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || "Hacker";
  const creditsRemaining = Math.max(0, FREE_TIER_LIMIT - stats.creditsUsed);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Onboarding Tour */}
      <AnimatePresence>
        {showTour && <DashboardTour onComplete={handleTourComplete} userName={firstName} />}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-1"
          >
            <Zap className="w-4 h-4 animate-pulse" />
            <span>AI Suite V4.0 Online</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{firstName}.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-2 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> {currentDate}
          </motion.p>
        </div>
      </header>

      {/* Grid Stats (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Créditos Grátis" 
            value={creditsRemaining} 
            max={FREE_TIER_LIMIT} 
            suffix="" 
            icon={Zap} 
            color="text-primary" 
            delay={0} 
        />
        <StatCard 
            title="Anúncios Criados" 
            value={stats.adsGenerated} 
            suffix="" 
            icon={Megaphone} 
            color="text-pink-500" 
            delay={0.1} 
        />
        <StatCard 
            title="Tempo Economizado" 
            value={stats.timeSaved} 
            suffix="horas" 
            icon={Clock} 
            color="text-blue-500" 
            delay={0.2} 
        />
        <StatCard 
            title="ROI Estimado" 
            value={stats.roi} 
            prefix="R$ " 
            suffix="" 
            icon={TrendingUp} 
            color="text-green-400" 
            isCurrency 
            delay={0.3} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             
             {/* Main Shortcuts */}
             <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-yellow-400" /> Acesso Rápido
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ShortcutCard icon={Megaphone} title="Gerador de Anúncios" desc="Crie copies persuasivas." color="text-blue-500" onClick={() => onNavigate('ads')} />
                    <ShortcutCard icon={Camera} title="Studio Product AI" desc="Fotos 4K em segundos." color="text-pink-500" onClick={() => onNavigate('studio')} />
                    <ShortcutCard icon={Mail} title="Email Marketing" desc="Funis de alta conversão." color="text-orange-500" onClick={() => onNavigate('email')} />
                    <ShortcutCard icon={UserCircle} title="Persona Hacker" desc="Descubra seu público." color="text-purple-500" onClick={() => onNavigate('persona')} />
                </div>
             </div>

             {/* Utilities Compact Grid */}
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-slate-400" /> Utilitários
                    </h2>
                    <button 
                        onClick={() => onNavigate('utilities')}
                        className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                    >
                        Ver Todos <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {TOOLS_LIST.slice(0, 8).map(tool => (
                        <motion.button
                            key={tool.id}
                            onClick={() => onNavigate(`utilities-${tool.id}`)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl p-4 flex flex-col items-center text-center gap-2 transition-colors"
                        >
                             <div className={`w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center`}>
                                <tool.icon className={`w-4 h-4 ${tool.color}`} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-300 leading-tight">{tool.title}</span>
                        </motion.button>
                    ))}
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, max, suffix, prefix, icon: Icon, color, delay }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-surface border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all"
    >
        <div className={`absolute right-4 top-4 p-2 rounded-lg bg-white/5 ${color} opacity-50 group-hover:opacity-100 transition-opacity`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="text-slate-400 text-sm font-medium mb-1">{title}</div>
        <div className="text-3xl font-bold text-white flex items-end gap-1">
            {prefix}<span>{value}</span><span className="text-sm text-slate-500 font-normal mb-1">{suffix} {max ? `/ ${max}` : ''}</span>
        </div>
        {max && (
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(value / max) * 100}%` }}
                className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} 
              />
            </div>
        )}
    </motion.div>
);

const ShortcutCard = ({ icon: Icon, title, desc, color, onClick }: any) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        className="bg-[#0F0518] border border-white/5 p-6 rounded-2xl cursor-pointer group transition-colors text-left w-full hover:border-primary/50"
    >
        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </motion.button>
);

export default DashboardHome;