import React, { useState, useEffect } from 'react';
import { Megaphone, Camera, Zap, ArrowRight, TrendingUp, AlertCircle, Mail, UserCircle, Clock, Calendar } from 'lucide-react';
// IMPORTANTE: Importando do diretório pai (components/)
import ThemeSelector from '../ThemeSelector'; 
import Link from 'next/link';
import { manageSubscriptionAction } from '../../lib/ai-actions';
import { motion } from 'framer-motion';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
  userData?: any;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate, userData }) => {
  const [user, setUser] = useState<any>(userData || null);
  const [loading, setLoading] = useState(!userData);
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    setCurrentDate(new Date().toLocaleDateString('pt-BR', dateOptions));

    if (userData) {
        setUser(userData);
        setLoading(false);
    } else {
        const timer = setTimeout(() => {
            setUser({
              id: 'fallback_user',
              user_metadata: { full_name: 'Hacker', avatar_url: null }
            });
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }
  }, [userData]);

  const handleManageSubscription = async () => {
    const url = await manageSubscriptionAction(user?.id);
    if (url.startsWith('http')) {
        window.open(url, '_blank');
    } else {
        alert("Você está no plano Gratuito. Atualize para o Pro!");
    }
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || "Hacker";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
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
        
        <div className="flex items-center gap-4">
            <ThemeSelector />
        </div>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Créditos Restantes" value={850} max={1000} suffix="" icon={Zap} color="text-primary" delay={0} />
        <StatCard title="Anúncios Gerados" value={124} suffix="" icon={Megaphone} color="text-pink-500" delay={0.1} />
        <StatCard title="Tempo Economizado" value={14} suffix="h 30m" icon={Clock} color="text-blue-500" delay={0.2} />
        <StatCard title="ROI Estimado" value={15400} prefix="R$ " suffix="" icon={TrendingUp} color="text-green-400" isCurrency delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Acesso Rápido
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ShortcutCard icon={Megaphone} title="Gerador de Anúncios" desc="Crie copies persuasivas." color="text-blue-500" onClick={() => onNavigate('ads')} />
                <ShortcutCard icon={Camera} title="Studio Product AI" desc="Fotos 4K em segundos." color="text-pink-500" onClick={() => onNavigate('studio')} />
                <ShortcutCard icon={Mail} title="Email Marketing" desc="Funis de alta conversão." color="text-orange-500" onClick={() => onNavigate('email')} />
                <ShortcutCard icon={UserCircle} title="Persona Hacker" desc="Descubra seu público." color="text-purple-500" onClick={() => onNavigate('persona')} />
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