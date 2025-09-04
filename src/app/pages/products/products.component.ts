import { Component, OnInit } from '@angular/core';
import { ProductsStore } from '../../stores/products.store';
import { Product, CreateProductRequest, UpdateProductRequest, RatingProduct } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  get items() { return this.store.items; }
  get loading() { return this.store.loading; }

  displayDialog = false;
  editing: Product | null = null;
  product: Partial<Product> = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  };

  constructor(private store: ProductsStore) {}

  ngOnInit() {
    this.store.load();
  }

  openCreate() {
    this.editing = null;
    this.product = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: { rate: 0, count: 0 }
    };
    this.displayDialog = true;
  }

  async openEdit(p: Product) {

    const product = await this.store.get(p.id);

    this.editing = p;
    this.product = {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      description: product?.description,
      category: product?.category,
      image: product?.image,
      rating: { ...product?.rating }
    };
    this.displayDialog = true;
  }

  async save() {
    if (this.editing) {
      const updateRequest: UpdateProductRequest = {
        id: this.product.id!,
        title: this.product.title,
        price: this.product.price!,
        description: this.product.description,
        category: this.product.category,
        image: this.product.image,
        rating: this.product.rating!
      };
      await this.store.update(this.editing.id, updateRequest);
    } else {
      const createRequest: CreateProductRequest = {
        title: this.product.title,
        price: this.product.price!,
        description: this.product.description,
        category: this.product.category,
        image: this.product.image,
        rating: this.product.rating!
      };
      await this.store.create(createRequest);
    }
    this.displayDialog = false;
  }

  async remove(id: string) {
    if (confirm('Remover produto?')) {
      await this.store.delete(id);
    }
  }
}
