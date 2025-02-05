import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

// Verifica se o método da requisição não é POST
if (req.method !== 'POST') {
  // Retorna um status 405 (Method Not Allowed) e uma mensagem de erro
  return res.status(405).json({ error: 'Method not allowed' });
}

// Verifica se o priceId não está presente no corpo da requisição
if (!priceId) {
  // Retorna um status 400 (Bad Request) e uma mensagem de erro
  return res.status(400).json({ error: 'PriceId is required' });
}

  const success_url = `${process.env.NEXT_PUBLIC_URL}/success`
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/`
  
    // Cria uma sessão de checkout no Stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    // URL para redirecionar o usuário em caso de sucesso no pagamento
    success_url: success_url,
    // URL para redirecionar o usuário em caso de cancelamento do pagamento
    cancel_url: cancel_url,
    // Define o modo de pagamento como 'payment'
    mode: 'payment',
    // Define os itens da linha de pagamento
    line_items: [
      {
        // ID do preço do produto
        price: priceId,
        // Quantidade do produto
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