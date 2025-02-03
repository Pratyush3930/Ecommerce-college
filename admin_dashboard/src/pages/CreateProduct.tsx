import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { Link } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import { selectList } from "../utils/data";
import { useProductContext } from "../context/ProductContext";
import { createProduct } from "../api/productService";

const CreateProduct = () => {
  const {
    newProduct,
    setNewProduct,
    // loading,
    // setLoading,
    // error,
    // setError,
    setProducts,
    handleUpload,
  } = useProductContext();

  const handleCreateProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const productNew = await createProduct(newProduct); // immediately response deko set garxa
    setProducts((product) => [...product, productNew]); // balla balla afai runtime mai set garna lekheko code
    setNewProduct({ productName: "", price: "", stock: "", category: "Default", isFeatured: false });
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="hover:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new product
              </h2>
            </div>
            <div
              className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center"
              onClick={(e) => handleCreateProduct(e)}
            >
              {/* <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save draft
                </span>
              </button> */}
              <Link
                to="/products"
                className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-black duration-200 flex items-center justify-center gap-x-2"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
                <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                  Publish product
                </span>
              </Link>
            </div>
          </div>

          {/* Add Product section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product name..."
                    value={newProduct.productName}
                    onChange={(e) =>
                      setNewProduct((product) => ({
                        ...product, // Spread the current state to preserve other properties
                        productName: e.target.value, // Update only ProductName
                      }))
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Description">
                  <TextAreaInput
                    placeholder="Enter a product description..."
                    rows={4}
                    cols={50}
                    value={newProduct.productDescription}
                    onChange={(e) =>
                      setNewProduct((product) => ({
                        ...product, // Spread the current state to preserve other properties
                        productDescription: e.target.value,
                      }))
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Category">
                  <SelectInput
                    selectList={selectList}
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct((product) => ({
                        ...product, // Spread the current state to preserve other properties
                        category: e.target.value,
                      }))
                    }
                  />
                </InputWithLabel>
                <div className="flex items-center gap-3">
                  <label className="dark:text-whiteSecondary text-blackPrimary block text-base font-semibold mb-1">
                    Featured
                  </label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    onChange={(e) =>
                      setNewProduct((product) => ({
                        ...product,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Pricing & Inventory
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-x-5 max-[500px]:grid-cols-1 max-[500px]:gap-x-0 max-[500px]:gap-y-5">
                  <InputWithLabel label="Base pricing">
                    <SimpleInput
                      type="number"
                      placeholder="Enter a product base pricing..."
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct((product) => ({
                          ...product, // Spread the current state to preserve other properties
                          price: e.target.value, // Convert the string to a number
                        }))
                      }
                    />
                  </InputWithLabel>

                  <InputWithLabel label="Price with dicount">
                    <SimpleInput
                      type="number"
                      placeholder="Enter a price with discount..."
                    />
                  </InputWithLabel>
                </div>

                <div className="grid grid-cols-2 gap-x-5 max-[500px]:grid-cols-1 max-[500px]:gap-x-0 max-[500px]:gap-y-5">
                  <InputWithLabel label="Stock">
                    <SimpleInput
                      type="number"
                      placeholder="Enter a product stock..."
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct((product) => ({
                          ...product, // Spread the current state to preserve other properties
                          stock: e.target.value, // Convert the string to a number
                        }))
                      }
                    />
                  </InputWithLabel>
                </div>
              </div>
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product images
              </h3>

              <div className="flex  flex-col gap-8">
                <ImageUpload onUpload={handleUpload} />
                {newProduct.ProductImage && (
                  <div className="flex justify-center gap-x-2 mt-5 flex-wrap">
                    {newProduct.ProductImage.map((image, index) => (
                      <img
                        // src={URL.createObjectURL(newProduct.ProductImage)} // Create a preview URL for the image
                        key={index}
                        src={URL.createObjectURL(image)} // Create a preview URL for the image
                        className="w-full h-64 object-contain rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
