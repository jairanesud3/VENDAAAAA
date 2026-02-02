'use server';

import { generateText } from './gemini';
import { GoogleGenAI } from "@google/genai";

/**
 * GENERATE AD COPY (Via lib/gemini.ts)
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  
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

  return await generateText(prompt);
}

/**
 * GENERATE IMAGE (Direct Client Usage for Image Model)
 * Note: Keeps using gemini-2.5-flash-image for visuals as Flash Lite is text-optimized.
 */
export async function generateImageAction(prompt: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "https://via.placeholder.com/1024x1024.png?text=API_KEY_MISSING";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', // Modelo específico para imagem
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
    return "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"; 
  }
}

/**
 * STRIPE SUBSCRIPTION MANAGER (Placeholder for flow)
 */
export async function manageSubscriptionAction(userId: string) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/subscription";
}