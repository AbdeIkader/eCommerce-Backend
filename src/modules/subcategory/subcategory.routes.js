import express from "express";
import * as subCategory from "./subcategory.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addSubCategoryValidation,
  deleteSubCategoryValidation,
  updateSubCategoryValidation,
} from "./subcategory.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(addSubCategoryValidation),
    subCategory.addSubCategory
  )
  .get(subCategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(updateSubCategoryValidation),
    subCategory.updateSubCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin","user"),
    validate(deleteSubCategoryValidation),
    subCategory.deleteSubCategory
  );

export default subCategoryRouter;
