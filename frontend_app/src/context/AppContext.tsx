import React, { createContext, useState, ReactNode } from "react";
import { CartProduct, CreateCartProduct, Product } from "../types"; // Ensure correct import path for `Product`
import axios from "axios";

interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  cartFilled: boolean;
  setCartFilled: React.Dispatch<React.SetStateAction<boolean>>;
  updateCart: (updatedCartProducts: CreateCartProduct[]) => void;
  handleCartChange: (
    productId: number,
    price: number,
    quantity: number
  ) => void;
  productQuantity: number;
  setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleCartItemDelete: (productId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartFilled, setCartFilled] = useState<boolean>(false);
  const [productQuantity, setProductQuantity] = useState<number>(0);

  // Handle adding an item to the cart
  const updateCart = async (updatedCartProducts: CreateCartProduct[]) => {
    try {
      const updateCartData = updatedCartProducts.map((item) => ({
        User_id: item.user_id,
        ProductId: item.product_id,
        Quantity: item.quantity,
        Total_price: item.total_price,
      }));
      const res = await axios.post(
        `http://localhost:5140/api/cart`,
        updateCartData
      );
      console.log("cart fetch response", res.data.cart);
      setCart(res.data.cart);
      if (cart.length !== 0) setCartFilled(true);
    } catch (error) {
      console.log("Could not update cart data: ", error);
    }
  };

  const handleCartChange = (
    productId: number,
    price: number,
    quantity: number
  ) => {
    const updatedCart = cart.map((item: CreateCartProduct) => {
      if (item.product_id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    if (
      !updatedCart.some(
        (item: CreateCartProduct) => item.product_id === productId
      )
    ) {
      // Add new product to the cart if it's not already there
      updatedCart.push({
        product_id: productId,
        quantity: quantity,
        user_id: 1,
        total_price: quantity * price,
      });
      setCartFilled(true);
    }

    updateCart(updatedCart);
  };

  const handleCartItemDelete = async (productId: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:5140/api/cart/${productId}`
      );
      console.log("Delete response", res.data);
      setCart(res.data.cart);
      if (res.data.cart < 1) setCartFilled(false);
    } catch (error) {
      console.log("Error when deleting the cart item", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        products,
        setProducts,
        cart,
        setCart,
        cartFilled,
        setCartFilled,
        updateCart,
        handleCartChange,
        productQuantity,
        setProductQuantity,
        handleCartItemDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the appcontext
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
