import React from 'react';
import { ArrowLeft, Check, Lock, CreditCard } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, onSuccess }) => {
  return (
    <div className="min-h-screen bg-[#05010D] text-slate-400 flex flex-col md:flex-row">
      
      {/* Left Panel - Order Summary */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 border-r border-white/5 bg-surface relative overflow-hidden">
        <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        
        <div className="mt-12">
          <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Resumo do Pedido</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Assinar Plano Escala Pro</h2>
          
          <div className="flex items-end gap-2 mb-8">
            <span className="text-5xl font-bold text-white">R$ 97,00</span>
            <span className="text-slate-400 mb-1">/mês</span>
          </div>

          <div className="space-y-4 mb-12">
            {[
              'Gerações de Texto Ilimitadas',
              '300 Imagens de Estúdio (4K)',
              'Studio Product AI Completo',
              'Filtro Anti-Bloqueio VIP',
              'Suporte Prioritário WhatsApp'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 w-fit">
            <Lock className="w-3 h-3" />
            <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Payment Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-[#05010D]">
        <h3 className="text-2xl font-bold text-white mb-8">Dados de Pagamento</h3>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
              <input type="email" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="seu@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Informações do Cartão</label>
              <div className="relative">
                <input type="text" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors pl-10" placeholder="0000 0000 0000 0000" />
                <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input type="text" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="MM / AA" />
                <input type="text" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="CVC" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome no Cartão</label>
              <input type="text" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Nome impresso no cartão" />
            </div>
          </div>

          <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg shadow-lg hover:bg-slate-200 hover:scale-[1.01] transition-all duration-300 mt-4 text-lg">
            Assinar Agora
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6">
            <Lock className="w-3 h-3" />
            Pagamento 100% Seguro via Stripe.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;