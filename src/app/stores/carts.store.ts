import { Injectable } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { Cart, CreateCartRequest, UpdateCartRequest, ListCartsResponse } from '../models/cart';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartsStore {
  items: Cart[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  totalPages = 0;

  constructor(private svc: CartsService) {
    this.load();
  }

  async load(page: number = 1, size: number = 10) {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.svc.list(page, size));
      if (response) {
        this.items = response.items || [];
        this.totalItems = response.totalItems;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
      } else {
        this.items = [];
        this.totalItems = 0;
        this.currentPage = 1;
        this.totalPages = 0;
      }
    } catch (err) {
      console.error(err);
      this.items = [];
      this.totalItems = 0;
      this.currentPage = 1;
      this.totalPages = 0;
    } finally {
      this.loading = false;
    }
  }

  async create(c: CreateCartRequest) {
    try {
      const response = await firstValueFrom(this.svc.create(c));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id: string, c: UpdateCartRequest) {
    try {
      const response = await firstValueFrom(this.svc.update(id, c));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id: string) {
    try {
      const response = await firstValueFrom(this.svc.delete(id));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async cancel(id: string) {
    try {
      const response = await firstValueFrom(this.svc.cancel(id));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
