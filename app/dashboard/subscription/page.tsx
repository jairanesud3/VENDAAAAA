'use client';

import React, { useTransition } from 'react';
import { Check, Zap, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '../../actions/stripe';
import { motion } from 'framer-motion';

export default function SubscriptionPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = (planType: 'basic' | 'pro') => {
    startTransition(async () => {
      const { url } = await createCheckoutSession(planType);
      if (url) {
        window.location.href = url;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#05010D] p-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-12">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
        <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-500 font-bold uppercase tracking-wider">Pagamento Seguro</span>
        </div>
      </div>

      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
           Desbloqueie o Poder Total
        </h1>
        <p className="text-lg text-slate-400">
           Escolha o plano que vai escalar sua operação para o próximo nível. 
           Cancele a qualquer momento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* BASIC PLAN */}
        <div className="bg-surface border border-white/5 rounded-3xl p-8 relative hover:border-white/20 transition-all flex flex-col">
          <div className="mb-6">
             <h3 className="text-xl font-bold text-white mb-2">INICIANTE</h3>
             <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">R$ 49,90</span>
                <span className="text-slate-500 mb-1">/mês</span>
             </div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
             <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-5 h-5 text-slate-500" /> 800 Gerações de Texto
             </li>
             <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-5 h-5 text-slate-500" /> 60 Imagens Studio AI
             </li>
             <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-5 h-5 text-slate-500" /> Suporte via Email
             </li>
          </ul>

          <button 
            onClick={() => handleSubscribe('basic')}
            disabled={isPending}
            className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Assinar Basic'}
          </button>
        </div>

        {/* PRO PLAN */}
        <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-[#0F0518] border border-primary/50 rounded-3xl p-8 relative shadow-2xl shadow-primary/20 flex flex-col transform md:scale-105 z-10"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
             <Zap className="w-3 h-3 fill-white" /> Recomendado
          </div>

          <div className="mb-6">
             <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                ESCALA PRO <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">V4.0</span>
             </h3>
             <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-white">R$ 97,00</span>
                <span className="text-slate-500 mb-1">/mês</span>
             </div>
             <p className="text-xs text-slate-400 mt-2">Cobrado anualmente ou R$ 127 mensal</p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
             {[
                'Gerações de Texto ILIMITADAS',
                '300 Imagens de Estúdio (4K)',
                'Acesso ao Marketplace Generator',
                'Filtro Anti-Bloqueio VIP',
                'Suporte Prioritário WhatsApp'
             ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                </li>
             ))}
          </ul>

          <button 
            onClick={() => handleSubscribe('pro')}
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Quero Escalar Agora 🚀'}
          </button>
          
          <div className="mt-4 text-center text-xs text-slate-500">
             7 dias de garantia incondicional.
          </div>
        </motion.div>

      </div>
    </div>
  );
}