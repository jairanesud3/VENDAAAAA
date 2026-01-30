import React, { useState } from 'react';
import { 
  Zap, Home, Megaphone, Camera, 
  Mail, Users, FileText, Settings, LogOut,
  Calculator, UserCircle2, Library, ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, onClose, onLogout, activeTab, onTabChange, isCollapsed, toggleCollapse 
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNav = (tab: string) => {
      onTabChange(tab);
      onClose(); 
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
        fixed top-0 left-0 h-full bg-[#05010D] border-r border-white/5 z-50
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Header */}
        <div className={`h-16 flex items-center border-b border-white/5 ${isCollapsed ? 'justify-center' : 'px-6 gap-3'} transition-all`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
          {!isCollapsed && <span className="text-white font-bold text-lg tracking-wide whitespace-nowrap overflow-hidden">DROPHACKER</span>}
        </div>

        {/* Toggle Button (Desktop Only) */}
        <button 
            onClick={toggleCollapse}
            className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-surface border border-white/10 rounded-full items-center justify-center text-slate-400 hover:text-white hover:border-primary transition-colors z-50 shadow-lg"
        >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Menu Content */}
        <div className="p-3 space-y-6 overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
          
          <MenuSection title="Principal" isCollapsed={isCollapsed}>
             <MenuItem icon={Home} label="Início" active={activeTab === 'overview'} onClick={() => handleNav('overview')} collapsed={isCollapsed} />
             <MenuItem icon={Library} label="Biblioteca" active={activeTab === 'library'} onClick={() => handleNav('library')} collapsed={isCollapsed} />
          </MenuSection>

          <MenuSection title="Ferramentas AI" isCollapsed={isCollapsed}>
             <MenuItem icon={Megaphone} label="Ads Generator" active={activeTab === 'ads'} onClick={() => handleNav('ads')} collapsed={isCollapsed} />
             <MenuItem icon={Camera} label="Studio Product" badge="V4" active={activeTab === 'studio'} onClick={() => handleNav('studio')} collapsed={isCollapsed} />
             <MenuItem icon={Mail} label="Email Mkt" active={activeTab === 'email'} onClick={() => handleNav('email')} collapsed={isCollapsed} />
             <MenuItem icon={FileText} label="Artigos SEO" active={activeTab === 'seo'} onClick={() => handleNav('seo')} collapsed={isCollapsed} />
          </MenuSection>

          <MenuSection title="Estratégia" isCollapsed={isCollapsed}>
             <MenuItem icon={Users} label="Influencers" active={activeTab === 'partners'} onClick={() => handleNav('partners')} collapsed={isCollapsed} />
             <MenuItem icon={UserCircle2} label="Persona" active={activeTab === 'persona'} onClick={() => handleNav('persona')} collapsed={isCollapsed} />
             <MenuItem icon={Calculator} label="Calc. ROAS" active={activeTab === 'roas'} onClick={() => handleNav('roas')} collapsed={isCollapsed} />
          </MenuSection>

          <div className="pt-4 border-t border-white/5">
             <MenuItem icon={Settings} label="Configurações" active={activeTab === 'settings'} onClick={() => handleNav('settings')} collapsed={isCollapsed} />
             <button 
                onClick={() => setShowLogoutModal(true)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium ${isCollapsed ? 'justify-center' : ''}`}
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span>Sair</span>}
              </button>
          </div>
        </div>
      </aside>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#0F0518] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                >
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500 mx-auto">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center">Tem certeza?</h3>
                    <p className="text-slate-400 text-sm mb-6 text-center">
                        Você será desconectado da sua conta.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowLogoutModal(false)}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={onLogout}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20"
                        >
                            Sair Agora
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

const MenuSection: React.FC<{ title: string, isCollapsed: boolean, children: React.ReactNode }> = ({ title, isCollapsed, children }) => (
    <div>
        {!isCollapsed && <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 px-3 transition-opacity duration-300">{title}</div>}
        <nav className="space-y-0.5">{children}</nav>
    </div>
);

const MenuItem: React.FC<{ icon: any, label: string, active?: boolean, badge?: string, collapsed: boolean, onClick: () => void }> = ({ icon: Icon, label, active, badge, collapsed, onClick }) => (
  <button 
    onClick={onClick}
    title={label}
    className={`
    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${active 
      ? 'bg-primary/10 border-l-2 border-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}
    ${collapsed ? 'justify-center' : ''}
  `}>
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-primary' : 'text-slate-400'}`} />
    {!collapsed && <span className="flex-1 text-left whitespace-nowrap overflow-hidden">{label}</span>}
    {!collapsed && badge && (
      <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded uppercase">
        {badge}
      </span>
    )}
    {collapsed && active && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"></div>}
  </button>
);

export default Sidebar;