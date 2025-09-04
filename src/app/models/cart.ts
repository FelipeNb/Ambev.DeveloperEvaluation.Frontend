export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartProduct {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export interface Cart {
  id: string;
  userId: string;
  date?: string;
  createdAt: string;
  updatedAt: string;
  saleNumber: number;
  branch?: string;
  cancelled: boolean;
  items?: CartProduct[] | CartItem[];
  totalAmount: number;
}

export interface CreateCartRequest {
  userId: string;
  branch?: string;
  items?: CartItem[];
}

export interface UpdateCartRequest {
  id: string;
  userId: string;
  branch?: string;
  items?: CartItem[];
}

export interface ListCartsResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  items?: Cart[];
}
