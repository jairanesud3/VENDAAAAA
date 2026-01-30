import { GoogleGenAI } from "@google/genai";

// Initialize the API client safely to avoid runtime crashes if process is undefined
// In browser environments like StackBlitz, direct process.env access can sometimes throw
const getApiKey = () => {
  try {
    // Check if process is defined globally before accessing env
    if (typeof process !== 'undefined' && process && process.env) {
      return process.env.API_KEY || '';
    }
    // Fallback for Vite/other bundlers if needed (optional)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY || '';
    }
  } catch (e) {
    // Ignore error if environment is strict
    console.warn("Could not access environment variables safely.");
  }
  return '';
};

const apiKey = getApiKey();
// Only initialize if we have a key, or handle it gracefully
// We wrap this so it doesn't crash the module load
let ai: GoogleGenAI | null = null;
if (apiKey) {
    try {
        ai = new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI", e);
    }
}

export async function generateAdCopy(productName: string, price: string, social: string) {
  if (!ai) {
    console.error("API Key not found or AI client not initialized");
    // Return a mock response so the UI doesn't break for the user if they don't have a key
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return `⚠️ A chave da API não foi detectada.\n\nMas aqui está um exemplo do que a IA geraria para o ${productName}:\n\n🔥 ATENÇÃO! O segredo para resolver seu problema chegou!\n\nConheça o ${productName}, a solução definitiva que você esperava. Por apenas ${price}, você transforma sua rotina.\n\n✅ Benefício 1: Resultado imediato\n✅ Benefício 2: Qualidade premium\n✅ Benefício 3: Garantia total\n\n👇 Clique em Saiba Mais e garanta o seu antes que acabe o estoque! 🚀`;
  }

  try {
    const modelId = 'gemini-flash-lite-latest';
    
    const prompt = `
      Atue como um Copywriter de Elite especialista em E-commerce e Dropshipping.
      
      Tarefa: Criar um anúncio de alta conversão para o produto abaixo.
      Plataforma: ${social.toUpperCase()}
      Produto: ${productName}
      Preço: ${price || 'Não informado'}
      
      Diretrizes:
      1. Use gatilhos mentais de Urgência e Escassez.
      2. Use emojis estrategicamente (mas não exagere).
      3. A estrutura deve ser: Headline Impactante (Gancho) -> Problema/Solução -> Benefícios -> CTA (Chamada para Ação).
      4. O tom deve ser empolgante e direto.
      
      Retorne APENAS o texto do anúncio.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao gerar copy:", error);
    // Return a fallback message instead of crashing
    return "Ocorreu um erro ao conectar com a IA. Por favor, verifique sua conexão ou tente novamente mais tarde.";
  }
}