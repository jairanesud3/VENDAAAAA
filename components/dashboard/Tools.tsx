import React, { useState } from 'react';
import { Mail, Search, Users, Calculator, Sparkles, Copy, UserCircle, Target, BarChart, DollarSign, Loader2 } from 'lucide-react';
import { generateAdCopyAction } from '../../lib/ai-actions';
import ToolHeader from './ToolHeader';

// --- SHARED LAYOUT COMPONENT ---
const ToolLayout: React.FC<{
  title: string;
  desc: string;
  icon: any;
  loading: boolean;
  onGenerate: () => void;
  result: string | null;
  helpSteps?: string[];
  children: React.ReactNode;
}> = ({ title, desc, icon: Icon, loading, onGenerate, result, helpSteps = ["Preencha os dados.", "Clique em Gerar."], children }) => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Inputs */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        <ToolHeader 
            title={title}
            description={desc}
            icon={Icon}
            helpSteps={helpSteps}
        />
        
        <div className="space-y-5">{children}</div>

        <button 
          onClick={onGenerate}
          disabled={loading}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 mt-8 flex items-center justify-center gap-2 group"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:text-yellow-200" />}
          {loading ? 'IA Pensando...' : 'Gerar Resultado'}
        </button>
      </div>

      {/* Result */}
      <div className="w-full lg:w-2/3 bg-[#0A0510] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative shadow-inner">
        {result ? (
          <div className="flex-1 p-8 overflow-y-auto relative custom-scrollbar">
            <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="absolute top-4 right-4 text-xs text-primary hover:text-white flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all z-10"
            >
              <Copy className="w-3 h-3" /> Copiar
            </button>
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-sm selection:bg-primary/30">
              {result}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 opacity-50">
            <Icon className="w-16 h-16 mb-4 animate-pulse-slow" />
            <p>Preencha os dados à esquerda para começar a mágica.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 1. EMAIL GENERATOR (REAL AI) ---
export const EmailGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [product, setProduct] = useState('');
  const [target, setTarget] = useState('');
  const [type, setType] = useState('abandoned_cart');
  const [tone, setTone] = useState('persuasive');

  const handleGen = async () => {
    if(!product) return;
    setLoading(true);
    try {
      const context = `EMAIL_MARKETING | Tipo: ${type} | Tom: ${tone} | Público: ${target}`;
      const res = await generateAdCopyAction(product, "", context);
      setResult(res);
    } catch(e) {
      setResult("Erro ao gerar email.");
    } finally { setLoading(false); }
  };

  return (
    <ToolLayout 
        title="Email Marketing Pro" 
        desc="Sequências de funil completas." 
        icon={Mail} 
        loading={loading} 
        onGenerate={handleGen} 
        result={result}
        helpSteps={[
            "Defina o objetivo (Ex: Recuperação de Carrinho, Boas-vindas).",
            "Digite o nome do produto e desconto (opcional).",
            "Escolha o tom de voz da mensagem.",
            "Copie o texto gerado pela IA."
        ]}
    >
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Nome do Produto</label>
        <input value={product} onChange={e => setProduct(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" placeholder="Ex: Corretor Postural" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Público Alvo</label>
        <input value={target} onChange={e => setTarget(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" placeholder="Ex: Homens 30-45 anos" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Tipo de Sequência</label>
        <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
          <option value="abandoned_cart">Recuperação de Carrinho</option>
          <option value="boleto">Recuperação de Boleto</option>
          <option value="welcome">Boas-vindas (Onboarding)</option>
          <option value="launch">Lançamento / Promoção</option>
          <option value="post_purchase">Pós-venda e Upsell</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Tom de Voz</label>
        <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
          <option value="persuasive">Persuasivo (Gatilhos Mentais)</option>
          <option value="urgent">Urgente / Escassez</option>
          <option value="friendly">Amigável / Relacionamento</option>
          <option value="professional">Profissional / Autoridade</option>
        </select>
      </div>
    </ToolLayout>
  );
};

// --- 2. SEO WRITER (REAL AI) ---
export const SeoWriter = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');

  const handleGen = async () => {
    if(!keyword) return;
    setLoading(true);
    try {
        const context = "BLOG_POST_SEO_ARTICLE_FULL";
        const res = await generateAdCopyAction(keyword, "", context);
        setResult(res);
    } finally {
        setLoading(false);
    }
  };

  return (
    <ToolLayout 
        title="Artigos SEO" 
        desc="Blog posts otimizados para o Google." 
        icon={Search} 
        loading={loading} 
        onGenerate={handleGen} 
        result={result}
        helpSteps={[
            "Insira a Palavra-Chave principal.",
            "A IA escreverá um artigo completo otimizado com tags H1, H2 e H3."
        ]}
    >
      <div>
        <label className="text-sm text-slate-300 block mb-2">Palavra-Chave Principal</label>
        <input value={keyword} onChange={e => setKeyword(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: Melhores tênis de corrida" />
      </div>
    </ToolLayout>
  );
};

// --- 3. INFLUENCER FINDER (REAL AI) ---
export const InfluencerFinder = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [size, setSize] = useState('micro');

  const handleGen = async () => {
    if(!niche) return;
    setLoading(true);
    try {
        const context = `INFLUENCER_OUTREACH_STRATEGY | Plataforma: ${platform} | Tamanho: ${size}`;
        const res = await generateAdCopyAction(niche, "", context);
        setResult(res);
    } finally {
        setLoading(false);
    }
  };

  return (
    <ToolLayout title="Parcerias / Influencers" desc="Encontre e aborde parceiros." icon={Users} loading={loading} onGenerate={handleGen} result={result}>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Nicho do Influencer</label>
        <input value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: Fitness / Yoga" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Plataforma</label>
        <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">Tamanho (Seguidores)</label>
        <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
          <option value="nano">Nano (1k - 10k)</option>
          <option value="micro">Micro (10k - 100k)</option>
          <option value="macro">Macro (100k+)</option>
        </select>
      </div>
    </ToolLayout>
  );
};

// --- 4. PERSONA GENERATOR (REAL AI) ---
export const PersonaGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [niche, setNiche] = useState('');

  const handleGen = async () => {
    if(!niche) return;
    setLoading(true);
    try {
        const context = "BUYER_PERSONA_GENERATION_PROFILE";
        const res = await generateAdCopyAction(niche, "", context);
        setResult(res);
    } finally {
        setLoading(false);
    }
  };

  return (
    <ToolLayout title="Gerador de Persona" desc="Descubra quem compra de você." icon={UserCircle} loading={loading} onGenerate={handleGen} result={result}>
      <div>
        <label className="text-sm font-medium text-slate-300 block mb-2">O que você vende?</label>
        <input value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Ex: Acessórios de escritório ergonômicos" />
      </div>
    </ToolLayout>
  );
};

// --- 5. ROAS CALCULATOR (MATH ONLY) ---
export const RoasCalculator = () => {
  const [data, setData] = useState({
    budget: '',
    cogs: '', // Cost of Goods Sold
    shipping: '',
    tax: '', // %
    gateway: '', // %
    targetRoas: '2' // Expectation
  });
  const [result, setResult] = useState<any | null>(null);

  const calculate = () => {
    const budget = parseFloat(data.budget) || 0;
    const cogs = parseFloat(data.cogs) || 0;
    const shipping = parseFloat(data.shipping) || 0;
    const taxRate = (parseFloat(data.tax) || 0) / 100;
    const gatewayRate = (parseFloat(data.gateway) || 0) / 100;
    const targetRoas = parseFloat(data.targetRoas) || 0;

    if (!budget || !targetRoas) return;

    // Projection Logic
    const estimatedRevenue = budget * targetRoas;
    const taxes = estimatedRevenue * taxRate;
    const gatewayFees = estimatedRevenue * gatewayRate;
    
    // Estimate sales volume
    const estimatedAOV = (cogs + shipping) * 2.5 || 100; 
    const estimatedSalesCount = Math.floor(estimatedRevenue / estimatedAOV);
    
    const totalProductCost = estimatedSalesCount * (cogs + shipping);
    const totalCosts = budget + taxes + gatewayFees + totalProductCost;
    const netProfit = estimatedRevenue - totalCosts;
    const margin = estimatedRevenue > 0 ? (netProfit / estimatedRevenue) * 100 : 0;
    const breakEvenRoas = budget > 0 ? totalCosts / budget : 0; 
    const maxCPA = estimatedSalesCount > 0 ? budget / estimatedSalesCount : 0;

    setResult({
        revenue: estimatedRevenue,
        netProfit,
        margin,
        maxCPA,
        breakEvenRoas
    });
  };

  return (
    <ToolLayout title="Calculadora de Lucro (ROAS)" desc="Simule a viabilidade da sua operação." icon={Calculator} loading={false} onGenerate={calculate} result={null}>
      <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Orçamento Diário (Ads)</label>
            <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">R$</span>
                <input type="number" value={data.budget} onChange={e => setData({...data, budget: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-primary outline-none" placeholder="100.00" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Custo Produto (CMV)</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">R$</span>
                    <input type="number" value={data.cogs} onChange={e => setData({...data, cogs: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-primary outline-none" placeholder="45.00" />
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Frete Médio</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">R$</span>
                    <input type="number" value={data.shipping} onChange={e => setData({...data, shipping: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-primary outline-none" placeholder="25.00" />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Imposto (%)</label>
                <input type="number" value={data.tax} onChange={e => setData({...data, tax: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg px-3 py-3 text-white focus:border-primary outline-none" placeholder="6" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Gateway (%)</label>
                <input type="number" value={data.gateway} onChange={e => setData({...data, gateway: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg px-3 py-3 text-white focus:border-primary outline-none" placeholder="4.99" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">ROAS Alvo (Expectativa)</label>
            <input type="number" value={data.targetRoas} onChange={e => setData({...data, targetRoas: e.target.value})} className="w-full bg-surface border border-white/10 rounded-lg px-3 py-3 text-white focus:border-primary outline-none" placeholder="2.5" />
          </div>
      </div>

      {/* Override Result Display for ROAS */}
      {result && (
         <div className="fixed inset-0 lg:static lg:inset-auto z-50 lg:z-auto bg-black/80 lg:bg-transparent flex items-center justify-center p-4">
            <div className="w-full bg-[#0F0518] border border-white/10 rounded-2xl p-6 lg:mt-0">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Resultado da Simulação</h3>
                
                <div className="space-y-4">
                    <div className="bg-surface p-4 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Faturamento Estimado</div>
                        <div className="text-2xl font-bold text-white">R$ {result.revenue.toFixed(2)}</div>
                    </div>

                    <div className="flex gap-4">
                         <div className={`flex-1 p-4 rounded-xl border ${result.netProfit > 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Lucro Líquido</div>
                            <div className={`text-xl font-bold ${result.netProfit > 0 ? 'text-green-400' : 'text-red-400'}`}>R$ {result.netProfit.toFixed(2)}</div>
                        </div>
                         <div className="flex-1 p-4 rounded-xl bg-surface border border-white/5">
                            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Margem Líq.</div>
                            <div className="text-xl font-bold text-white">{result.margin.toFixed(1)}%</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">Meta CPA</span>
                            <span className="text-white font-bold">R$ {result.maxCPA.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-slate-400">ROAS Break-even</span>
                            <span className="text-white font-bold">{result.breakEvenRoas.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      )}
    </ToolLayout>
  );
};