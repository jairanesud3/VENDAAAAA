import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Zap } from 'lucide-react';

// Core Dashboard Components
import DashboardHome from './dashboard/DashboardHome';
import AdGenerator from './dashboard/AdGenerator';
import StudioProduct from './dashboard/StudioProduct';
import Library from './dashboard/Library';
import Settings from './dashboard/Settings';
import ThemeSelector from './ThemeSelector'; 
import ExtraTools from './dashboard/ExtraTools';

// AI Tools
import { EmailGenerator, SeoWriter, InfluencerFinder, PersonaGenerator, RoasCalculator } from './dashboard/Tools';

interface DashboardLayoutProps {
  onBack: () => void;
  userData?: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBack, userData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  const [activeTab, setActiveTab] = useState('overview');

  // Background Controller
  useEffect(() => {
    document.body.classList.add('dashboard-active');
    return () => document.body.classList.remove('dashboard-active');
  }, []);

  // Router Switch
  const renderContent = () => {
    // Check if it is a specific utility tool (e.g., utilities-product_namer)
    if (activeTab.startsWith('utilities-')) {
        const toolId = activeTab.replace('utilities-', '');
        return <ExtraTools initialToolId={toolId} onBack={() => setActiveTab('utilities')} />;
    }

    switch (activeTab) {
      case 'overview': return <DashboardHome onNavigate={setActiveTab} userData={userData} />;
      case 'library': return <Library />;
      case 'ads': return <AdGenerator />;
      case 'studio': return <StudioProduct />;
      case 'email': return <EmailGenerator />;
      case 'seo': return <SeoWriter />;
      case 'utilities': return <ExtraTools />; 
      case 'partners': return <InfluencerFinder />;
      case 'persona': return <PersonaGenerator />;
      case 'roas': return <RoasCalculator />;
      case 'settings': return <Settings />;
      default: return <DashboardHome onNavigate={setActiveTab} userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-400 flex font-sans selection:bg-primary selection:text-white transition-colors duration-500">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={onBack}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Wrapper */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}`}
      >
        
        {/* Top Header */}
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          
          {/* Mobile Menu Trigger */}
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

          <div className="hidden md:block">
             {/* Spacer */}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
             <ThemeSelector />
             
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-primary/10">
                 {userData?.user_metadata?.full_name?.[0] || 'U'}
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 relative overflow-y-auto overflow-x-hidden scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;