'use server';

import { generateText } from './gemini';
import { GoogleGenAI } from "@google/genai";

/**
 * GENERATE AD COPY
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  const prompt = `
    Atue como um especialista em Copywriting e Marketing Digital de elite.
    DADOS: Produto: ${productName}, Preço: ${price}, Contexto: ${context}.
    TAREFA: Gere conteúdo persuasivo, curto e formatado.
    ESTILO: AIDA, Gatilhos Mentais, Português do Brasil.
    Retorne APENAS o conteúdo.
  `;
  return await generateText(prompt);
}

/**
 * GENERATE LANDING PAGE STRUCTURE
 */
export async function generateLandingPageAction(productName: string, niche: string, offer: string): Promise<string> {
    const prompt = `
      ATUE COMO: Senior UX Writer e Conversion Specialist.
      TAREFA: Criar a copy estruturada de uma Landing Page de Alta Conversão para Dropshipping.
      
      PRODUTO: ${productName}
      NICHO: ${niche}
      OFERTA IRRESISTÍVEL: ${offer}
      
      RETORNE A ESTRUTURA NESTE FORMATO (Use Markdown):
      # Headline (H1): [Uma promessa forte e curiosa]
      ## Subheadline: [Complemento que retém a atenção]
      
      ### Benefícios Principais (Bullet Points):
      - [Benefício 1]
      - [Benefício 2]
      - [Benefício 3]
      
      ### Descrição Emocional (Storytelling curto):
      [Texto persuasivo de 2 parágrafos]
      
      ### Quebra de Objeções (FAQ):
      1. [Objeção] -> [Resposta]
      2. [Objeção] -> [Resposta]
      
      ### Chamada para Ação (CTA):
      [Texto do Botão]
    `;
    return await generateText(prompt);
}

/**
 * TRANSLATOR ACTION
 */
export async function translateTextAction(text: string, targetLanguage: string): Promise<string> {
    const prompt = `
      ATUE COMO: Tradutor Nativo e Especialista em Localização.
      TAREFA: Traduzir o texto abaixo para ${targetLanguage}.
      
      IMPORTANTE:
      - Não traduza "ao pé da letra". Adapte gírias, expressões e moeda para o contexto cultural do país destino.
      - Mantenha o tom persuasivo de vendas.
      
      TEXTO ORIGINAL:
      "${text}"
    `;
    return await generateText(prompt);
}

/**
 * SMART TOOL ACTION
 */
export async function generateSmartToolAction(toolId: string, inputData: string): Promise<string> {
    let systemPrompt = "";
    switch (toolId) {
        case 'product_namer': systemPrompt = `Crie 10 nomes de produtos criativos para: "${inputData}"`; break;
        case 'domain_gen': systemPrompt = `Sugira 10 domínios disponíveis para: "${inputData}"`; break;
        case 'whatsapp_recovery': systemPrompt = `3 scripts de recuperação WhatsApp para: "${inputData}"`; break;
        case 'review_reply': systemPrompt = `Responda esta review profissionalmente: "${inputData}"`; break;
        case 'policy_gen': systemPrompt = `Gere política de "${inputData}" para E-commerce.`; break;
        case 'faq_gen': systemPrompt = `5 FAQ para o produto: "${inputData}"`; break;
        case 'product_desc': systemPrompt = `Descrição completa de vendas para: "${inputData}"`; break;
        case 'competitor_analysis': systemPrompt = `Análise SWOT para nicho: "${inputData}"`; break;
        case 'hashtags': systemPrompt = `30 hashtags virais para: "${inputData}"`; break;
        case 'upsell': systemPrompt = `Sugira upsells para quem comprou: "${inputData}"`; break;
        default: systemPrompt = `Ajude com: ${inputData}`;
    }
    return await generateText(systemPrompt);
}

/**
 * CHAT SUPPORT AI
 */
export async function chatSupportAction(userMessage: string): Promise<string> {
    const prompt = `
      ATUE COMO: DropHacker AI, consultor de elite.
      Responda sobre e-commerce, ads e escala. Seja direto e motivador.
      Usuário: "${userMessage}"
    `;
    return await generateText(prompt);
}

/**
 * GENERATE IMAGE - HIGH QUALITY (Gemini 3 Pro)
 */
export async function generateImageAction(prompt: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "https://via.placeholder.com/1024x1024.png?text=API_KEY_MISSING";

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using the highest quality model available
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview', // UPGRADED MODEL
        contents: {
            parts: [
                { text: `Photorealistic product photography, 85mm lens, f/1.8, studio lighting, commercial quality, 8k resolution, detailed texture. ${prompt}` }
            ]
        },
        config: {
            imageConfig: {
                aspectRatio: "1:1",
                imageSize: "1K" 
            }
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
    // Fallback image if API fails
    return "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"; 
  }
}

/**
 * STRIPE SUBSCRIPTION MANAGER
 */
export async function manageSubscriptionAction(userId: string) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/subscription";
}