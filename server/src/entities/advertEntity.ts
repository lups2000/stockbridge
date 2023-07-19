import { ObjectId } from 'mongodb';
import { Location } from './userEntity';

export enum AdvertType {
  Sell = 'Sell',
  Ask = 'Ask',
}

export enum AdvertStatus {
  Ongoing = 'Ongoing',
  Closed = 'Closed',
  Deleted = 'Deleted',
}

export interface Color {
  name?: string;
  hex?: string;
}
export enum Sizes {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export enum Options {
  YES = 'Yes',
  NO = 'No',
  UNKNOWN = 'Unknown',
}

export enum EnergyClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
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

  color: Color;
  size?: string;

  expirationDate: Date;
  purchaseDate: Date;
  quantity: number;
  price: number;
  createdAt: Date;
  status: string;
  type: string;
  category: string;
  offers?: ObjectId[];
  reviews?: ObjectId[];
  store: ObjectId;
  location: Location;
  fabric?: string;
  sustainable?: string;
  energyClass?: string;
  crueltyFree?: string;
  recyclable?: string;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  pages?: number;
  volume?: number;
  material?: string;
}
