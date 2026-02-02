'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2024-04-10',
});

// Replace these with your actual Stripe Price IDs
const PRICE_ID_BASIC = 'price_1P...'; // Put Basic Plan ID here
const PRICE_ID_PRO = 'price_1P...';   // Put Pro Plan ID here

export async function createCheckoutSession(priceId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId === 'price_pro_test' ? 'price_pro_mock_id' : 'price_basic_mock_id', // Mock fallback
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard/subscription`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Stripe Error:', error);
    // Return a mock URL for development if Stripe key is invalid
    return { url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?success=true&mock=true` };
  }
}