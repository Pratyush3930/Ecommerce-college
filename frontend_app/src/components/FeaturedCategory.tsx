import React, { useState } from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface FeaturedCategoryProps {
  products: Product[];
}

const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({ products }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedProducts = showAll ? products : products.slice(0, 5);

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-100 to-blue-200 border-4 border-blue-300 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            isFeatured={true} // Pass isFeatured prop for styling
          />
        ))}
      </div>
      {!showAll && products.length > 4 && (
        <div className="mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            See More
          </button>
        </div>
      )}
      {showAll && products.length > 4 && (
        <div className="text-start mt-6">
          <button
            onClick={() => setShowAll(false)}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCategory;
