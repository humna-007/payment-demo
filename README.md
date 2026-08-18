# Payment Demo — Stripe Checkout (Test Mode) on Vercel

A minimal working example: a product page with a "Buy Now" button that
creates a Stripe Checkout session and redirects the buyer to Stripe's
hosted payment page. Runs entirely in Stripe's TEST mode — no real
money moves.

## What's inside
- `public/index.html` — product page with the Buy Now button
- `public/success.html` — page shown after a completed payment
- `api/create-checkout-session.js` — serverless function that talks to Stripe
- `vercel.json` — tells Vercel how to route static files vs the API

## Setup (10-15 minutes)

1. **Create a free Stripe account** at https://dashboard.stripe.com/register
   (no business verification needed to use test mode)

2. **Get your test secret key**
   - In the Stripe Dashboard, make sure you're in **Test mode** (toggle top-right)
   - Go to Developers → API keys
   - Copy the key that starts with `sk_test_...`

3. **Push this folder to a GitHub repo** (new, empty repo is fine)

4. **Deploy to Vercel**
   - Go to https://vercel.com and sign up/log in with GitHub
   - Click "Add New Project" → import this repo
   - Before deploying, add an Environment Variable:
     - Name: `STRIPE_SECRET_KEY`
     - Value: your `sk_test_...` key from step 2
   - Click Deploy

5. **Test it**
   - Open your live Vercel URL
   - Click "Buy Now"
   - Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP
   - You should land on the success page

## Notes for real client work
- This uses Stripe **Checkout** (Stripe's hosted payment page) — the fastest,
  most secure way to accept payments since Stripe handles all card data.
  This is what most clients actually want.
- For a real store you'd fetch the product price from your own database
  instead of hardcoding it, and use a Stripe webhook to reliably mark the
  order as paid in your database (the redirect to success.html is good
  enough for a demo, but not 100% reliable for production).
- Going live later just means switching to the `sk_live_...` key once the
  Stripe account is fully verified — no code changes needed.
