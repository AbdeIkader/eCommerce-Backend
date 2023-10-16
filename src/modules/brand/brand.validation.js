import Joi from "joi";

const addBrandValidation = Joi.object({
  name: Joi.string().required().trim(),
});

const updateBrandValidation = Joi.object({
  name: Joi.string().required().trim(),
  id: Joi.string().hex().length(24).required(),
});

const deleteBrandValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export { addBrandValidation, updateBrandValidation, deleteBrandValidation };
