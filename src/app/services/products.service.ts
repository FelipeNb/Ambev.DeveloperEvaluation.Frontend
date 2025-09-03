import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private api: ApiService) {}
  list(q?: string): Observable<Product[]> { return this.api.get<Product[]>('products' + (q ? `?q=${q}` : '')); }
  get(id: string | number) { return this.api.get<Product>(`products/${id}`); }
  create(p: Partial<Product>) { return this.api.post<Product>('products', p); }
  update(id: string | number, p: Partial<Product>) { return this.api.put<Product>(`products/${id}`, p); }
  delete(id: string | number) { return this.api.delete<void>(`products/${id}`); }
}
