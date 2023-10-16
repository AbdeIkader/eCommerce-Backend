import express from "express";
// import { validate } from "../../middlewares/validate.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as order from "../order/order.controller.js"
const orderRouter = express.Router();



orderRouter
  .route("/:id")
  .post(
    protectedRoutes,
    allowedTo("user"),
    order.createCashOrder
  )
  orderRouter
  .route("/")
  .get(
    protectedRoutes,
    allowedTo("user"),
    order.getSpecificOrder
  )

  orderRouter.post('/checkOut/:id' ,protectedRoutes, allowedTo("user"),order.createCheckOutSession)

  orderRouter.get('/all',order.getAllOrders)
export default orderRouter;
