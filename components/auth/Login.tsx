import React from 'react';
import { Zap, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onRegisterClick: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick, onBack }) => {
  return (
    <div className="min-h-screen bg-[#05010D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="w-full max-w-md bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h2>
          <p className="text-slate-400">Entre para continuar escalando suas vendas.</p>
        </div>

        <button className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors mb-6">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continuar com Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-surface px-4 text-xs text-slate-500 uppercase font-bold">OU</span>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
            <input type="email" className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
            <input type="password" className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-primary to-primaryDark text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
            Acessar Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Não tem conta? <button onClick={onRegisterClick} className="text-primary hover:text-white font-bold transition-colors">Cadastre-se grátis</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;