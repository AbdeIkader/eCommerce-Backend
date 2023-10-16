import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addBrandValidation,
  deleteBrandValidation,
  updateBrandValidation,
} from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(addBrandValidation),
    brand.addBrand
  )
  .get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateBrandValidation),
    brand.updateBrand
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteBrandValidation),
    brand.deleteBrand
  );

export default brandRouter;
