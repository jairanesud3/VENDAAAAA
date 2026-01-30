import React, { useState, useEffect } from 'react';
import { Megaphone, Camera, Zap, ArrowRight, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import ThemeSelector from '../ThemeSelector';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating Supabase Auth Fetch
    const fetchUser = async () => {
      try {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setUser({
          id: 'user_123',
          email: 'jonnas@example.com',
          user_metadata: {
            full_name: 'Jonnas Silva',
            avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
          }
        });
      } catch (error) {
        console.error("Auth error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Safe Name Extraction with Fallback
  const getFirstName = () => {
    if (user && user.user_metadata && user.user_metadata.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    return "Empreendedor";
  };

  const firstName = getFirstName();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Welcome Header & Theme Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex-1">
          {loading ? (
             // Skeleton Loader for Greeting
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
                {user?.user_metadata?.avatar_url ? (
                   <img 
                      src={user.user_metadata.avatar_url}
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
           {/* Theme Customizer Component */}
           <ThemeSelector />
           
           <div className="hidden md:flex px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accentGreen animate-pulse"></span>
            Sistema Operacional
          </div>
        </div>
      </div>

      {/* Quick Stats - Robust Rendering */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
           // Skeleton for Cards
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
                <div className="text-slate-400 text-sm font-medium mb-1">Créditos de IA</div>
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
                <div className="text-slate-400 text-sm font-medium mb-1">Imagens Geradas</div>
                <div className="text-3xl font-bold text-white">124</div>
                <div className="text-xs text-accentGreen mt-4 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% essa semana
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-surface border border-primary/20 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-center">
              <h3 className="text-white font-bold text-lg mb-2">Plano Escala Pro ⚡</h3>
              <p className="text-slate-400 text-sm mb-4">Você tem acesso a todas as ferramentas premium.</p>
              <button className="text-primary text-sm font-bold hover:text-white transition-colors flex items-center gap-1">
                Gerenciar Assinatura <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Shortcuts */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" /> Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <button 
            onClick={() => onNavigate('studio')}
            className="group bg-card border border-white/5 hover:border-primary/50 p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">Studio Product AI</h3>
            <p className="text-slate-400 text-sm">Crie fotos profissionais de produtos usando inteligência artificial.</p>
          </button>

          <button 
            onClick={() => onNavigate('ads')}
            className="group bg-card border border-white/5 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Gerador de Anúncios</h3>
            <p className="text-slate-400 text-sm">Crie copies persuasivas para Facebook, Instagram e TikTok.</p>
          </button>

          <div className="group bg-card border border-dashed border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 hover:border-white/20 transition-all cursor-not-allowed">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-300 mb-2">Em Breve</h3>
            <p className="text-slate-500 text-sm">Minerador de Produtos V3.0 está em desenvolvimento.</p>
          </div>

        </div>
      </div>

      {/* News / Changelog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <h2 className="text-lg font-bold text-white mb-4">Novidades & Tutoriais</h2>
           <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
             {[
               { title: "Como escalar para R$ 100k/mês com DropHacker", tag: "Aula", date: "Hoje" },
               { title: "Atualização V2.5: Novas vozes para vídeo", tag: "Update", date: "Ontem" },
               { title: "Segredos do Criativo que converte 5x mais", tag: "Dica", date: "15 Jan" },
             ].map((news, i) => (
               <div key={i} className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer last:border-0">
                 <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <div>
                     <div className="text-white font-medium hover:text-primary transition-colors">{news.title}</div>
                     <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                       <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{news.tag}</span>
                       <span>• {news.date}</span>
                     </div>
                   </div>
                 </div>
                 <ArrowRight className="w-4 h-4 text-slate-500" />
               </div>
             ))}
           </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-4">Status do Sistema</h2>
          <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white font-medium">Todos sistemas operacionais</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gerador de Imagens</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Gerador de Copy</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">API Gateway</span>
                <span className="text-green-400">Online</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 flex gap-2">
              <AlertCircle className="w-4 h-4" />
              Latência média: 24ms
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;