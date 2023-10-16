import express from "express";
import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addProductToCartValidation, removeProductFromCart } from "./cart.validation.js";
import * as cart from "../cart/cart.controller.js"
const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    cart.addProductToCart
  ).get(
    protectedRoutes,
    allowedTo("user"),
    cart.getLoggedUserCart
  )
  cartRouter
  .route("/apply-coupon")
  .post(
    protectedRoutes,
    allowedTo("user"),
    cart.applyCoupon
  )

cartRouter
  .route("/:id")
  .delete(
    protectedRoutes,
    allowedTo("user"),
    cart.removeProductFromCart
  )
  .put(
    protectedRoutes,
    allowedTo("user"),
    cart.updateProductQuantity
  );

export default cartRouter;
