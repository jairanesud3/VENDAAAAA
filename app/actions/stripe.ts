'use server';

import Stripe from 'stripe';

// Initialize Stripe with the Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10', // Use latest API version compatible
});

const PRICE_ID_BASIC = process.env.STRIPE_PRICE_ID_BASIC;
const PRICE_ID_PRO = process.env.STRIPE_PRICE_ID_PRO;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function createCheckoutSession(priceType: string) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe Secret Key is missing");
    }

    const priceId = priceType === 'price_pro_test' ? PRICE_ID_PRO : PRICE_ID_BASIC;

    if (!priceId) {
        throw new Error("Price ID not found in environment variables");
    }

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
      // automatic_tax: { enabled: true }, // Optional: Enable if configured in Stripe Dashboard
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    // Return null URL so frontend can handle error
    return { url: null, error: error.message };
  }
}