import { ApiClient } from '../apiClient';

export interface Address {
  street?: string;
  houseNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Subscription {
  from?: Date;
  to?: Date;
  renew?: boolean;
}

export interface PaymentMethod {
  name?: string;
  cardNumber?: string;
  expirationDate?: Date;
  cvv?: string;
}

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  prioritisationTickets?: number;
  rating?: number;
  phoneNumber?: string;
  createdAt?: Date;
  address?: Address;
  subscription?: Subscription;
  paymentMethod?: PaymentMethod;
}

export interface UserResponse {
  message: string;
  user: User;
  jwtToken: string;
}

const apiClient = new ApiClient();

export async function getUser(id: string): Promise<User> {
  return await apiClient.get<User>(`/users/${id}`);
}

export async function updateUser(id: string, user: User): Promise<User> {
  return await apiClient.put<User>(`/users/${id}`, user, {
    withCredentials: true,
  });
}

export async function deleteUser(id: string): Promise<void> {
  return await apiClient.delete<void>(`/users/${id}`);
}

export async function login(
  email: string,
  password: string,
): Promise<UserResponse> {
  return await apiClient.post<UserResponse>(
    `/auth/login`,
    { email, password },
    { withCredentials: true },
  );
}

export async function register(user: User): Promise<UserResponse> {
  return await apiClient.post<UserResponse>(`/auth/register`, user);
}

export async function verify(): Promise<User> {
  return await apiClient.get<User>(`/auth/verify`);
}

export async function logout(): Promise<string> {
  return await apiClient.post<string>(`/auth/logout`);
}
