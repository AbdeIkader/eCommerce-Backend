import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "product",
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(['find','findOne'],function (){
  this.populate('userId','name -_id')
})

export const reviewModel = model("review", reviewSchema);
