import { Component } from '@angular/core';
import { CartsStore } from '../../stores/carts.store';
import { UsersStore } from '../../stores/users.store';
import { ProductsStore } from '../../stores/products.store';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html'
})
export class CartsComponent {
  items$ = this.store.items$;
  loading$ = this.store.loading$;

  users$ = this.usersStore.users$;
  products$ = this.productsStore.items$;

  displayDialog = false;
  editing: any = null;
  cart: { id?: any; userId: any; items: Array<{ productId: any; quantity: number }> } = { id: '', userId: '', items: [] };

  selectedProduct: any = null;

  constructor(private store: CartsStore,
              private usersStore: UsersStore,
              private productsStore: ProductsStore) {}

  openCreate() { this.editing = null; this.cart = { id: '', userId: '', items: [] }; this.selectedProduct = null; this.displayDialog = true; }
  openEdit(c: any) { this.editing = c; this.cart = { id: c.id, userId: c.userId, items: [...(c.items || [])] }; this.displayDialog = true; }

  addItem() {
    const items = this.cart.items || [];
    if (this.selectedProduct && this.cart.userId) {
      items.push({ productId: this.selectedProduct.id, quantity: 1 });
      this.cart = { ...this.cart, items };
    }
  }

  save() {
    const val = { id: this.cart.id, userId: this.cart.userId, items: this.cart.items };
    if (this.editing) {
      this.store.update(this.editing.id, val).subscribe(() => this.displayDialog = false);
    } else {
      this.store.create(val).subscribe(() => this.displayDialog = false);
    }
  }

  remove(id: any) { if (confirm('Remover carrinho?')) this.store.delete(id).subscribe(); }
}
