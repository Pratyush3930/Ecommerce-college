import { useAppContext } from "../context/AppContext";
import CartTable from "./CartTable";
import Checkout from "./Checkout";

const CartPage = () => {
  const { cart } = useAppContext();

  console.log("Cart data in set cart data", cart);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <CartTable cart={cart} />
        </div>
        <div className="min-w-[400px]">
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
