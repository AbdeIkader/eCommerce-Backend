import Joi from "joi";

const addCategoryValidation = Joi.object({
  name: Joi.string().required().min(3).trim(),
  slug: Joi.string().lowercase(),
  Image: Joi.string(),
});

const updateCategoryValidation = Joi.object({
  name: Joi.string().min(3).trim(),
  id: Joi.string().hex().length(24).required(),
});

const deleteCategoryValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
};
