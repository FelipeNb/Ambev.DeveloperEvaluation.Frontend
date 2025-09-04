import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  ListProductsResponse,
  ApiResponse 
} from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private api: ApiService) {}

  list(page: number = 1, size: number = 10, order: string = 'price desc,title asc'): Observable<ApiResponse<ListProductsResponse>> {
    const params = {
      _page: page.toString(),
      _size: size.toString(),
      _order: order
    };
    return this.api.get<ApiResponse<ListProductsResponse>>('Products', params);
  }

  getByCategory(category: string, page: number = 1, size: number = 10, order: string = 'price desc,title asc'): Observable<ApiResponse<ListProductsResponse>> {
    const params = {
      _page: page.toString(),
      _size: size.toString(),
      _order: order
    };
    return this.api.get<ApiResponse<ListProductsResponse>>(`Products/category/${category}`, params);
  }

  getCategories(): Observable<ApiResponse<{ categories?: string[] }>> {
    return this.api.get<ApiResponse<{ categories?: string[] }>>('Products/categories');
  }

  get(id: string): Observable<ApiResponse<Product>> {
    return this.api.get<ApiResponse<Product>>(`Products/${id}`);
  }

  create(product: CreateProductRequest): Observable<ApiResponse<Product>> {
    return this.api.post<ApiResponse<Product>>('Products', product);
  }

  update(id: string, product: UpdateProductRequest): Observable<ApiResponse<Product>> {
    return this.api.put<ApiResponse<Product>>(`Products/${id}`, product);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.api.delete<ApiResponse<void>>(`Products/${id}`);
  }
}
