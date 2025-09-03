import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({ providedIn: 'root' })
export class CartsService {
  constructor(private api: ApiService) {}
  list(q?: string): Observable<Cart[]> { return this.api.get<Cart[]>('carts' + (q ? `?q=${q}` : '')); }
  get(id: string | number) { return this.api.get<Cart>(`carts/${id}`); }
  create(c: Partial<Cart>) { return this.api.post<Cart>('carts', c); }
  update(id: string | number, c: Partial<Cart>) { return this.api.put<Cart>(`carts/${id}`, c); }
  delete(id: string | number) { return this.api.delete<void>(`carts/${id}`); }
}
