export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductType {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: number;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  sku: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}



export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddressId?: number;
  billingAddressId?: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  placedAt: string;
  deliveredAt?: string;
  shippedAt?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
  isAdmin: boolean;
}


export interface Address {
  id: number;
  userId: number;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: string;
}

export interface Coupon {
  id: number;
  code: string;
  type: 'percent' | 'fixed' | 'free_shipping';
  value: number;
  minOrder: number;
  expiresAt: string;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  taxRatePercent: number;
  supportEmail: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

//export interface CartItem {
//   productId: number;
//   variantId?: string;
//   quantity: number;
//   unitPrice: number;
// }