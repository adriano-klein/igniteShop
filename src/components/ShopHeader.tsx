import * as Dialog from "@radix-ui/react-dialog";
import { Bag, Minus, Plus, X, ShoppingBag } from "@phosphor-icons/react";
import { Header } from "../styles/pages/app";
import Image from "next/image";
import logoImg from '../assets/logo.svg';
import { useShoppingCart } from "use-shopping-cart";
import { CloseButton, EmptyBag, EmptyH4, FinishPurchaseButton, ImageContainer, ProductContainer, ProductFooter, ProductsContainer, QuantityInfo, StyledDialogContent, StyledDialogTitle } from "../styles/Components/ShopHeader";
import { useState } from "react";
import { stripe } from "../lib/stripe";
import Link from "next/link";

export function ShopHeader() {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false);
  const { cartCount, totalPrice, cartDetails, removeItem, decrementItem, incrementItem, clearCart } = useShoppingCart();
  
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
      const response = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cart,
        mode: "payment",
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cancel`,
        shipping_address_collection: {
          allowed_countries: ["BR"],
        },
        billing_address_collection: "auto",
        metadata: {
          products: JSON.stringify(cart),
        },
      });

      const checkoutUrl  = response.url;
      window.location.href = checkoutUrl;

      setIsCreatingCheckoutSession(true);
      clearCart();

    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Header>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
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

            {cartCount > 0 ? (
              <>
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

                            <span>
                              <Minus onClick={() => decrementItem(item.id)} />
                              <p> {item.quantity} </p>
                              <Plus onClick={() => incrementItem(item.id)} />
                            </span>
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
              </>
            ) : (
              <EmptyBag>
              <ShoppingBag size={48} />
              <EmptyH4>Sua sacola está vazia</EmptyH4>
              </EmptyBag>
            )}
          </StyledDialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </Header>
  );
}

