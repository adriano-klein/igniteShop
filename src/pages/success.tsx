import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface ProductProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: ProductProps) {
  return (
    <>
     <Head>
      <title> {product.name} | Ignite Shop </title>
      <meta name="robots" content="noindex" />
    </Head>
    
    <SuccessContainer>
      <h1>Compra efetuada com sucesso</h1>

      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={130}
          height={130}
          alt={product.name}
          />
      </ImageContainer>

      <p>
        Uhuuul <strong>{customerName}</strong>, sua camiseta{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href={"/"}>Voltar ao catálogo</Link>
    </SuccessContainer>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async({ query }) => {
  if(!query.session_id){
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items','line_items.data.price.product']
  });
  
  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
     customerName,
     product: {
      name: product.name,
      imageUrl: product.images[0]
     }
    }
  }
}