import React, { useState } from 'react';
import { Zap, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LoginProps {
  onLogin: (user: any) => void;
  onRegisterClick: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        if (data.user) {
            // Check if user has completed onboarding (stored in metadata)
            const userData = {
                ...data.user,
                onboarding_completed: data.user.user_metadata?.onboarding_completed || false
            };
            onLogin(userData);
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      } finally {
        setLoading(false);
      }
  };

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

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
            </div>
        )}

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(); }}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="seu@email.com" 
                required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="••••••••" 
                required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primaryDark text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar Dashboard'}
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