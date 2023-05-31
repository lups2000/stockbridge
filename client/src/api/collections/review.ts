import { User } from "./user";

export interface Review {
    id: string;
    rating: number;
    description: string;
    createdAt: Date,
    reviewer: User;
    reviewee: User;
}
