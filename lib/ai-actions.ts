'use server';

import { generateText } from './gemini';
import { GoogleGenAI } from "@google/genai";

/**
 * GENERATE AD COPY
 */
export async function generateAdCopyAction(productName: string, price: string, context: string): Promise<string> {
  const prompt = `
    Atue como um Copywriter Sênior de resposta direta.
    
    PRODUTO: ${productName}
    PREÇO: ${price}
    CONTEXTO: ${context}
    
    OBJETIVO: Criar um texto altamente persuasivo e ORGANIZADO.
    
    ESTRUTURA DA RESPOSTA (Use Markdown):
    
    ### Gancho (Atenção)
    [Uma frase impactante que para o scroll]
    
    ### Corpo (Interesse e Desejo)
    - [Benefício chave 1]
    - [Benefício chave 2]
    - [Benefício chave 3]
    
    ### Oferta (Ação)
    [Chamada para ação clara com escassez]
    
    ### Hashtags
    [Lista de hashtags]
  `;
  return await generateText(prompt);
}

/**
 * GENERATE LANDING PAGE STRUCTURE
 */
export async function generateLandingPageAction(productName: string, niche: string, offer: string): Promise<string> {
    const prompt = `
      ATUE COMO: Senior UX Writer e Conversion Specialist.
      TAREFA: Criar a copy estruturada de uma Landing Page.
      
      PRODUTO: ${productName}
      NICHO: ${niche}
      OFERTA: ${offer}
      
      RETORNE NESTE FORMATO EXATO:
      
      ### Headline Principal
      [Promessa forte]
      
      ### Subheadline
      [Complemento explicativo]
      
      ### Benefícios Principais
      - [Benefício 1]
      - [Benefício 2]
      - [Benefício 3]
      
      ### Storytelling (Curto)
      [Parágrafo emocional]
      
      ### FAQ (Quebra de Objeções)
      1. [Pergunta] -> [Resposta]
      2. [Pergunta] -> [Resposta]
      
      ### CTA (Botão)
      [Texto do botão]
    `;
    return await generateText(prompt);
}

/**
 * TRANSLATOR ACTION
 */
export async function translateTextAction(text: string, targetLanguage: string): Promise<string> {
    const prompt = `
      ATUE COMO: Tradutor Nativo e Copywriter.
      TAREFA: Traduzir e adaptar culturalmente para ${targetLanguage}.
      TEXTO: "${text}"
      
      Mantenha a formatação original (bullet points, parágrafos).
    `;
    return await generateText(prompt);
}

/**
 * SMART TOOL ACTION (EXPANDED FOR 20 TOOLS)
 */
export async function generateSmartToolAction(toolId: string, inputData: string): Promise<string> {
    let systemPrompt = "";
    
    // Base Instruction for all tools
    const baseInst = "Seja direto, profissional e use formatação Markdown (negrito em palavras chave, listas).";

    switch (toolId) {
        // --- 10 ORIGINAL ---
        case 'product_namer': systemPrompt = `${baseInst} Crie 10 nomes de produtos criativos e curtos para: "${inputData}". Explique o porquê de cada um.`; break;
        case 'domain_gen': systemPrompt = `${baseInst} Sugira 10 domínios .com e .com.br disponíveis e brandable para: "${inputData}".`; break;
        case 'whatsapp_recovery': systemPrompt = `${baseInst} Crie uma sequência de 3 mensagens de WhatsApp para recuperar: "${inputData}" (Carrinho ou Boleto).`; break;
        case 'review_reply': systemPrompt = `${baseInst} Escreva uma resposta profissional e empática para esta avaliação de cliente: "${inputData}".`; break;
        case 'policy_gen': systemPrompt = `${baseInst} Gere um texto padrão de política de "${inputData}" para E-commerce em conformidade com o CDC.`; break;
        case 'faq_gen': systemPrompt = `${baseInst} Crie as 5 perguntas e respostas mais frequentes (FAQ) para vender: "${inputData}".`; break;
        case 'product_desc': systemPrompt = `${baseInst} Escreva uma descrição de produto usando a técnica de Storytelling para: "${inputData}".`; break;
        case 'competitor_analysis': systemPrompt = `${baseInst} Faça uma análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças) fictícia para o nicho: "${inputData}".`; break;
        case 'hashtags': systemPrompt = `${baseInst} Gere 3 blocos de hashtags (Pequenas, Médias, Grandes) para: "${inputData}".`; break;
        case 'upsell': systemPrompt = `${baseInst} Sugira 3 produtos complementares para oferecer como Upsell/Order Bump para quem compra: "${inputData}".`; break;
        
        // --- 10 NEW TOOLS ---
        case 'video_script': systemPrompt = `${baseInst} Crie um roteiro de vídeo curto (Reels/TikTok) de 15 segundos para vender: "${inputData}". Inclua sugestão visual e de áudio.`; break;
        case 'insta_bio': systemPrompt = `${baseInst} Crie 3 opções de Bio para Instagram matadoras para o nicho/loja: "${inputData}". Inclua emojis.`; break;
        case 'email_sequence': systemPrompt = `${baseInst} Crie os assuntos (Subjects) e o corpo de 3 emails de aquecimento para: "${inputData}".`; break;
        case 'headline_seo': systemPrompt = `${baseInst} Gere 10 variações de Títulos (Headlines) focadas em SEO e Cliques para: "${inputData}".`; break;
        case 'influencer_brief': systemPrompt = `${baseInst} Crie um Briefing curto para enviar para um influenciador divulgar: "${inputData}".`; break;
        case 'objection_killer': systemPrompt = `${baseInst} Liste as 5 maiores objeções de compra para "${inputData}" e como rebatê-las em uma frase.`; break;
        case 'benefit_stack': systemPrompt = `${baseInst} Transforme as características de "${inputData}" em uma lista de 10 Benefícios emocionais.`; break;
        case 'cta_generator': systemPrompt = `${baseInst} Crie 10 Chamadas para Ação (CTAs) agressivas e diferentes para vender: "${inputData}".`; break;
        case 'niche_finder': systemPrompt = `${baseInst} Com base no interesse "${inputData}", sugira 3 sub-nichos inexplorados com alto potencial de lucro.`; break;
        case 'value_prop': systemPrompt = `${baseInst} Defina a Proposta Única de Valor (PUV) em uma frase para: "${inputData}".`; break;

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
      Responda sobre e-commerce, ads e escala.
      Usuário: "${userMessage}"
    `;
    return await generateText(prompt);
}

/**
 * GENERATE IMAGE - HIGH QUALITY
 */
export async function generateImageAction(prompt: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "https://via.placeholder.com/1024x1024.png?text=API_KEY_MISSING";

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // PROMPT ENGINEERING TO FORCE HIGH QUALITY
    const enhancedPrompt = `
      Professional commercial product photography of ${prompt}.
      Style: 8k resolution, highly detailed, photorealistic, cinematic lighting, sharp focus, 85mm lens, f/1.8, bokeh background, unreal engine 5 render style, octane render, masterpiece.
      Negative prompt: ugly, blurry, low quality, cartoon, drawing, text, watermark, bad anatomy, distorted.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
            parts: [
                { text: enhancedPrompt }
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
    return "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"; 
  }
}

export async function manageSubscriptionAction(userId: string) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/subscription";
}