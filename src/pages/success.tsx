import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success(){
  return (
    <SuccessContainer>
      <h1>Compra efetuada com sucesso</h1>

      <ImageContainer>
        
      </ImageContainer>

      <p>
        Uhuuul <strong>Adriano Klein</strong>, sua <strong>camiseta</strong> já está a caminho da sua casa.
      </p>

      <Link href={"/"}> 
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  );
}