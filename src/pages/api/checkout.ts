import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

// Verifica se o método da requisição não é POST e se não for retorna um erro 405 (Method Not Allowed)
if (req.method !== 'POST') {
  // Retorna um status 405 (Method Not Allowed) e uma mensagem de erro
  return res.status(405).json({ error: 'Method not allowed' });
}

// Verifica se o priceId não está presente no corpo da requisição
if (!priceId) {
  // Retorna um status 400 (Bad Request) e uma mensagem de erro
  return res.status(400).json({ error: 'PriceId is required' });
}

  const success_url = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/`
  
    // Cria uma sessão de checkout no Stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: 'payment',
    
    // Define os itens da linha de pagamento
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });
  
  // Retorna uma resposta com status 201 (Created) e a URL da sessão de checkout
  return res.status(201).json({
    // URL da sessão de checkout criada
    checkoutUrl: checkoutSession.url,
  });
}