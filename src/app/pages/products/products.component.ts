import { Component } from '@angular/core';
import { ProductsStore } from '../../stores/products.store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  items$ = this.store.items$;
  loading$ = this.store.loading$;
  displayDialog = false;
  editing: any = null;
  product: { id?: any; name: string; price: number } = { id: '', name: '', price: 0 };

  constructor(private store: ProductsStore) {}

  openCreate() {
    this.editing = null;
    this.product = { id: '', name: '', price: 0 };
    this.displayDialog = true;
  }
  openEdit(u: any) {
    this.editing = u;
    this.product = { id: u.id, name: u.name, price: u.price };
    this.displayDialog = true;
  }

  save() {
    const val = { id: this.product.id, name: this.product.name, price: this.product.price };
    if (this.editing) {
      this.store.update(this.editing.id, val).subscribe(() => this.displayDialog = false);
    } else {
      this.store.create(val).subscribe(() => this.displayDialog = false);
    }
  }

  remove(id: any) { if (confirm('Remover produto?')) this.store.delete(id).subscribe(); }
}
