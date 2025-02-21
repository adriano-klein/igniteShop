import {  ProductsContainer, SuccessContainer } from "../styles/pages/success";
import Image from "next/image";
import camiseta from '../assets/camisetas/1.png'


export default function Success(){
  return (
    <SuccessContainer>
      <ProductsContainer>
        <section>
          <Image src={camiseta} width={130} height={130} alt="camiseta1  " />
        </section>

        <section>
          <Image src={camiseta} width={130} height={130} alt="camiseta1  " />
        </section>

        <section>
          <Image src={camiseta} width={130} height={130} alt="camiseta1  " />
        </section>
      </ProductsContainer>
      <div>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuuul <strong>Nome do cliente</strong>, sua camiseta{" "}
          <strong>Nome do produto</strong> já está a caminho da sua casa.
        </p>
      </div>

      <span>Voltar ao catálogo</span>
    </SuccessContainer>
  );
}