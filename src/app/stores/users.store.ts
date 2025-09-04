import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, CreateUserRequest, UpdateUserRequest, ListUsersResponse } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  users: User[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  totalPages = 0;

  constructor(private svc: UsersService) {
    this.load();
  }

  async load(page: number = 1, size: number = 100) {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.svc.list(page, size));
      if (response?.success && response.data) {
        this.users = response.data.items || [];
        this.totalItems = response.data.totalItems;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      } else {
        this.users = [];
        this.totalItems = 0;
        this.currentPage = 1;
        this.totalPages = 0;
      }
    } catch (err) {
      console.error(err);
      this.users = [];
      this.totalItems = 0;
      this.currentPage = 1;
      this.totalPages = 0;
    } finally {
      this.loading = false;
    }
  }

  async get(id: string) {
    try {
      const response = await firstValueFrom(this.svc.get(id));
      if (response?.success && response.data) {
        return response.data;
      }
      return {} as User;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async create(u: CreateUserRequest) {
    try {
      const response = await firstValueFrom(this.svc.create(u));
      if (response?.success) {
        await this.load(this.currentPage);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id: string, u: UpdateUserRequest) {
    try {
      const response = await firstValueFrom(this.svc.update(id, u));
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
}
