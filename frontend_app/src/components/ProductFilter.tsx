import React, { useState } from "react";
import Slider from "@mui/material/Slider";

interface ProductFilterProps {
  categories: string[];
  onFilterChange?: (filters: { price: number | null; category: string }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories }) => {
  const [price, setPrice] = useState<number>(50);
  const [category, setCategory] = useState<string>("");

  const handleFilterChange = () => {
    // onFilterChange({ price, category });
    console.log("filter change", categories);
  };

  return (
    <div className="py-4 p-12 border border-black bg-gray-100 rounded-lg h-fit">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Price (Max)</label>
          <Slider
            value={price}
            onChange={(_, newValue) => setPrice(newValue as number)}
            min={0}
            max={1000}
            step={1}
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <div className="flex flex-col gap-2">
          {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
