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
 * SMART TOOL ACTION (Handles 10+ different logic types)
 */
export async function generateSmartToolAction(toolId: string, inputData: string): Promise<string> {
    let systemPrompt = "";

    switch (toolId) {
        case 'product_namer':
            systemPrompt = `ATUE COMO: Especialista em Branding.
            TAREFA: Crie 10 nomes de produtos criativos, curtos e memoráveis para o seguinte item/nicho.
            ENTRADA: "${inputData}"
            SAÍDA: Lista numerada com o nome e uma breve explicação do porquê funciona.`;
            break;
        case 'domain_gen':
            systemPrompt = `ATUE COMO: Especialista em Domínios e SEO.
            TAREFA: Sugira 10 nomes de domínio disponíveis (.com.br ou .com) para a loja. Devem ser curtos e fáceis de digitar.
            ENTRADA: "${inputData}"
            SAÍDA: Lista de domínios.`;
            break;
        case 'whatsapp_recovery':
            systemPrompt = `ATUE COMO: Especialista em Conversão via WhatsApp.
            TAREFA: Escreva 3 scripts de recuperação (1. Abordagem Amigável, 2. Oferta de Desconto, 3. Escassez/Urgência).
            CONTEXTO: O cliente abandonou o carrinho ou gerou boleto do produto: "${inputData}".
            ESTILO: Humano, casual (parecendo mensagem de amigo), curto, usar emojis.`;
            break;
        case 'review_reply':
            systemPrompt = `ATUE COMO: Gestão de Crise e Customer Success.
            TAREFA: Escreva uma resposta profissional e empática para esta avaliação de cliente.
            AVALIAÇÃO DO CLIENTE: "${inputData}"
            OBJETIVO: Resolver o problema, mostrar que se importa e reverter a má impressão (ou agradecer se for boa).`;
            break;
        case 'policy_gen':
            systemPrompt = `ATUE COMO: Jurídico E-commerce.
            TAREFA: Gere um texto padrão de "${inputData}" (ex: Privacidade, Trocas, Envio) para uma loja de Dropshipping no Brasil.
            ESTILO: Formal, seguro, seguindo o Código de Defesa do Consumidor.`;
            break;
        case 'faq_gen':
            systemPrompt = `ATUE COMO: Gerente de Loja.
            TAREFA: Crie 5 Perguntas e Respostas Frequentes (FAQ) para quebrar objeções de compra deste produto.
            PRODUTO: "${inputData}"
            FOCO: Prazo de entrega, segurança, garantia, como usar.`;
            break;
        case 'product_desc':
            systemPrompt = `ATUE COMO: Copywriter de Conversão.
            TAREFA: Escreva uma descrição de produto completa para página de vendas (Shopify/Yampi).
            ESTRUTURA: Headline Impactante -> Problema -> Solução (O Produto) -> Benefícios (Bullet points) -> Garantia.
            PRODUTO: "${inputData}"`;
            break;
        case 'competitor_analysis':
            systemPrompt = `ATUE COMO: Espião de Mercado.
            TAREFA: Simule uma análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças) baseada no nicho ou produto fornecido.
            NICHO/PRODUTO: "${inputData}"
            SAÍDA: Análise estratégica do que os concorrentes geralmente fazem errado e como superar.`;
            break;
        case 'hashtags':
            systemPrompt = `ATUE COMO: Social Media Manager.
            TAREFA: Gere 30 hashtags virais para TikTok e Instagram, misturando tags de nicho (pequenas) e tags globais (grandes).
            TEMA: "${inputData}"`;
            break;
        case 'upsell':
            systemPrompt = `ATUE COMO: Estrategista de Vendas.
            TAREFA: Sugira 3 produtos complementares para fazer Upsell ou Order Bump para quem comprou o item abaixo. Explique a lógica de venda.
            ITEM COMPRADO: "${inputData}"`;
            break;
        default:
            systemPrompt = `Ajude com: ${inputData}`;
    }

    const fullPrompt = `${systemPrompt}\n\nResponda em Português do Brasil.`;
    return await generateText(fullPrompt);
}

/**
 * CHAT SUPPORT AI (Specialized Persona)
 */
export async function chatSupportAction(userMessage: string): Promise<string> {
    const prompt = `
      ATUE COMO: DropHacker AI, a inteligência artificial mais avançada do mundo focada EXCLUSIVAMENTE em Dropshipping, E-commerce e Marketing Digital.
  
      SUA PERSONALIDADE:
      - Você é um consultor de elite (nível 7 dígitos de faturamento).
      - Você é direto, técnico mas acessível, e focado em ROI (Retorno sobre Investimento).
      - Você NÃO é um suporte técnico genérico. Você é um estrategista de vendas.
      
      BASE DE CONHECIMENTO OBRIGATÓRIA:
      - Facebook Ads (CBO, ABO, Teste de Criativos).
      - TikTok Ads e Organic Viral.
      - Copywriting (Frameworks AIDA, PAS, SO).
      - Ofertas Irresistíveis e VSLs.
      - Mineração de Produtos Vencedores.
      - Recuperação de Carrinho e LTV.
  
      REGRAS DE RESPOSTA:
      1. Responda APENAS sobre e-commerce/vendas. Se o usuário falar de outra coisa, traga gentilmente de volta para negócios.
      2. Seja conciso. Respostas de chat devem ser curtas e impactantes (máximo 3-4 frases, salvo se for uma explicação técnica necessária).
      3. Jamais diga "Eu sou uma IA do Google". Você é o DropHacker AI.
      4. Dê dicas práticas que podem ser aplicadas hoje.
  
      USUÁRIO DISSE: "${userMessage}"
      
      RESPOSTA (em Português do Brasil, tom profissional e motivador):
    `;
  
    return await generateText(prompt);
  }

/**
 * GENERATE IMAGE (Direct Client Usage for Image Model)
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