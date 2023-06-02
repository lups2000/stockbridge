export enum ADVERT_TYPE {
    SELL,
    ASK
}

export enum ADVERT_STATUS {
    ONGOING,
    CLOSED,
    DELETED
}

export enum PRODUCT_CATEGORY {
    Apparel_And_Accessories,
    Electronics_And_Gadgets,
    Home_And_Kitchen,
    Furniture_And_Decor,
    Health_And_Beauty,
    Sports_And_Fitness,
    Books_And_Media,
    Toys_And_Games,
    Automotive_Parts,
    Food_And_Beverages,
    Office_Supplies,
    Tools_And_Hardware,
    Pet_Supplies,
    Babies_And_Kids_Products,
    Jewelry_And_Accessories,
    Gardening_Supplies,
    Art_And_Craft_Supplies,
    Musical_Instruments,
    Travel_And_Luggage,
    Flowers_And_Bouquets
}


export interface Advert {
    id: string;
    title: string;
    prioritized: boolean;
    quantity: number;
    description: string;
    price: number;
    expirationDate: Date;
    status: ADVERT_STATUS;
    advertType: ADVERT_TYPE,
    category: PRODUCT_CATEGORY;
    offers: string[];
}
