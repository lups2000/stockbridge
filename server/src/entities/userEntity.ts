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
    renew: boolean;
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

    getSignedJwtToken(): string;

    matchPassword(enteredPassword: string): boolean;


}