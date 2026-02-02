import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Zap } from 'lucide-react';

// Components
import DashboardHome from './dashboard/DashboardHome';
import AdGenerator from './dashboard/AdGenerator';
import StudioProduct from './dashboard/StudioProduct';
import Library from './dashboard/Library';
import Settings from './dashboard/Settings';
import ThemeSelector from './ThemeSelector'; // IMPORT CORRIGIDO PARA ./ThemeSelector (Mesma pasta)

// Tools
import { EmailGenerator, SeoWriter, InfluencerFinder, PersonaGenerator, RoasCalculator } from './dashboard/Tools';

interface DashboardLayoutProps {
  onBack: () => void;
  userData?: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBack, userData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  const [activeTab, setActiveTab] = useState('overview');

  // Background Controller Logic
  useEffect(() => {
    document.body.classList.add('dashboard-active');
    return () => document.body.classList.remove('dashboard-active');
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardHome onNavigate={setActiveTab} userData={userData} />;
      case 'library': return <Library />;
      case 'ads': return <AdGenerator />;
      case 'studio': return <StudioProduct />;
      case 'email': return <EmailGenerator />;
      case 'seo': return <SeoWriter />;
      case 'partners': return <InfluencerFinder />;
      case 'persona': return <PersonaGenerator />;
      case 'roas': return <RoasCalculator />;
      case 'settings': return <Settings />;
      default: return <DashboardHome onNavigate={setActiveTab} userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-400 flex font-sans selection:bg-primary selection:text-white transition-colors duration-500">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={onBack}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Wrapper - Dynamic Margin based on Collapse State */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}`}
      >
        
        {/* Header (Desktop & Mobile) */}
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3 md:hidden">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
             </button>
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center">
                    <Zap className="text-white w-3 h-3 fill-white" />
                </div>
                <span className="text-white font-bold tracking-wide text-sm">DROPHACKER</span>
             </div>
          </div>

          {/* Desktop Left Spacer (Empty usually, or Breadcrumbs) */}
          <div className="hidden md:block">
             {/* Future: Breadcrumbs here */}
          </div>

          {/* Right Actions: Theme Selector & User Profile */}
          <div className="flex items-center gap-4 ml-auto">
             <ThemeSelector />
             
             {/* Simple User Avatar Placeholder */}
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-primary">
                 {userData?.user_metadata?.full_name?.[0] || 'U'}
             </div>
          </div>
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