import React, { useState } from 'react';
import { 
  Zap, Home, Megaphone, Camera, 
  Mail, Users, FileText, Settings, LogOut,
  Calculator, UserCircle2, Library, CreditCard,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import Link from 'next/link';
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
      if (window.innerWidth < 768) onClose(); 
  };

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Principal */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#05010D] border-r border-white/5 z-50
        flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}>
        {/* Header Logo */}
        <div className={`h-20 flex items-center border-b border-white/5 ${isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'} transition-all duration-300 flex-shrink-0 whitespace-nowrap overflow-hidden`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)] flex-shrink-0">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          {!isCollapsed && (
             <div className="flex flex-col overflow-hidden">
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-white font-bold text-lg tracking-wide whitespace-nowrap"
                >
                  DROPHACKER
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-primary font-bold tracking-widest uppercase whitespace-nowrap"
                >
                  AI Suite V4
                </motion.span>
             </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-8 custom-scrollbar">
          
          <MenuSection title="DASHBOARD" isCollapsed={isCollapsed}>
             <MenuItem icon={Home} label="Visão Geral" active={activeTab === 'overview'} onClick={() => handleNav('overview')} collapsed={isCollapsed} />
             <MenuItem icon={Library} label="Minha Biblioteca" active={activeTab === 'library'} onClick={() => handleNav('library')} collapsed={isCollapsed} />
          </MenuSection>

          <MenuSection title="FERRAMENTAS AI" isCollapsed={isCollapsed}>
             <MenuItem icon={Megaphone} label="Gerador de Anúncios" active={activeTab === 'ads'} onClick={() => handleNav('ads')} collapsed={isCollapsed} badge="HOT" />
             <MenuItem icon={Camera} label="Studio Product AI" active={activeTab === 'studio'} onClick={() => handleNav('studio')} collapsed={isCollapsed} />
             <MenuItem icon={Mail} label="Email Marketing" active={activeTab === 'email'} onClick={() => handleNav('email')} collapsed={isCollapsed} />
             <MenuItem icon={FileText} label="Artigos SEO" active={activeTab === 'seo'} onClick={() => handleNav('seo')} collapsed={isCollapsed} />
          </MenuSection>

          <MenuSection title="ESTRATÉGIA" isCollapsed={isCollapsed}>
             <MenuItem icon={Users} label="Influencer Hunter" active={activeTab === 'partners'} onClick={() => handleNav('partners')} collapsed={isCollapsed} />
             <MenuItem icon={UserCircle2} label="Gerador de Persona" active={activeTab === 'persona'} onClick={() => handleNav('persona')} collapsed={isCollapsed} />
             <MenuItem icon={Calculator} label="Calculadora ROAS" active={activeTab === 'roas'} onClick={() => handleNav('roas')} collapsed={isCollapsed} />
          </MenuSection>

        </div>

        {/* Footer Actions (Sticky Bottom) */}
        <div className="p-3 border-t border-white/5 flex-shrink-0 space-y-1 bg-[#05010D]">
             
             {/* Collapse Toggle */}
             <button 
                onClick={toggleCollapse}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium hidden md:flex ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? "Expandir Menu" : "Recolher Menu"}
             >
                {isCollapsed ? <PanelLeftOpen className="w-5 h-5 flex-shrink-0" /> : <PanelLeftClose className="w-5 h-5 flex-shrink-0" />}
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Recolher Menu</span>}
             </button>

             <Link 
                href="/dashboard/subscription"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium group ${isCollapsed ? 'justify-center' : ''}`}
             >
                <CreditCard className="w-5 h-5 group-hover:text-primary transition-colors flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Assinatura</span>}
             </Link>

             <MenuItem icon={Settings} label="Configurações" active={activeTab === 'settings'} onClick={() => handleNav('settings')} collapsed={isCollapsed} />
             
             <button 
                onClick={() => setShowLogoutModal(true)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium group ${isCollapsed ? 'justify-center' : ''}`}
                title="Sair"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-400 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Sair</span>}
              </button>
        </div>
      </aside>

      {/* Modal de Logout Seguro */}
      <AnimatePresence>
        {showLogoutModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0F0518] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                    
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500 mx-auto border border-red-500/20">
                        <LogOut className="w-6 h-6 ml-1" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 text-center">Tem certeza?</h3>
                    <p className="text-slate-400 text-sm mb-8 text-center leading-relaxed">
                        Você será desconectado da plataforma. Qualquer geração não salva será perdida.
                    </p>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowLogoutModal(false)}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={onLogout}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20"
                        >
                            Sim, Sair
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
    <div className="mb-6">
        {!isCollapsed && (
            <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest mb-3 px-3 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                {title}
            </div>
        )}
        <nav className="space-y-1">{children}</nav>
    </div>
);

const MenuItem: React.FC<{ icon: any, label: string, active?: boolean, badge?: string, collapsed: boolean, onClick: () => void }> = ({ icon: Icon, label, active, badge, collapsed, onClick }) => (
  <button 
    onClick={onClick}
    title={label}
    className={`
    w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
    ${active 
      ? 'bg-primary/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-primary/20' 
      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
    ${collapsed ? 'justify-center' : ''}
  `}>
    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? 'text-primary' : 'text-slate-500 group-hover:text-white'}`} />
    
    {!collapsed && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="truncate whitespace-nowrap">{label}</span>
            {badge && (
                <span className="text-[9px] font-bold bg-gradient-to-r from-primary to-purple-600 text-white px-1.5 py-0.5 rounded shadow-sm">
                    {badge}
                </span>
            )}
        </div>
    )}
    
    {collapsed && active && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(168,85,247,1)]"></div>
    )}
  </button>
);

export default Sidebar;