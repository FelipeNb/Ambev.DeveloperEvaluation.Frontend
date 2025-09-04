import { Component, OnInit } from '@angular/core';
import { CartsStore } from '../../stores/carts.store';
import { UsersStore } from '../../stores/users.store';
import { ProductsStore } from '../../stores/products.store';
import { Cart, CreateCartRequest, UpdateCartRequest, CartItem } from '../../models/cart';
import { User } from '../../models/user';
import { Product } from '../../models/product';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html'
})
export class CartsComponent implements OnInit {
  get items() { return this.store.items; }
  get loading() { return this.store.loading; }

  get users() { return this.usersStore.users; }
  get products() { return this.productsStore.items; }

  displayDialog = false;
  editing: Cart | null = null;
  cart: Partial<Cart> = {
    userId: '',
    branch: '',
    items: []
  };

  selectedProduct: Product | null = null;
  selectedUser: User | null = null;

  constructor(private store: CartsStore,
              private usersStore: UsersStore,
              private productsStore: ProductsStore) {}

  ngOnInit() {
    this.store.load();
    this.usersStore.load();
    this.productsStore.load();
  }

  openCreate() {
    this.editing = null;
    this.cart = {
      userId: '',
      branch: '',
      items: []
    };
    this.selectedProduct = null;
    this.selectedUser = null;
    this.displayDialog = true;
  }

  openEdit(c: Cart) {
    this.editing = c;
    this.cart = {
      id: c.id,
      userId: c.userId,
      branch: c.branch,
      items: [...(c.items || [])]
    };
    this.displayDialog = true;
  }

  addItem() {
    const items = this.cart.items || [];
    if (this.selectedProduct && this.cart.userId) {
      const newItem: CartItem = {
        productId: this.selectedProduct.id,
        quantity: 1
      };
      items.push(newItem);
      this.cart = { ...this.cart, items };
      this.selectedProduct = null;
    }
  }

  removeItem(index: number) {
    const items = this.cart.items || [];
    items.splice(index, 1);
    this.cart = { ...this.cart, items };
  }

  async save() {
    if (this.editing) {
      const updateRequest: UpdateCartRequest = {
        id: this.cart.id!,
        userId: this.cart.userId!,
        branch: this.cart.branch,
        items: this.cart.items
      };
      await this.store.update(this.editing.id, updateRequest);
    } else {
      const createRequest: CreateCartRequest = {
        userId: this.cart.userId!,
        branch: this.cart.branch,
        items: this.cart.items
      };
      await this.store.create(createRequest);
    }
    this.displayDialog = false;
  }

  async remove(id: string) {
    if (confirm('Remover carrinho?')) {
      await this.store.delete(id);
    }
  }

  async cancel(id: string) {
    if (confirm('Cancelar carrinho?')) {
      await this.store.cancel(id);
    }
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.name?.firstName} ${user.name?.lastName}` : 'Unknown';
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.title || 'Unknown' : 'Unknown';
  }

  getProductPrice(productId: string): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.price : 0;
  }
}
