export interface Product {
  productId: number;
  productName: string;
  productDescription?: string;
  category?: string;
  price: string;
  stock: string;
  ProductImage?: File[];
  imagePath?: string;
  isFeatured : boolean;
}

export interface newProduct {
  productName: string;
  productDescription?: string;
  category?: string;
  price: string;
  stock: string;
  ProductImage?: File[];
  isFeatured : boolean;
}
