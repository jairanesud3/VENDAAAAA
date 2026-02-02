// MOCKED SERVER ACTIONS (Secure Implementation)

const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY || 'mock-key';
const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY || 'mock-key';

// --- SECURITY MIDDLEWARE SIMULATION ---
async function checkSubscription(userId: string) {
    // In production: await supabase.from('subscriptions').select('status').eq('user_id', userId)...
    console.log(`[AUTH] Checking subscription for ${userId}...`);
    const isSubscribed = true; // Mock true
    
    if (!isSubscribed) {
        throw new Error("SUBSCRIPTION_REQUIRED: Please upgrade to access this feature.");
    }
    return true;
}

/**
 * GENERATE AD COPY (GEMINI FLASH LITE)
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  await checkSubscription('current_user_id'); // Security Check
  
  console.log(`[AI-ACTION] Generating copy for ${productName} [${context}] with Gemini Flash Lite...`);

  // Mock Latency
  await new Promise(resolve => setTimeout(resolve, 2500));

  // --- MARKETPLACE LOGIC ---
  if (context.startsWith('MARKETPLACE')) {
      const platform = context.split('_')[1] || 'GENERIC';
      
      return `📢 **TÍTULO SEO (Alta Conversão):**
${productName} Original - Pronta Entrega Com Nota Fiscal ${price ? `| Promoção R$ ${price}` : ''}

⭐ **FICHA TÉCNICA:**
- **Produto:** ${productName}
- **Condição:** Novo / Lacrado
- **Envio:** Imediato (Full)
- **Garantia:** 90 Dias

📝 **DESCRIÇÃO PERSUASIVA:**

**CHEGOU A SOLUÇÃO QUE VOCÊ PROCURAVA!**

Você não precisa mais se preocupar com qualidade duvidosa. O **${productName}** foi desenvolvido para quem exige excelência.

✅ **PRINCIPAIS BENEFÍCIOS:**
1. **Durabilidade Extrema:** Feito com materiais de primeira linha.
2. **Design Premium:** Combina com qualquer ambiente ou estilo.
3. **Fácil de Usar:** Não requer instalação complexa.

💡 **POR QUE COMPRAR CONOSCO?**
Somos MercadoLíder Platinum. Temos 100% de qualificações positivas e enviamos seu pedido em menos de 24 horas.

📦 **O QUE VEM NA CAIXA:**
- 01x ${productName}
- Manual de Instruções

🚀 **ESTOQUE LIMITADO:**
Aproveite o preço promocional de lançamento. Clique em **"Comprar Agora"** e garanta o seu!

🔍 **TAGS (Busca):**
${productName.toLowerCase()}, original, barato, promoção, oferta, lançamento, qualidade, ${platform.toLowerCase()}`;
  }

  // --- EMAIL LOGIC ---
  if (context.includes('Email')) {
      return `Assunto: ⏳ Última chamada para o ${productName} (Estoque Crítico)

Olá!

Percebi que você ainda não garantiu o seu ${productName}. 

Eu entendo, com tanta coisa acontecendo, às vezes deixamos as melhores oportunidades passarem.

Mas preciso ser honesto: nosso lote atual está 87% vendido.

Se você busca [Benefício Principal], essa é a ferramenta definitiva. Não deixe para depois o que pode mudar seus resultados hoje.

>> CLIQUE AQUI PARA FINALIZAR COM 5% OFF

Te espero lá.`;
  }

  // --- SOCIAL MEDIA LOGIC (Default) ---
  return `🛑 **PARE TUDO O QUE ESTÁ FAZENDO!**

Você sabia que 90% das pessoas sofrem com [Problema que o produto resolve]?

Apresentamos o novo **${productName}** - A solução que virou febre nos EUA e acaba de chegar ao Brasil. 🇺🇸 -> 🇧🇷

✅ **Benefício Chave 1:** Resultado em minutos.
✅ **Benefício Chave 2:** Tecnologia exclusiva.
✅ **Preço Imbatível:** Apenas ${price || 'R$ 97,00'} (Somente hoje).

Quem comprou, não vive sem:
_"Mudou minha vida em 3 dias!"_ - Cliente Verificada.

👇 Clique em **"Saiba Mais"** e garanta o seu com Frete Grátis antes que acabe!

#${productName.replace(/\s/g, '')} #novidade #promoção #imperdivel #tendencia`;
}

/**
 * GENERATE IMAGE (LEONARDO.AI PHOENIX)
 */
export async function generateImageAction(prompt: string): Promise<string> {
  await checkSubscription('current_user_id'); // Security Check

  console.log(`[AI-ACTION] Generating image for prompt: "${prompt}" with Leonardo.Ai Phoenix...`);
  
  // 1. POST Generation
  // 2. GET Polling until status === 'COMPLETE'
  await new Promise(resolve => setTimeout(resolve, 4500)); // Simulate processing time

  const mockImages = [
    "https://images.unsplash.com/photo-1549488352-84b675340179?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281e960?q=80&w=1000&auto=format&fit=crop"
  ];

  return mockImages[Math.floor(Math.random() * mockImages.length)];
}

/**
 * STRIPE SUBSCRIPTION MANAGER
 */
export async function manageSubscriptionAction(userId: string) {
    console.log(`[STRIPE] Creating Billing Portal session for ${userId}`);
    
    // MOCK LOGIC: 
    // In production, query the DB to check if user has active stripe_customer_id
    const isPro = true; // TOGGLE THIS TO TEST LOGIC

    if (!isPro) {
        // If FREE user -> Return URL to trigger "Open Pricing Modal" logic on frontend or direct checkout
        return "internal://pricing"; 
    }

    // If PRO user -> Return Stripe Portal URL
    // In production: await stripe.billingPortal.sessions.create(...)
    return "https://billing.stripe.com/p/login/mock_portal";
}