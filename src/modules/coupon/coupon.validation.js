import Joi from "joi";

const createCouponValidation = Joi.object({
  code: Joi.string().required().trim(),
  expires: Joi.date().required(),
  discount: Joi.number().required().min(0),
});

const getSpecificCouponValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCouponValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().trim(),
  expires: Joi.date(),
  discount: Joi.number().min(0),
});

const deleteCouponValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export {
  createCouponValidation,
  getSpecificCouponValidation,
  updateCouponValidation,
  deleteCouponValidation,
};
