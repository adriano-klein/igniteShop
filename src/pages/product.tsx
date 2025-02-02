import { ImageContainer, ProductContainer, ProductDetails } from "../styles/pages/product";

export default function Product() {
  return(
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta 1</h1>
        <span>R$ 79,90</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam alias eligendi, reprehenderit et natus dolor dolorem nihil quas dolores error labore explicabo necessitatibus vero quam impedit nulla, dolore nesciunt libero!</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}