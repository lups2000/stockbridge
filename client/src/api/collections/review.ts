import { ApiClient } from '../apiClient';
import { Advert } from './advert';
import { User } from './user';

export interface PopulatedReview {
  _id: string;
  rating: number;
  description: string;
  createdAt: Date;
  reviewer: User;
  reviewedAdvert: Advert;
}

export interface Review {
  _id: string;
  rating: number;
  description: string;
  createdAt: Date;
  reviewer: string;
  reviewee: string;
  reviewedAdvert: string;
}

const apiClient = new ApiClient();

export async function getReview(id: string): Promise<PopulatedReview> {
  return await apiClient.get<PopulatedReview>(`/reviews/${id}`, {
    withCredentials: true,
  });
}

export async function createReview(review: Review): Promise<Review> {
  return await apiClient.post<Review>(`/reviews/`, review, {
    withCredentials: true,
  });
}

export async function updateReview(
  id: string,
  review: Review,
): Promise<Review> {
  return await apiClient.put<Review>(`/reviews/${id}`, review, {
    withCredentials: true,
  });
}

export async function deleteReview(id: string): Promise<void> {
  return await apiClient.delete<void>(`/reviews/${id}`, {
    withCredentials: true,
  });
}

export async function getAllReviews(): Promise<Review[]> {
  return await apiClient.get<Review[]>(`/reviews/`, {
    withCredentials: true,
  });
}

export async function getReviewsByAdvert(advertId: string): Promise<Review[]> {
  return await apiClient.get<Review[]>(
    `/reviews/getReviewsByAdvert/${advertId}`,
    {
      withCredentials: true,
    },
  );
}

export async function getReviewsByReviewee(store: string): Promise<PopulatedReview[]> {
  return await apiClient.get<PopulatedReview[]>(
    `/reviews/getReviewsByReviewee/${store}`,
    {
      withCredentials: true,
    },
  );
}
