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

export interface CartOrderItem {
  cart_id: number;
  quantity: number;
  total_price: number;
  productName: string;
  imagePath: string;
  product_id: number;
}

export interface Order {
  orderId?: number;
  cartItems: CartOrderItem[];
  address: string;
  phone: number;
  totalAmount?: number;
  paymentStatus?: string;
  userId?: number;
}