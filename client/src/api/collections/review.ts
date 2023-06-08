import { Advert } from "./advert";
import { User } from "./user";

export interface Review {
    id: string;
    rating: number;
    description: string;
    createdAt: Date,
    reviewer: User;
    reviewedAdvert: Advert;
}
