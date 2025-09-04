export interface RatingProduct {
  rate?: number;
  count?: number;
}

export interface Product {
  id: string;
  title?: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating: RatingProduct;
}

export interface CreateProductRequest {
  title?: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating: RatingProduct;
}

export interface UpdateProductRequest {
  id: string;
  title?: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating: RatingProduct;
}

export interface ListProductsResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  items?: Product[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  errors?: ValidationErrorDetail[];
  data: T;
}

export interface ValidationErrorDetail {
  type?: string;
  error?: string;
  detail?: string;
}
