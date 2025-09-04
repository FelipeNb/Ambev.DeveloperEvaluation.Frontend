import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, CreateProductRequest, UpdateProductRequest, ListProductsResponse, ApiResponse } from '../models/product';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  items: Product[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  totalPages = 0;

  constructor(private svc: ProductsService) {
    this.load();
  }

  async load(page: number = 1, size: number = 10) {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.svc.list(page, size));
      if (response?.success && response.data) {
        this.items = response.data.items || [];
        this.totalItems = response.data.totalItems;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
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

  async create(p: CreateProductRequest) {
    try {
      const response = await firstValueFrom(this.svc.create(p));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id: string, p: UpdateProductRequest) {
    try {
      const response = await firstValueFrom(this.svc.update(id, p));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async get(id: string) {
    try {
      const response = await firstValueFrom(this.svc.get(id));
        if (response?.success && response.data) {
          return response.data;
        }
        return null;
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

  async loadByCategory(category: string, page: number = 1, size: number = 10) {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.svc.getByCategory(category, page, size));
      if (response?.success && response.data) {
        this.items = response.data.items || [];
        this.totalItems = response.data.totalItems;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      }
    } catch (err) {
      console.error(err);
      this.items = [];
    } finally {
      this.loading = false;
    }
  }
}
