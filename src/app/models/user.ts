export interface UserName {
  firstName?: string;
  lastName?: string;
}

export interface UserGeoLocation {
  lat?: string;
  long?: string;
}

export interface UserAddress {
  city?: string;
  street?: string;
  number: number;
  zipcode?: string;
  geoLocation: UserGeoLocation;
}

export enum UserRole {
  Admin = 0,
  Manager = 1,
  Employee = 2,
  Customer = 3
}

export enum UserStatus {
  Inactive = 0,
  Active = 1,
  Suspended = 2,
  Banned = 3
}

export interface User {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  name: UserName;
  address: UserAddress;
  phone?: string;
  role: UserRole;
  status: UserStatus;
}

export interface CreateUserRequest {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  name: UserName;
  address: UserAddress;
  phone?: string;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateUserRequest {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  name: UserName;
  address: UserAddress;
  phone?: string;
  role: UserRole;
  status: UserStatus;
}

export interface ListUsersResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  items?: User[];
}
