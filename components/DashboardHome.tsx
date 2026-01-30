import React, { useState, useEffect } from 'react';
import { Megaphone, Camera, Zap, ArrowRight, TrendingUp, AlertCircle, Mail, UserCircle } from 'lucide-react';
import ThemeSelector from '../ThemeSelector';
import { manageSubscriptionAction } from '../../lib/ai-actions';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
  userData?: any;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate, userData }) => {
  const [user, setUser] = useState<any>(userData || null);
  const [loading, setLoading] = useState(!userData);

  useEffect(() => {
    if (userData) {
        setUser(userData);
        setLoading(false);
    } else {
        // Fallback for direct dashboard access
        const timer = setTimeout(() => {
            setUser({
              id: 'fallback_user',
              user_metadata: {
                full_name: 'Empreendedor',
                avatar_url: null
              }
            });
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }
  }, [userData]);

  const handleManageSubscription = async () => {
    // In a real app this would redirect to stripe
    const url = await manageSubscriptionAction(user?.id);
    if (url.startsWith('http')) {
        window.open(url, '_blank');
    } else {
        // If free user, show plans (mocked by alerting or navigating to upgrade)
        alert("Você está no plano Gratuito. Atualize para o Pro!");
    }
  };

  // Safe Name Extraction
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || "Empreendedor";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex-1">
          {loading ? (
             <div className="space-y-3">
               <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
               <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
             </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{firstName}</span> 👋
                </h1>
                {avatarUrl ? (
                   <img 
                      src={avatarUrl}
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(168,85,247,0.4)] object-cover"
                   />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold">
                    {firstName[0]}
                  </div>
                )}
              </div>
              <p className="text-slate-400">Aqui está o resumo da sua operação hoje.</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
           <ThemeSelector />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
           [1, 2, 3].map(i => (
             <div key={i} className="h-40 bg-white/5 border border-white/5 rounded-2xl animate-pulse"></div>
           ))
        ) : (
          <>
            <div className="bg-surface border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="text-slate-400 text-sm font-medium mb-1">Créditos IA</div>
                <div className="text-3xl font-bold text-white">850 <span className="text-sm text-slate-500 font-normal">/ 1000</span></div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgb(var(--color-primary))]" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp className="w-24 h-24 text-accentGreen" />
              </div>
              <div className="relative z-10">
                <div className="text-slate-400 text-sm font-medium mb-1">Gerações Totais</div>
                <div className="text-3xl font-bold text-white">124</div>
                <div className="text-xs text-accentGreen mt-4 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% essa semana
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-surface border border-primary/20 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-center">
              <h3 className="text-white font-bold text-lg mb-2">Plano Escala Pro ⚡</h3>
              <p className="text-slate-400 text-sm mb-4">Acesso total a todas as ferramentas.</p>
              <button 
                onClick={handleManageSubscription}
                className="text-primary text-sm font-bold hover:text-white transition-colors flex items-center gap-1"
              >
                Gerenciar Assinatura <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Shortcuts */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" /> Ferramentas Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <ShortcutCard 
            icon={Megaphone} 
            title="Gerador de Anúncios" 
            desc="Crie copies persuasivas para redes sociais."
            color="text-blue-500"
            onClick={() => onNavigate('ads')}
          />
          
          <ShortcutCard 
            icon={Camera} 
            title="Studio Product AI" 
            desc="Fotos de estúdio 4K para seus produtos."
            color="text-pink-500"
            onClick={() => onNavigate('studio')}
          />

          <ShortcutCard 
            icon={Mail} 
            title="Email Marketing" 
            desc="Sequências de alta conversão."
            color="text-orange-500"
            onClick={() => onNavigate('email')}
          />
          
          <ShortcutCard 
            icon={UserCircle} 
            title="Gerador de Persona" 
            desc="Descubra quem é seu cliente ideal."
            color="text-purple-500"
            onClick={() => onNavigate('persona')}
          />

        </div>
      </div>
    </div>
  );
};

const ShortcutCard = ({ icon: Icon, title, desc, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="group bg-card border border-white/5 hover:border-white/20 p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </button>
);

export default DashboardHome;