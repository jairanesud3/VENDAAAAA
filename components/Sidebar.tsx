import React from 'react';
import { 
  Zap, Home, Megaphone, Video, Camera, 
  Mail, Users, FileText, Settings, LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout, activeTab, onTabChange }) => {
  const handleNav = (tab: string) => {
      onTabChange(tab);
      onClose(); // Close mobile menu if open
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-surface border-r border-white/5 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3 cursor-pointer" onClick={() => handleNav('overview')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-wide">DROPHACKER</span>
        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-8 overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
          
          {/* Section: Principal */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Principal</div>
            <nav className="space-y-1">
              <MenuItem icon={Home} label="Início" active={activeTab === 'overview'} onClick={() => handleNav('overview')} />
            </nav>
          </div>

          {/* Section: Criação */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Criação</div>
            <nav className="space-y-1">
              <MenuItem icon={Megaphone} label="Gerador de Anúncios" active={activeTab === 'ads'} onClick={() => handleNav('ads')} />
              <MenuItem icon={Video} label="Roteiros de Vídeo" active={activeTab === 'video'} onClick={() => handleNav('video')} />
              <MenuItem icon={Camera} label="Studio Product AI" badge="NOVO" active={activeTab === 'studio'} onClick={() => handleNav('studio')} />
            </nav>
          </div>

          {/* Section: Marketing */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Marketing</div>
            <nav className="space-y-1">
              <MenuItem icon={Mail} label="E-mail Marketing" active={activeTab === 'email'} onClick={() => handleNav('email')} />
              <MenuItem icon={Users} label="Parcerias" active={activeTab === 'partners'} onClick={() => handleNav('partners')} />
              <MenuItem icon={FileText} label="Artigos SEO" active={activeTab === 'seo'} onClick={() => handleNav('seo')} />
            </nav>
          </div>

          {/* Section: Sistema */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Sistema</div>
            <nav className="space-y-1">
              <MenuItem icon={Settings} label="Configurações" active={activeTab === 'settings'} onClick={() => handleNav('settings')} />
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

const MenuItem: React.FC<{ icon: any, label: string, active?: boolean, badge?: string, onClick: () => void }> = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    title={label}
    className={`
    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${active 
      ? 'bg-primary/10 border-l-2 border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}
  `}>
    <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-slate-400'}`} />
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded uppercase">
        {badge}
      </span>
    )}
  </button>
);

export default Sidebar;