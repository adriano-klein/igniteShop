import { Item } from "@radix-ui/themes/dist/cjs/components/checkbox-group.primitive";
import { useShoppingCart } from "use-shopping-cart";

export default function Cart() {
  const { cartDetails } = useShoppingCart();

  return (
    <div>
      <h1>Cart</h1>
      {Object.values(cartDetails).map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.value}</p>
            <button>Remove</button>
          </div>
      ))}
    </div>
  );
}