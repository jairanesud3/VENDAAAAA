import React, { useState } from 'react';
import { User, Lock, Building, Save } from 'lucide-react';
import { Toast } from '../ui/Toast';

const Settings: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setShowToast(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toast message="Configurações salvas com sucesso!" isVisible={showToast} onClose={() => setShowToast(false)} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Configurações da Conta</h1>
        <p className="text-slate-400 text-sm">Gerencie seus dados de acesso e preferências.</p>
      </div>

      <div className="grid gap-8">
        
        {/* Profile Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">Perfil Pessoal</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                    <input type="text" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" defaultValue="Ricardo Oliveira" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input type="email" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors opacity-60 cursor-not-allowed" defaultValue="cliente@exemplo.com" disabled />
                </div>
                <div>
                     <label className="block text-sm font-medium text-slate-300 mb-2">Avatar URL</label>
                     <input type="text" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
                </div>
            </div>
        </div>

        {/* Password Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">Segurança</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nova Senha</label>
                    <input type="password" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirmar Senha</label>
                    <input type="password" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                </div>
            </div>
        </div>

        {/* Company Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Building className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-white">Dados da Empresa</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome da Loja</label>
                    <input type="text" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" defaultValue="Minha Loja Drop" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nicho</label>
                    <input type="text" className="w-full bg-[#0A0510] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" defaultValue="Eletrônicos" />
                </div>
            </div>
        </div>

        <div className="flex justify-end">
            <button 
                onClick={handleSave}
                disabled={loading}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
            >
                {loading ? 'Salvando...' : <><Save className="w-5 h-5" /> Salvar Alterações</>}
            </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;