import { Component, OnInit } from '@angular/core';
import { UsersStore } from '../../stores/users.store';
import { User, CreateUserRequest, UpdateUserRequest, UserRole, UserStatus } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  get users() { return this.store.users; }
  get loading() { return this.store.loading; }

  displayDialog = false;
  editing: User | null = null;
  user: Partial<User> = {
    username: '',
    email: '',
    password: '',
    name: { firstName: '', lastName: '' },
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
      geoLocation: { lat: '', long: '' }
    },
    phone: '',
    role: UserRole.Customer,
    status: UserStatus.Active
  };

  userRoles = [
    { label: 'Admin', value: UserRole.Admin },
    { label: 'Manager', value: UserRole.Manager },
    { label: 'Employee', value: UserRole.Employee },
    { label: 'Customer', value: UserRole.Customer }
  ];

  userStatuses = [
    { label: 'Inactive', value: UserStatus.Inactive },
    { label: 'Active', value: UserStatus.Active },
    { label: 'Suspended', value: UserStatus.Suspended },
    { label: 'Banned', value: UserStatus.Banned }
  ];

  constructor(private store: UsersStore) {}

  ngOnInit() {
    this.store.load();
  }

  openCreate() {
    this.editing = null;
    this.user = {
      username: '',
      email: '',
      password: '',
      name: { firstName: '', lastName: '' },
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        geoLocation: { lat: '', long: '' }
      },
      phone: '',
      role: UserRole.Customer,
      status: UserStatus.Active
    };
    this.displayDialog = true;
  }

  async openEdit(u: User) {

    const user = await this.store.get(u.id);

    this.editing = u;
    this.user = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      password: user?.password,
      name: { ...user?.name },
      address: { ...user?.address },
      phone: user?.phone,
      role: user?.role,
      status: user?.status
    };
    this.displayDialog = true;
  }

  async save() {
    if (this.editing) {
      const updateRequest: UpdateUserRequest = {
        id: this.user.id!,
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        name: this.user.name!,
        address: this.user.address!,
        phone: this.user.phone,
        role: this.user.role!,
        status: this.user.status!
      };
      await this.store.update(this.editing.id, updateRequest);
    } else {
      const createRequest: CreateUserRequest = {
        id: this.generateUUID(),
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        name: this.user.name!,
        address: this.user.address!,
        phone: this.user.phone,
        role: this.user.role!,
        status: this.user.status!
      };
      await this.store.create(createRequest);
    }
    this.displayDialog = false;
  }

  async remove(id: string) {
    if (confirm('Remover usuário?')) {
      await this.store.delete(id);
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getRoleLabel(role: UserRole): string {
    return this.userRoles.find(r => r.value === role)?.label || 'Unknown';
  }

  getStatusLabel(status: UserStatus): string {
    return this.userStatuses.find(s => s.value === status)?.label || 'Unknown';
  }
}
