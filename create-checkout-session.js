// Vercel serverless function: creates a Stripe Checkout Session (TEST MODE)
// Docs: https://stripe.com/docs/checkout/quickstart

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In a real store, product/price would come from your database.
    // Here we hardcode a demo product for simplicity.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Demo Product - Freshly Roasted Coffee (250g)',
            },
            unit_amount: 1200, // $12.00 in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/index.html`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
