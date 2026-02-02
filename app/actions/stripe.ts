'use server';

import Stripe from 'stripe';

// 1. Validação de Segurança das Chaves
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("⚠️ FATAL: Faltou a chave STRIPE_SECRET_KEY no arquivo .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function createCheckoutSession(planType: string) {
  try {
    // 2. Seleção Dinâmica do Preço
    let priceId = '';

    if (planType === 'pro' || planType === 'price_pro_test') {
       priceId = process.env.STRIPE_PRICE_ID_PRO || '';
       if (!priceId) console.error("⚠️ Faltou a chave STRIPE_PRICE_ID_PRO");
    } else {
       priceId = process.env.STRIPE_PRICE_ID_BASIC || '';
       if (!priceId) console.error("⚠️ Faltou a chave STRIPE_PRICE_ID_BASIC");
    }

    if (!priceId) {
        throw new Error("ID do Preço não configurado nas variáveis de ambiente.");
    }

    // 3. Criação da Sessão
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${BASE_URL}/dashboard?success=true`,
      cancel_url: `${BASE_URL}/dashboard/subscription`,
      // automatic_tax: { enabled: true }, // Ative se tiver configurado no Stripe
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return { url: null, error: error.message };
  }
}