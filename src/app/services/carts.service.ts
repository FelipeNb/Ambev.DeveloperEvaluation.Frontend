import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import { Cart, CreateCartRequest, ListCartsResponse, UpdateCartRequest} from '../models/cart';
import {ApiResponse} from "./auth.service";

@Injectable({ providedIn: 'root' })
export class CartsService {
  constructor(private api: ApiService) {}

  list(page: number = 1, size: number = 10, order: string = 'branch asc'): Observable<ApiResponse<ListCartsResponse>> {
    const params = {
      _page: page.toString(),
      _size: size.toString(),
      _order: order
    };
    return this.api.get<ApiResponse<ListCartsResponse>>('Carts', params);
  }

  get(id: string): Observable<ApiResponse<Cart>> {
    return this.api.get<ApiResponse<Cart>>(`Carts/${id}`);
  }

  create(cart: CreateCartRequest): Observable<ApiResponse<Cart>> {
    return this.api.post<ApiResponse<Cart>>('Carts', cart);
  }

  update(id: string, cart: UpdateCartRequest): Observable<ApiResponse<Cart>> {
    return this.api.put<ApiResponse<Cart>>(`Carts/${id}`, cart);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.api.delete<ApiResponse<void>>(`Carts/${id}`);
  }

  cancel(id: string): Observable<ApiResponse<Cart>> {
    return this.api.patch<ApiResponse<Cart>>(`Carts/cancel/${id}`, {});
  }
}
