import axiosInstance from "../utils/axios";
import { newProduct, Product } from "../utils/productDataHandling";

export const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    const response = await axiosInstance.get("/api/products");

    // Accessing the response data directly
    const products = response.data;

    // If you need the status code or status text
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);

    console.log("Received products:", products);
    setProducts(products);
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (productData: newProduct) => {
  const {
    ProductImage,
    productName,
    productDescription,
    category,
    price,
    stock,
    isFeatured
  } = productData;

  const formData = new FormData();
  if (ProductImage && ProductImage.length > 0) {
    formData.append("ProductImage", ProductImage[0]);
  }
  formData.append("ProductName", productName);
  if (productDescription) {
    formData.append("ProductDescription", productDescription);
  }
  if (category) {
    formData.append("Category", category);
  }
  if (price) {
  formData.append("Price", price.toString());
  }
  if(stock)
  formData.append("Stock", stock.toString());

  formData.append("IsFeatured", isFeatured.toString());

  // console.log("Form Data:");
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
  try {
    const response = await axiosInstance.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

export const updateProduct = async (productId: number, productData: Product) => {
  const {
    productName,
    productDescription,
    category,
    price,
    stock,
    isFeatured
  } = productData;

  const formData = new FormData();

  formData.append("ProductName", productName);
  if (productDescription) {
    formData.append("ProductDescription", productDescription);
  }
  if (category) {
    formData.append("Category", category);
  }
  if (price) {
  formData.append("Price", price.toString());
  }
  if(stock)
  formData.append("Stock", stock.toString());

  formData.append("IsFeatured", isFeatured.toString());
  try {
    const response = await axiosInstance.put(`/api/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};
