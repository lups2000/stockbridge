import { ApiClient } from '../apiClient';
import { Offer } from './offer';
import { Review } from './review';
import { User } from './user';

export enum AdvertType {
  Sell,
  Ask,
}

export enum AdvertStatus {
  Ongoing = 'Ongoing',
  Closed = 'Closed',
  Deleted = 'Deleted',
}
export enum Colors {
  Blue = 'Blue',
  Red = 'Red',
  Yellow = 'Yellow',
  Green = 'Green',
}

export enum ProductCategory {
  Apparel_And_Accessories = 'Apparel And Accessories',
  Electronics_And_Gadgets = 'Electronics And Gadgets',
  Home_And_Kitchen = 'Home And Kitchen',
  Furniture_And_Decor = 'Furniture And Decor',
  Health_And_Beauty = 'Health And Beauty',
  Sports_And_Fitness = 'Sports And Fitness',
  Books_And_Media = 'Books And Media',
  Toys_And_Games = 'Toys And Games',
  Automotive_Parts = 'Automotive Parts',
  Food_And_Beverages = 'Food And Beverages',
  Office_Supplies = 'Office Supplies',
  Tools_And_Hardware = 'Tools And Hardware',
  Pet_Supplies = 'Pet Supplies',
  Babies_And_Kids_Products = 'Babies And Kids Products',
  Jewelry_And_Accessories = 'Jewelry And Accessories',
  Gardening_Supplies = 'Gardening Supplies',
  Art_And_Craft_Supplies = 'Art And Craft Supplies',
  Musical_Instruments = 'Musical Instruments',
  Travel_And_Luggage = 'Travel And Luggage',
  Flowers_And_Bouquets = 'Flowers And Bouquets',
}

export interface AdvertDto {
  results?: PopulatedAdvert[];
  totalNumberOfPages?: number;
  pagination?: Pagination;
}

export interface CategoryDto {
  categories: {
    _id: string;
    count: number;
  }[];
}

interface Pagination {
  next?: {
    page: number;
    limit: number;
  };
  prev?: {
    page: number;
    limit: number;
  };
}

export interface Advert {
  _id?: string;
  productname?: string;
  prioritized?: boolean;
  quantity?: number;
  description?: string;
  price?: number;
  expirationDate?: Date;
  purchaseDate?: Date;
  status?: string;
  type?: string;
  category?: string;
  offers?: string[];
  store?: string;
  reviews?: string[];
  imageurl?: string;
  color?: string;
  createdAt?: Date;
}

export interface PopulatedAdvert {
  _id?: string;
  productname?: string;
  prioritized?: boolean;
  quantity?: number;
  description?: string;
  price?: number;
  expirationDate?: Date;
  purchaseDate?: Date;
  status?: string;
  type?: string;
  category?: string;
  offers?: Offer[];
  store?: User;
  reviews?: Review[];
  imageurl?: string;
  color?: string;
  createdAt?: Date;
}

const apiClient = new ApiClient();

export async function getAdvert(id: string): Promise<PopulatedAdvert> {
  return await apiClient.get<PopulatedAdvert>(`/adverts/${id}`, {
    withCredentials: true,
  });
}

export async function getCategoriesByStore(
  store: string,
): Promise<ProductCategory[]> {
  return await apiClient.get<ProductCategory[]>(
    `/adverts/getCategoriesByStore/${store}`,
    {
      withCredentials: true,
    },
  );
}

export async function createAdvert(advert: Advert): Promise<Advert> {
  return await apiClient.post<Advert>(`/adverts/`, advert, {
    withCredentials: true,
  });
}

export async function updateAdvert(
  id: string,
  advert: Advert,
): Promise<Advert> {
  return await apiClient.put<Advert>(`/adverts/${id}`, advert, {
    withCredentials: true,
  });
}

export async function deleteAdvert(id: string): Promise<void> {
  return await apiClient.delete<void>(`/adverts/${id}`, {
    withCredentials: true,
  });
}

export async function getAdvertsByUser(
  store: string | undefined,
): Promise<Advert[]> {
  return await apiClient.get<Advert[]>(`/adverts/getAdvertsByStore/${store}`, {
    withCredentials: true,
  });
}


export async function getAllAdverts(queryParams: any): Promise<AdvertDto> {
  return await apiClient.get<AdvertDto>(`/adverts`, {}, queryParams);
}

export async function getPopularCategories(): Promise<CategoryDto> {
  return await apiClient.get<CategoryDto>(`/adverts/getPopularCategories`);
}

export async function getPopularAdverts(): Promise<AdvertDto> {
  return await apiClient.get<AdvertDto>(`/adverts/getPopularAdverts`);
}

export async function prioritizeAdvert(advert: string): Promise<Advert> {
  return await apiClient.get<Advert>(`/adverts/prioritizeAdvert/${advert}`, {
    withCredentials: true
  })
}
