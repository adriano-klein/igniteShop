import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import Skeleton from "react-loading-skeleton";
import useQuery from "use-query";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [IsCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { addItem } = useShoppingCart();

  async function handleBuyProduct() {
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
      
      setIsCreatingCheckoutSession(true)
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }
  return (
    <>
      <Head>
        <title> {product.name} | Ignite Shop </title>
      </Head>
      <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span> {product.price} </span>
          <p>{product.description}</p>

          <button
            disabled={IsCreatingCheckoutSession}
            // onClick={handleBuyProduct}
            onClick={() =>
              addItem({
                name: product.name,
                id: product.id,
                price: parseFloat(
                  product.price.replace("R$", "").replace(",", ".")
                ),
                currency: "BRL",
                image: product.imageUrl,
                defaultPriceId: product.defaultPriceId,
              })
            }
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: "prod_RgQvCZyRvC6A2U"}},
    ],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // Obtém o ID do produto a partir dos parâmetros da URL
  const productId = params.id;

  // Recupera os dados do produto do Stripe usando o ID do produto
  const product = await stripe.products.retrieve(productId, {
    // Expande o preço padrão do produto para obter mais detalhes
    expand: ["default_price"],
  });

  // Converte o preço padrão do produto para o tipo Stripe.Price
  const price = product.default_price as Stripe.Price;

  // Retorna os dados do produto como propriedades para o componente
  return {
    props: {
      product: {
        // ID do produto
        id: product.id,
        // Nome do produto
        name: product.name,
        // URL da imagem do produto
        imageUrl: product.images[0],
        // Preço formatado do produto em BRL
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        // Descrição do produto
        description: product.description,
        defaultPriceId: price.id
      },
    },
    // Define o tempo de revalidação para 1 hora
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
