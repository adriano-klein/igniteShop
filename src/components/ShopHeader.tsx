import * as Dialog from "@radix-ui/react-dialog";

import { Bag, X } from "@phosphor-icons/react";
import { Header } from "../styles/pages/app";
import Link from "next/link";
import Image from "next/image";

import logoImg from '../assets/logo.svg'
import { useShoppingCart } from "use-shopping-cart";
import { CloseButton, FinishPurchaseButton, ImageContainer, ProductContainer, ProductFooter, ProductsContainer, QuantityInfo, StyledDialogContent, StyledDialogTitle } from "../styles/Components/ShopHeader";



export function ShopHeader(){
  const { cartCount, totalPrice, cartDetails, removeItem } = useShoppingCart()
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
                          )
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
            <FinishPurchaseButton>Finalizar compra</FinishPurchaseButton>
          </StyledDialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </Header>
  );
}