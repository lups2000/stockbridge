import { ApiClient } from '../apiClient';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
}

export enum SubscriptionType {
  BASIC_SUBSCRIPTION = 'Basic Subscription',
  ADVANCED_SUBSCRIPTION = 'Advanced Subscription',
  PREMIUM_SUBSCRIPTION = 'Premium Subscription',
}

export interface Address {
  street?: string;
  houseNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Subscription {
  from: Date;
  to: Date;
  status: SubscriptionStatus;
  type: SubscriptionType;
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
  address?: string;
  subscription?: string;
  paymentMethod?: PaymentMethod;
  location?: Location;
  stripeCustomerId?: string;
  registrationCompleted?: boolean;
  imageUrl?: string;
}
export interface PopulatedUser {
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
  location?: Location;
  stripeCustomerId?: string;
  registrationCompleted?: boolean;
  imageUrl?: string;
}

export interface UserResponse {
  message: string;
  user: PopulatedUser;
  jwtToken: string;
}

export interface Location {
  type: string;
  coordinates: [number, number];
}

const apiClient = new ApiClient();

export async function getUser(id: string): Promise<PopulatedUser> {
  return await apiClient.get<PopulatedUser>(`/users/${id}`);
}

export async function updateUser(
  id: string,
  user: PopulatedUser,
): Promise<PopulatedUser> {
  return await apiClient.put<PopulatedUser>(`/users/${id}`, user, {
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
  return await apiClient.post<UserResponse>(`/auth/register`, user, {
    withCredentials: true,
  });
}

export async function verify(): Promise<PopulatedUser> {
  return await apiClient.get<PopulatedUser>(`/auth/verify`, {
    withCredentials: true,
  });
}

export async function logout(): Promise<string> {
  return await apiClient.post<string>(
    `/auth/logout`,
    {},
    { withCredentials: true },
  );
}

export async function getStore(id: String): Promise<PopulatedUser> {
  return await apiClient.get<PopulatedUser>(`/stores/${id}`, { withCredentials: true });
}
