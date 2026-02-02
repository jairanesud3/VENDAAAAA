'use server';

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client safely
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
 * Uses the requested 'gemini-flash-lite-latest' model.
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  const ai = getAiClient();
  
  if (!ai) {
    return "⚠️ ERRO CRÍTICO: API_KEY não encontrada. Configure no Vercel.";
  }

  try {
    // MODELO SOLICITADO PELO USUÁRIO
    const modelId = 'gemini-flash-lite-latest';
    
    const prompt = `
      Atue como um especialista em Copywriting e Marketing Digital de elite.
      
      DADOS DO PRODUTO/PEDIDO:
      - Produto/Tema: ${productName}
      - Preço/Detalhe: ${price}
      - Contexto Específico: ${context}
      
      TAREFA:
      Gere um conteúdo de altíssima qualidade, persuasivo e formatado para leitura rápida.
      
      DIRETRIZES DE ESTILO:
      - Use parágrafos curtos e impactantes.
      - Se for email, use um Assunto chamativo.
      - Se for anúncio, use emojis estratégicos e AIDA (Atenção, Interesse, Desejo, Ação).
      - Se for SEO, use hierarquia H1, H2.
      - Idioma: Português do Brasil.
      
      Retorne APENAS o conteúdo final.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    return response.text || "A IA não retornou resposta. Tente novamente.";
  } catch (error: any) {
    console.error("AI Text Generation Error:", error);
    return `Erro na IA (${error.message}). Verifique sua API Key e cotas.`;
  }
}

/**
 * GENERATE IMAGE (Real AI via Gemini Image Model)
 * Keeps 'gemini-2.5-flash-image' as Lite is text-optimized.
 */
export async function generateImageAction(prompt: string): Promise<string> {
  const ai = getAiClient();

  if (!ai) {
    console.error("API_KEY missing");
    return "https://via.placeholder.com/1024x1024.png?text=Configure+API_KEY";
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { text: `Professional product photography, 4k, studio lighting, commercial advertisement quality, ultra realistic, masterpiece. ${prompt}` }
            ]
        }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    
    throw new Error("No image data returned");
    
  } catch (error) {
    console.error("Image Generation Error:", error);
    // Fallback image in case of error (to keep UI pretty)
    return "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"; 
  }
}

/**
 * STRIPE SUBSCRIPTION MANAGER (Placeholder for flow)
 */
export async function manageSubscriptionAction(userId: string) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/subscription";
}