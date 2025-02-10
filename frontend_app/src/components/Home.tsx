import React from "react";
import FeaturedCategory from "./FeaturedCategory";
import ProductCategory from "./ProductCategory";
import { GroupedProducts, Product } from "../types";
import ProductFilter from "./ProductFilter";

interface HomeProps {
  groupedProducts: GroupedProducts[];
  featuredProducts: Product[];
}

const Home: React.FC<HomeProps> = ({ groupedProducts, featuredProducts }) => {
  const categories = groupedProducts.map((group) => group.category);
  return (
    <div className="p-6">
      {/* Featured category section */}
      {featuredProducts.length > 0 && (
        <FeaturedCategory products={featuredProducts} />
      )}

      <div className="flex gap-8">
        <ProductFilter categories={categories} />
        {/* Other categories */}
        <div className="w-full flex flex-col gap-8">
          {groupedProducts.map((group, index) => (
            <ProductCategory
              key={index}
              categoryName={group.category}
              products={group.products}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
