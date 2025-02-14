import { useAppContext } from "../context/AppContext";
import CartTable from "./CartTable";
import Checkout from "./Checkout";

const CartPage = () => {
  const { cart } = useAppContext();

  return (
    <div className="p-4">
      {cart.length > 0 ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <CartTable cart={cart} />
          </div>
          <div className="min-w-[400px]">
            <Checkout />
          </div>
        </div>
      ) : (
        <div className="text-3xl font-semibold text-red-600 text-center mt-16">
          Your cart is empty!
        </div>
      )}
    </div>
  );
};

export default CartPage;
