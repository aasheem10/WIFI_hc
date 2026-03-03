const stripe = require('../config/stripe');

const PLAN_MONTHS = {
  '1m': 1,
  '6m': 6,
  '1y': 12,
};

const PLAN_PRICE = {
  '1m': 999,
  '6m': 4999,
  '1y': 8999,
};

const createCheckoutSession = async ({ planType, userId }) => {
  if (!stripe) {
    return { provider: 'mock', id: `mock_${userId}_${planType}` };
  }

  const amount = PLAN_PRICE[planType];
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: { name: `Goal Tracker ${planType} subscription` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/billing/cancel`,
    metadata: { userId: String(userId), planType },
  });

  return session;
};

module.exports = { PLAN_MONTHS, createCheckoutSession };
