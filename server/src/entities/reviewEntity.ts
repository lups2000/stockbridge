import { Advert } from './advertEntity';
import { User } from './userEntity';

export interface Review {
  id: string;
  rating: number;
  description: string;
  createdAt: Date;
  reviewer: User;
  reviewedAdvert: Advert;
}
