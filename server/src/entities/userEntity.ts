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
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Subscription {
  from: Date;
  to: Date;
  status: SubscriptionStatus;
  type: SubscriptionType;
}

export interface PaymentMethod {
  name: string;
  cardNumber: string;
  expirationDate: Date;
  cvv: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  prioritisationTickets: number;
  phoneNumber: string;
  createdAt: Date;
  address: Address;
  subscription: Subscription;
  paymentMethod: PaymentMethod;
  rating: number;
  stripeCustomerId: string;

  getSignedJwtToken(): string;

  matchPassword(enteredPassword: string): boolean;
}
