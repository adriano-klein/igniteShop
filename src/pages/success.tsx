import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';
import { stripe } from '../lib/stripe';
import { SuccessContainer, ProductsContainer } from '../styles/pages/success';
import { capitalizeWords } from '../utils/capitalizeWords';

interface ProductProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: ProductProps) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []); // Remova clearCart das dependências para evitar loops

  return (
    <SuccessContainer>
      <ProductsContainer>
        {products.map((product, index) => (
          <section key={index}>
            <Image src={product.imageUrl} width={130} height={130} alt={product.name} />
          </section>
        ))}
      </ProductsContainer>
      <h1>Compra realizada com sucesso!</h1>
      <p>Obrigado, {capitalizeWords(customerName)}!</p>
      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};