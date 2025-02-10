import React from "react";
import { CartProduct, Product } from "../types";
import { useAppContext } from "../context/AppContext";

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean; // Optional prop to handle featured products differently
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFeatured }) => {

  const {handleCartChange , cart} = useAppContext();

  const productInCartQuantity = () => {
    const cartItem = cart.find((item: CartProduct) => {
      console.log("Checking item:", item.product_id, product.productId);
      return Number(item.product_id) === Number(product.productId);
    });
    console.log("products found", cartItem);
    if (cartItem) {
      return cartItem.quantity+1;
    }
    return 1;
  };
  
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-lg max-w-60 w-full${
        isFeatured
          ? "border border-gray-500 bg-gradient-to-r from-cyan-50 to-blue-100"
          : ""
      }`}
    >
      <img
        src={`http://localhost:5140${product.imagePath}`}
        alt={product.productName}
        className="w-full h-36 object-contain mb-4 rounded-lg"
      />
      <h3 className="text-xl font-semibold">{product.productName}</h3>
      <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
      <button className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600" onClick={() => handleCartChange(product.productId, product.price, productInCartQuantity())}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
