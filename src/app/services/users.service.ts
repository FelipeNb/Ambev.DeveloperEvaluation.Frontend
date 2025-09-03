import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private api: ApiService) {}
  list(q?: string): Observable<User[]> { return this.api.get<User[]>('users' + (q ? `?q=${q}` : '')); }
  get(id: string | number) { return this.api.get<User>(`users/${id}`); }
  create(u: Partial<User>) { return this.api.post<User>('users', u); }
  update(id: string | number, u: Partial<User>) { return this.api.put<User>(`users/${id}`, u); }
  delete(id: string | number) { return this.api.delete<void>(`users/${id}`); }
}
