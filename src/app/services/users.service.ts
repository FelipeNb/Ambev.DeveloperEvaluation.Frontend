import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {CreateUserRequest, ListUsersResponse, UpdateUserRequest, User} from '../models/user';
import {ApiResponse} from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private api: ApiService) {}

  list(page: number = 1, size: number = 10, order: string = 'username asc,email desc'): Observable<ApiResponse<ListUsersResponse>> {
    const params = {
      _page: page.toString(),
      _size: size.toString(),
      _order: order
    };
    return this.api.get<ApiResponse<ListUsersResponse>>('Users', params);
  }

  get(id: string): Observable<ApiResponse<User>> {
    return this.api.get<ApiResponse<User>>(`Users/${id}`);
  }

  create(user: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.api.post<ApiResponse<User>>('Users', user);
  }

  update(id: string, user: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.api.put<ApiResponse<User>>(`Users/${id}`, user);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.api.delete<ApiResponse<void>>(`Users/${id}`);
  }
}
