import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";

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
  function handleBuyProduct() {
    console.log(product.defaultPriceId)
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span> {product.price} </span>
        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
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

// Define a função getStaticProps que é usada para buscar dados em tempo de build
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
