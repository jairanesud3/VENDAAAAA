import React, { useState, useEffect } from 'react';
import { Megaphone, Camera, Zap, ArrowRight, TrendingUp, Mail, UserCircle, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import ThemeSelector from '../ThemeSelector';
import { manageSubscriptionAction } from '../../lib/ai-actions';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
  userData?: any;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate, userData }) => {
  const [user, setUser] = useState<any>(userData || null);
  const [loading, setLoading] = useState(!userData);
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Initial Logic: Greeting & Date
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

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || "Hacker";

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* 1. HEADER DINÂMICO */}
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

      {/* 2. GRID DE ESTATÍSTICAS ANIMADAS (Contadores) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Créditos Restantes" 
            value={850} 
            max={1000} 
            suffix="" 
            icon={Zap} 
            color="text-primary" 
            delay={0} 
        />
        <StatCard 
            title="Anúncios Gerados" 
            value={124} 
            suffix="" 
            icon={Megaphone} 
            color="text-pink-500" 
            delay={0.1} 
        />
        <StatCard 
            title="Tempo Economizado" 
            value={14} 
            suffix="h 30m" 
            icon={Clock} 
            color="text-blue-500" 
            delay={0.2} 
        />
        <StatCard 
            title="ROI Estimado" 
            value={15400} 
            prefix="R$ " 
            suffix="" 
            icon={TrendingUp} 
            color="text-green-400" 
            isCurrency 
            delay={0.3} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. ATALHOS RÁPIDOS (3D TILT) */}
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Acesso Rápido
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Tool3DCard 
                    icon={Megaphone} 
                    title="Gerador de Anúncios" 
                    desc="Crie copies persuasivas."
                    color="text-blue-500"
                    border="hover:border-blue-500/50"
                    onClick={() => onNavigate('ads')}
                />
                <Tool3DCard 
                    icon={Camera} 
                    title="Studio Product AI" 
                    desc="Fotos 4K em segundos."
                    color="text-pink-500"
                    border="hover:border-pink-500/50"
                    onClick={() => onNavigate('studio')}
                />
                <Tool3DCard 
                    icon={Mail} 
                    title="Email Marketing" 
                    desc="Funis de alta conversão."
                    color="text-orange-500"
                    border="hover:border-orange-500/50"
                    onClick={() => onNavigate('email')}
                />
                <Tool3DCard 
                    icon={UserCircle} 
                    title="Persona Hacker" 
                    desc="Descubra seu público."
                    color="text-purple-500"
                    border="hover:border-purple-500/50"
                    onClick={() => onNavigate('persona')}
                />
             </div>

             {/* GRÁFICO VISUAL (CSS Only) */}
             <div className="bg-surface border border-white/5 rounded-2xl p-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-white">Performance Semanal</h3>
                    <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">+22% vs. anterior</span>
                </div>
                <div className="h-40 flex items-end gap-2 md:gap-4 justify-between">
                    {[30, 45, 25, 60, 75, 50, 90].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                            className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm relative group cursor-pointer"
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h}%
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2 uppercase font-bold">
                    <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
                </div>
             </div>
          </div>

          {/* 4. ATIVIDADE RECENTE (LIVE FEED) */}
          <div className="lg:col-span-1">
             <div className="bg-[#0A0510] border border-white/5 rounded-2xl h-full flex flex-col">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white">Log de Atividades</h3>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                </div>
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <ActivityItem icon={Megaphone} text="Gerou Copy 'Corretor Postural'" time="2 min atrás" color="text-blue-500" />
                    <ActivityItem icon={Camera} text="Criou 4 Imagens de Estúdio" time="15 min atrás" color="text-pink-500" />
                    <ActivityItem icon={UserCircle} text="Nova Persona Definida" time="1h atrás" color="text-purple-500" />
                    <ActivityItem icon={Zap} text="Login detectado (SP)" time="3h atrás" color="text-yellow-500" />
                    <ActivityItem icon={Mail} text="Campanha de Email Salva" time="Ontem" color="text-orange-500" />
                </div>
                <div className="p-4 border-t border-white/5">
                    <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        Ver Histórico Completo
                    </button>
                </div>
             </div>
          </div>

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const StatCard = ({ title, value, max, suffix, prefix, icon: Icon, color, isCurrency, delay }: any) => {
    // Simple animated counter effect simulation
    return (
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
                {prefix}
                <Counter value={value} />
                <span className="text-sm text-slate-500 font-normal mb-1">{suffix} {max ? `/ ${max}` : ''}</span>
            </div>
            {max && (
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / max) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} 
                  />
                </div>
            )}
        </motion.div>
    );
};

const Counter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const controls = { value: 0 };
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [value]);
    
    return <span>{count.toLocaleString('pt-BR')}</span>;
};

const Tool3DCard = ({ icon: Icon, title, desc, color, border, onClick }: any) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5, z: 20 }}
            className={`bg-[#0F0518] border border-white/5 p-6 rounded-2xl cursor-pointer group transition-colors ${border}`}
            style={{ perspective: 1000 }}
            onClick={onClick}
        >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm">{desc}</p>
        </motion.div>
    );
}

const ActivityItem = ({ icon: Icon, text, time, color }: any) => (
    <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-3 items-start p-2 hover:bg-white/5 rounded-lg transition-colors"
    >
        <div className={`mt-1 min-w-[24px] ${color}`}>
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <div className="text-sm text-slate-200 font-medium leading-tight">{text}</div>
            <div className="text-[10px] text-slate-500 mt-1">{time}</div>
        </div>
    </motion.div>
);

export default DashboardHome;