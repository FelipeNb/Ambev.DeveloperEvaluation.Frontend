export interface CartItem {
  productId: string | number;
  quantity: number;
}

export interface Cart {
  id: string | number;
  userId: string | number;
  items: CartItem[];
}
