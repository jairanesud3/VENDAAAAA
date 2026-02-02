import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// 1. Verificação de Segurança
if (!apiKey) {
  console.error("⚠️ ERRO: API_KEY do Google não encontrada nas variáveis de ambiente.");
}

// 2. Inicialização do Cliente
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Gera texto usando o modelo Gemini Flash Lite (Ultra Rápido)
 * @param prompt O texto de entrada
 * @returns O texto gerado pela IA
 */
export async function generateText(prompt: string): Promise<string> {
  try {
    if (!apiKey) throw new Error("API Key não configurada.");

    // 3. Configuração do Modelo e Geração
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // 4. Extração do Texto
    const text = response.text;
    
    if (!text) {
        throw new Error("A IA não retornou nenhum texto.");
    }

    return text;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Retorna mensagem amigável para não quebrar o frontend
    return `Erro ao processar: ${error.message || "Tente novamente mais tarde."}`;
  }
}