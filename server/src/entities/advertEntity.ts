import { Offer } from './offerEntity';
import { Review } from './reviewEntity';
import { User } from './userEntity';

export enum AdvertType {
  Sell,
  Ask,
}

export enum AdvertStatus {
  Ongoing,
  Closed,
  Deleted,
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

export interface Advert {
  id: string;
  productname: string;
  description: string;
  imageurl?: string;
  prioritized: boolean;
  color: string;
  expirationDate: Date;
  purchaseDate: Date;
  quantity: number;
  price: number;
  date: Date;
  advertStatus: string;
  type: string;
  category: string;
  offers?: Offer[];
  reviews?: Review[];
  store: User;
}
