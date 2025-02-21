import * as Dialog from "@radix-ui/react-dialog";
import { Bag, X } from "@phosphor-icons/react";
import { Header } from "../styles/pages/app";
import Link from "next/link";
import Image from "next/image";
import logoImg from '../assets/logo.svg';
import { useShoppingCart } from "use-shopping-cart";
import { CloseButton, FinishPurchaseButton, ImageContainer, ProductContainer, ProductFooter, ProductsContainer, QuantityInfo, StyledDialogContent, StyledDialogTitle } from "../styles/Components/ShopHeader";
import { useState } from "react";
import { stripe } from "../lib/stripe";

export function ShopHeader() {
  const [IsCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { cartCount, totalPrice, cartDetails, removeItem } = useShoppingCart();
  async function handleBuyProduct() {
    
    const productList = await stripe.products.list({
      expand: ["data.default_price"],
    });

        const cart = Object.values(cartDetails).map(product => {
        const productData = productList.data.find(p => p.id === product.id);
        if (!productData) {
          throw new Error(`Product with id ${product.id} not found in productList`);
        }
        return {
          price: typeof productData.default_price === 'object' ? productData.default_price.id : '', // Verifico se está acessando o ID do preço correto
          quantity: product.quantity,
        };
      });
      
    try {
      //TODO: Implementar a lógica para criar a sessão de checkout com vários produtos
      const response = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart,
        mode: 'payment',
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        shipping_address_collection: {
          allowed_countries: ['BR'],
        },
        billing_address_collection: 'auto',
        metadata: {
          products: JSON.stringify(cart),
        },
      });

      const checkoutUrl  = response.url;
      window.location.href = checkoutUrl;

      setIsCreatingCheckoutSession(true);

    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Header>
      <Image src={logoImg} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Link href="#">
            <Bag size={32} weight="bold" />
            {/* se o cart for maior que 0 mostra o span */}
            <span>{cartCount}</span>
          </Link>
        </Dialog.Trigger>
        <Dialog.Portal>
          <StyledDialogContent>
            <CloseButton asChild>
              <X size={32} weight="bold" />
            </CloseButton>
            <StyledDialogTitle>Sacola de compras</StyledDialogTitle>

            <ProductsContainer>
              {Object.values(cartDetails).map((item, index) => {
                return (
                  <ProductContainer key={index}>
                    <ImageContainer>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </ImageContainer>
                    <ProductFooter>
                      <span>
                        <h2>{item.name}</h2>
                        <p>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.value)}
                        </p>
                      </span>
                      <button onClick={() => removeItem(item.id)}>
                        Remover
                      </button>
                    </ProductFooter>
                  </ProductContainer>
                );
              })}
            </ProductsContainer>
            <QuantityInfo>
              <span>
                <p>Quantidade</p>
                <p>{`${cartCount} itens`}</p>
              </span>
              <span>
                <p>Valor total</p>
                <p>
                  {" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalPrice)}{" "}
                </p>
              </span>
            </QuantityInfo>
            <FinishPurchaseButton onClick={handleBuyProduct}>
              Finalizar compra
            </FinishPurchaseButton>
          </StyledDialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </Header>
  );
}

