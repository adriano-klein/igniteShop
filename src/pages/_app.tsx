import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import Image from 'next/image'

import { Theme } from "@radix-ui/themes";
import { Container, Header } from "../styles/pages/app";
import { CartProvider } from "use-shopping-cart";
import { ShopHeader } from "../components/ShopHeader";


globalStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
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
            <ShopHeader />
            <Component {...pageProps} />
          </Container>
        </CartProvider>
      </Theme>
  );
}
