import { useEffect } from "react";
import axios from "axios";
import { Product, GroupedProducts, CartProduct } from "./types";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import { useAppContext } from "./context/AppContext";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import OrderDisplay from "./components/OrderDisplay";
import SuccessSnackbar from "./components/SuccessSnackbar";

const App = () => {
  const { setCart, setProducts, products, setCartFilled } = useAppContext();

  const location = useLocation();

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("http://localhost:5140/api/products")
      .then((response) => {
        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
      })
      .catch((error) => console.error("Error fetching products:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Fetch cart data from the API only once
  const fetchCartData = () => {
    const localProduct = localStorage.getItem("products");
    const parsedProducts =
      localProduct !== null ? JSON.parse(localProduct) : null;
    axios
      .get("http://localhost:5140/api/cart")
      .then((response) => {
        const fetchedCart = response.data;
        const cartData = fetchedCart.map((cartItem: CartProduct) => {
          const cartProduct = parsedProducts.find(
            (p: Product) => p.productId === cartItem.product_id
          );
          return {
            ...cartItem,
            product: cartProduct,
          };
        });
        localStorage.setItem("cart", JSON.stringify(cartData));
        setCart(cartData);
        const isCartFilled = cartData && cartData.length > 0 ? true : false;
        setCartFilled(isCartFilled);
        console.log(cartData);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  };

  useEffect(() => {
    fetchCartData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Depend on location to trigger the effect on changes

  // Group products by category
  const groupProductsByCategory = (products: Product[]): GroupedProducts[] => {
    const grouped: { [key: string]: Product[] } = {};

    // Group products by category
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });

    // Map grouped products to the desired format
    return Object.entries(grouped).map(([category, items]) => ({
      category: category,
      products: items,
    }));
  };

  const groupedProducts = groupProductsByCategory(products);

  // Filter out featured products
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              groupedProducts={groupedProducts}
              featuredProducts={featuredProducts}
            />
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderDisplay />} />
      </Routes>
      <SuccessSnackbar/>
    </div>
  );
};

export default App;
