import Joi from "joi";

const addProductToCartValidation = Joi.object({
  cartItem: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).default(1),
        price: Joi.number().min(0).required(),
        totalProductDiscount: Joi.number().min(0).required(),
      })
    )
    .min(1),
});

const removeProductFromCart = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});
export { addProductToCartValidation, removeProductFromCart };
