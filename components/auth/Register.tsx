import React, { useState, useEffect } from 'react';
import { Zap, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RegisterProps {
  onRegister: () => void;
  onLoginClick: () => void;
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onLoginClick, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation Logic
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isTypingConfirm = confirmPassword.length > 0;
  const isValid = name.length > 2 && email.includes('@') && passwordsMatch && password.length >= 6;

  const handleRegisterSubmit = async () => {
    if (!passwordsMatch) {
        setError("As senhas não coincidem.");
        return;
    }

    setLoading(true);
    setError(null);

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    onboarding_completed: false
                }
            }
        });

        if (error) throw error;
        
        if (data.user) {
            onRegister();
        }

    } catch (err: any) {
        setError(err.message || "Erro ao criar conta.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05010D] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-20">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="w-full max-w-md bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Comece Gratuitamente</h2>
          <p className="text-slate-400">Junte-se a +10.000 dropshippers de sucesso.</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 animate-fade-in-up">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
            </div>
        )}

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleRegisterSubmit(); }}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome Completo</label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="Seu nome" 
                required
            />
          </div>
          
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

          <div className="relative">
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
            <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#05010D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors pr-10" 
                    placeholder="Mínimo 6 caracteres" 
                    required
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirmar Senha</label>
            <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`
                        w-full bg-[#05010D] border rounded-lg px-4 py-3 text-white focus:outline-none transition-all pr-10
                        ${!isTypingConfirm ? 'border-white/10 focus:border-primary' : (passwordsMatch ? 'border-green-500 focus:border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'border-red-500 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]')}
                    `}
                    placeholder="Repita a senha" 
                    required
                />
                {isTypingConfirm && (
                    <div className="absolute right-3 top-3">
                        {passwordsMatch ? (
                            <Check className="w-5 h-5 text-green-500 animate-in zoom-in" />
                        ) : (
                            <X className="w-5 h-5 text-red-500 animate-in zoom-in" />
                        )}
                    </div>
                )}
            </div>
            {isTypingConfirm && !passwordsMatch && (
                <p className="text-red-400 text-xs mt-1.5 ml-1">As senhas não coincidem.</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || !isValid}
            className={`
                w-full font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300
                ${isValid 
                    ? 'bg-gradient-to-r from-primary to-primaryDark text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] cursor-pointer' 
                    : 'bg-white/5 text-slate-500 cursor-not-allowed opacity-70'
                }
            `}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Conta Grátis'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Já tem conta? <button onClick={onLoginClick} className="text-primary hover:text-white font-bold transition-colors">Fazer Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;