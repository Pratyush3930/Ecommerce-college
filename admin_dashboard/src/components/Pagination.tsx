import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";

const Pagination = () => {
  const { setFilteredProducts, products } = useProductContext();
  const productsPerPage = 5; // Set the number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on filtered products
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the range of page numbers to display
  let startPage = currentPage - 1;
  if (startPage <= 0) startPage = 1;
  let endPage = startPage + 2;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - 2 > 0 ? totalPages - 2 : 1;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Update filtered products when currentPage or products change
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products, setFilteredProducts]);

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`border border-gray-600 py-1 px-3 hover:border-gray-500 ${
            currentPage === number
              ? "dark:bg-whiteSecondary bg-blackPrimary dark:text-blackPrimary text-whiteSecondary"
              : "dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary"
          }`}
          onClick={() => goToPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
