export interface Product {
  productId: number;
  productName: string;
  productDescription?: string;
  category?: string;
  price: number;
  stock: number;
  imagePath?: string;
  isFeatured: boolean;
}

export interface GroupedProducts {
  category: string;
  products: Product[];
}

export interface CartProduct {
  cart_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  product: Product;
  user_id: number;
}

export interface CreateCartProduct {
  cart_id?: number;
  product_id: number;
  quantity: number;
  total_price: number;
  product?: Product;
  user_id?: number;
}