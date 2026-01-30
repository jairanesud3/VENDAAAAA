import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Zap, Video, Mail, Users, FileText, Settings, BarChart2 } from 'lucide-react';
import StudioProduct from './dashboard/StudioProduct';
import AdGenerator from './dashboard/AdGenerator';
import DashboardHome from './dashboard/DashboardHome';
import PlaceholderPage from './dashboard/PlaceholderPage';

interface DashboardLayoutProps {
  onBack: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBack }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardHome onNavigate={setActiveTab} />;
      case 'ads':
        return <AdGenerator />;
      case 'studio':
        return <StudioProduct />;
      case 'video':
        return <PlaceholderPage 
          title="Roteiros de Vídeo VSL" 
          description="Nossa IA está aprendendo a estrutura dos vídeos mais virais do TikTok e Reels. Em breve você poderá gerar roteiros frame-a-frame."
          icon={Video}
        />;
      case 'email':
        return <PlaceholderPage 
          title="E-mail Marketing" 
          description="Sequências de recuperação de carrinho e e-mails de boas-vindas que realmente convertem. O módulo está em fase de testes beta."
          icon={Mail}
        />;
      case 'partners':
        return <PlaceholderPage 
          title="Gestão de Influenciadores" 
          description="Encontre e gerencie parcerias com influenciadores do seu nicho diretamente pela plataforma. Banco de dados com +50k perfis."
          icon={Users}
        />;
      case 'seo':
        return <PlaceholderPage 
          title="Gerador de Artigos SEO" 
          description="Domine o Google com artigos de blog otimizados para SEO gerados em segundos. Aumente seu tráfego orgânico sem esforço."
          icon={FileText}
        />;
      case 'settings':
        return <PlaceholderPage 
          title="Configurações da Conta" 
          description="Gerencie sua assinatura, chaves de API, membros da equipe e integrações com Shopify/WooCommerce."
          icon={Settings}
        />;
      default:
        return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-400 flex font-sans selection:bg-primary selection:text-white">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={onBack}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen transition-all duration-300">
        
        {/* Mobile Header */}
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="text-white w-4 h-4 fill-white" />
              </div>
              <span className="text-white font-bold tracking-wide">DROPHACKER</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 p-4 md:p-8 relative overflow-y-auto overflow-x-hidden scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;