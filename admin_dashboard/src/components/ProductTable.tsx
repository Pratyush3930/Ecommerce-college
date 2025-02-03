import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { useProductContext } from "../context/ProductContext";

const inStockClass: string =
  "text-green-400 bg-green-400/10 flex-none rounded-full p-1";
const outOfStockClass: string =
  "text-rose-400 bg-rose-400/10 flex-none rounded-full p-1";

const ProductTable = () => {
  const { filteredProducts, handleDeleteItem, setEditProduct } = useProductContext();
  return (
    <div className="min-h-[370px]">
      <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Product
            </th>
            <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
              Status
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20"
            >
              Price
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filteredProducts.map((product) => (
            <tr key={product.productId}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img
                    src={`http://localhost:5140${product.imagePath}`}
                    alt=""
                    className="h-8 w-8 rounded-full bg-gray-800"
                  />
                  <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                    {product.productName}
                  </div>
                </div>
              </td>

              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center gap-x-2 justify-start">
                  <div
                    className={
                      Number(product.stock) > 0 ? inStockClass : outOfStockClass
                    }
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="dark:text-whiteSecondary text-blackPrimary block">
                    {Number(product.stock) > 0 ? "In stock" : "Out of stock"}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-rose-200 text-rose-600 font-medium table-cell lg:pr-20">
                ${product.price}
              </td>
              <td className="py-4 pl-0 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
                <div className="flex gap-x-1 justify-end">
                  <Link
                    to={`/products/${product.productId}`}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8  flex justify-center items-center cursor-pointer hover:border-gray-400"
                    onClick={()=>setEditProduct((item) => ({...item, productId: product.productId}))}
                  >
                    <HiOutlinePencil className="text-lg" />
                  </Link>
                  <Link
                    to={`/products/${product.productId}`}
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8  flex justify-center items-center cursor-pointer hover:border-gray-400"
                    onClick={()=>setEditProduct((item) => ({...item, productId: product.productId}))}
                  >
                    <HiOutlineEye className="text-lg" />
                  </Link>
                  <Link
                    to="/products"
                    className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8  flex justify-center items-center cursor-pointer hover:border-gray-400"
                    onClick={() => handleDeleteItem(product.productId)}
                  >
                    <HiOutlineTrash className="text-lg" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductTable;
