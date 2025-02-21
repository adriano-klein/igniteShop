import Image from "next/image"
import Head from "next/head"
import { HandbagContainer, HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'
import Link from "next/link"
import { Handbag } from "@phosphor-icons/react";

import 'keen-slider/keen-slider.min.css'
import {stripe} from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
interface ProductProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    currency: string;
  }[];
}
export default function Home({ products }: ProductProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <HandbagContainer>
                  <Handbag size={32} weight="bold"/>
                </HandbagContainer>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeContainer>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      sku: product.metadata,
      price: new Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };

};