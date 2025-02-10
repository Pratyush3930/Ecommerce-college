import React from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductCategoryProps {
  categoryName: string;
  products: Product[];
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  categoryName,
  products,
}) => {
  return (
    <div className="p-6 border-2 shadow-md border-zinc-300 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 uppercase">{categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
