import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface AuthenticateUserRequest {
  email?: string;
  password?: string;
}

export interface AuthenticateUserResponse {
  token?: string;
  email?: string;
  username?: string;
  role?: string;
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

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  authenticate(request: AuthenticateUserRequest): Observable<ApiResponse<AuthenticateUserResponse>> {
    return this.api.post<ApiResponse<AuthenticateUserResponse>>('Auth', request);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
