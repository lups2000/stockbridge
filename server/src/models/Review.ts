import mongoose from "mongoose";
import { Review } from "../entities/reviewEntity";
import userModel from "./User";

const Types = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema<Review>({
    rating: {
        type: Types.Number,
        required: [true, "Please add a rating"],
        min: 1,
        max: 5
    },
    description: {
        type: Types.String,
        required: [false, "Please add a description"]
    },
    createdAt: {
        type: Types.Date,
        default: Date.now(),
        required: [false, "Please add a creation date"]
    },
    reviewer: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewee: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const reviewModel = mongoose.model('Review', reviewSchema, 'reviews');
export default reviewModel;
