import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "user",
    },
    cartItem:[
      {
        productId:{type:Schema.ObjectId, ref : "product"},
        quantity:{
          type:Number,
          default:1
        },
        price:Number,
        totalProductDiscount:Number
      }
    ],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    discount:Number
  },
  {
    timestamps: true,
  }
);

export let cartModel = model("cart", cartSchema);
