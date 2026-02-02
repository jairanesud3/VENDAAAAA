'use server';

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client safely
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const getAiClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY is missing in environment variables.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

/**
 * GENERATE AD COPY (Real AI)
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  const ai = getAiClient();
  
  if (!ai) {
    return "⚠️ ERRO DE CONFIGURAÇÃO: A API Key do Google Gemini não foi configurada no Vercel (Settings > Environment Variables > API_KEY).";
  }

  try {
    // Usando gemini-3-flash-preview conforme recomendado para tarefas de texto
    const modelId = 'gemini-3-flash-preview';
    
    const prompt = `
      Atue como um especialista em Copywriting de Resposta Direta e SEO para E-commerce.
      
      Produto: ${productName}
      Preço: ${price}
      Contexto/Plataforma: ${context}
      
      TAREFA:
      Crie um texto de alta conversão, persuasivo e formatado.
      
      DIRETRIZES:
      - Se for Marketplace (Amazon, ML, Shopee), foque em Título SEO, Ficha Técnica e Benefícios em tópicos.
      - Se for Redes Sociais (Instagram, TikTok, FB), foque em AIDA (Atenção, Interesse, Desejo, Ação), use emojis pertinentes e Hashtags.
      - Use gatilhos mentais de escassez e urgência se fizer sentido.
      - O texto deve ser em Português do Brasil.
      
      Retorne APENAS o texto pronto para copiar e colar.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    return response.text || "A IA processou o pedido mas não retornou texto. Tente novamente.";
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return `Erro na geração: ${error.message || 'Erro desconhecido'}. Verifique se a API Key é válida e tem saldo/permissão.`;
  }
}

/**
 * GENERATE IMAGE (Real AI via Gemini Image Model)
 */
export async function generateImageAction(prompt: string): Promise<string> {
  const ai = getAiClient();

  if (!ai) {
    // Retorna placeholder visual para não quebrar a UI se a chave faltar
    console.error("API_KEY missing");
    return "https://via.placeholder.com/1024x1024.png?text=Configure+API_KEY+no+Vercel";
  }

  try {
    // Generate images using gemini-2.5-flash-image (Standard for general image gen)
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { text: `Professional product photography, 4k, studio lighting, commercial advertisement quality, ultra realistic. ${prompt}` }
            ]
        }
    });

    // Check for inline data (base64) in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    
    // Fallback URL if generation fails or returns no image data
    console.warn("No image data in response");
    return "https://images.unsplash.com/photo-1602143407151-11115cd4e69b?q=80&w=1000&auto=format&fit=crop";
    
  } catch (error) {
    console.error("Image Generation Error:", error);
    return "https://via.placeholder.com/1024x1024.png?text=Erro+na+Geracao+de+Imagem"; 
  }
}

/**
 * STRIPE SUBSCRIPTION MANAGER (Placeholder for flow)
 */
export async function manageSubscriptionAction(userId: string) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/subscription";
}