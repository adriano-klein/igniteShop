import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import Image from 'next/image'

import { Theme } from "@radix-ui/themes";

import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app";
import { Bag } from "@phosphor-icons/react";
import Link from "next/link";
import { CartProvider, useShoppingCart } from "use-shopping-cart";


globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  const { cartCount } = useShoppingCart()
  return (
    <>
      <Theme style={{ background: "var(--gray-a2)" }}>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe={process.env.STRIPE_PUBLIC_KEY}
          successUrl="http://localhost:3000/success"
          cancelUrl="http://localhost:3000/cancel"
          currency="BRL"
          allowedCountries={["BR"]}
          shouldPersist={true}
        >
          <Container>
            <Header>
              <Image src={logoImg} alt="" />
              <Link href="/cart">
                <Bag size={32} weight="bold" />
                {/* se o cart for maior que 0 mostra o span */}
                {cartCount > 0 && <span>{cartCount}</span>}
              </Link>
            </Header>
            <Component {...pageProps} />
          </Container>
        </CartProvider>
      </Theme>
    </>
  );
}
