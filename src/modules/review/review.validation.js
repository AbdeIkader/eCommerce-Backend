import Joi from "joi";

const addReviewValidation = Joi.object({
  text: Joi.string().trim().required(),
  productId: Joi.string().hex().length(24).required(),
  rate: Joi.number().default(1),
});

const getSpecificReviewValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateReviewValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
  text: Joi.string().trim(),
  rate: Joi.number(),
});

const deleteReviewValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  addReviewValidation,
  getSpecificReviewValidation,
  updateReviewValidation,
  deleteReviewValidation,
};
