import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function Cart() {
    const { cartCount } = useShoppingCart()

    
  return <h1> {cartCount} </h1>;
}