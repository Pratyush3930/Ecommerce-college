import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { newProduct, Product } from "../utils/productDataHandling"; // Assuming your Product interface is in utils
import { deleteProduct, fetchProducts } from "../api/productService";

// Define the shape of your context's state
interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  error: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpload: (images: File[]) => void;
  newProduct: newProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<newProduct>>;
  handleDeleteItem: (productId: number) => void;
  editProduct: Product;
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create a Provider component to manage the state
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const [newProduct, setNewProduct] = useState<newProduct>({
    productName: "", // Provide a default empty string for the required ProductName
    price: "", // Provide a default value for Price
    stock: "",
    category: "Default", // Provide a default value for Stock
    isFeatured: false,
    // Optional fields can be omitted if you're not setting them initially
  });

  const [editProduct, setEditProduct] = useState<Product>({
    productId: 0,
    productName: "",
    price: "",
    stock: "",
    isFeatured: false,
  });

  

  const handleUpload = (images: File[]) => {
    setNewProduct((product) => ({ ...product, ProductImage: images }));
    setEditProduct((product) => ({ ...product, ProductImage: images }));
  };

  const handleDeleteItem = (productId: number) => {
    deleteProduct(productId);
    setProducts((items) =>
      items.filter((product) => product.productId !== productId)
    );
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts(setProducts);
        await fetchProducts(setFilteredProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        error,
        setError,
        handleUpload,
        newProduct,
        setNewProduct,
        handleDeleteItem,
        editProduct,
        setEditProduct,
        filteredProducts,
        setFilteredProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
