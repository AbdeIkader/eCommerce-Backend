import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../Database/models/cart.model.js";
import { productModel } from "../../../Database/models/product.model.js";
import { orderModel } from "../../../Database/models/order.model.js";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NyJGHKigR3f9MS7eTSPzLdqcXn5m52JE6JHdMNDvA6eXyhCoJwhxfObrkgyano5EepvvxkvH1oIn64lxEcAULtI009cJBLA7z');


const createCashOrder = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  // console.log(cart);
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

    console.log(cart.cartItem);
  const order = new orderModel({
    userId: req.user._id,
    cartItem: cart.cartItem,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();

  // console.log(order);
  if (order) {
    let options = cart.cartItem.map(item=> ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(options);

    await cartModel.findByIdAndDelete(req.params.id);

    return res.status(201).json({message:"success",order})
  }else{
    next(new AppError("Error in cart ID",404))
  }

  
});

const getSpecificOrder = catchAsyncError(async (req, res, next) => {

  console.log(req.user._id);

  let order = await orderModel.findOne({ userId: req.user._id }).populate('cartItems.productId')

  res.status(200).json({message:"success",order})

});

const getAllOrders = catchAsyncError(async (req, res, next) => {

  let orders = await orderModel.findOne({}).populate('cartItems.productId')

  res.status(200).json({message:"success",orders})

});

const createCheckOutSession = catchAsyncError(async (req, res, next) => {

  let cart = await cartModel.findById(req.params.id);

  // console.log(cart);
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;


 let sessions = await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:'egp',
          unit_amount: totalOrderPrice * 100,
          product_data:{
            name:req.user.name,
          }
        },
        quantity:1
      }
    ],
    mode:'payment',
    success_url:'https://github.com/AbdeIkader',
    cancel_url:'https://www.linkedin.com/in/abdelrahman-abdelkader-259781215/',
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress
 })

 res.json({message:"success",sessions})
});

export {createCashOrder,getSpecificOrder,getAllOrders,createCheckOutSession};
