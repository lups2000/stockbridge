import mongoose from "mongoose";
import { Offer, OfferStatus } from "../entities/offerEntity";

const Types = mongoose.Schema.Types;

export const offerSchema = new mongoose.Schema<Offer>({
    price: {
        type: Types.Number,
        required: [true, "Please add a price"]
    },
    quantity: {
        type: Types.Number,
        required: [true, "Please add a quantity"]
    },
    status: {
        default: OfferStatus.PENDING,
        enum: Object.values(OfferStatus),
        required: [true, "Please add a status"],
    },
    message: {
        type: Types.String
    },
    createdAt: {
        type: Types.Date,
        default: Date.now(),
        required: [false, "Please add a date"],
    },
    offeror: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    offeree: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    advert:{
        type: Types.ObjectId,
        ref: 'Advert',
        required: true
    }    
})

export const offerModel = mongoose.model('Offer', offerSchema, 'offers');
