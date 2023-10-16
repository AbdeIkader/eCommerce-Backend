import Joi from "joi";


const addToWishListValidation = Joi.object({

  productId: Joi.string().hex().length(24).required(),
});

const deleteFromWishListValidation = Joi.object({

  productId: Joi.string().hex().length(24).required(),
});


export { addToWishListValidation,deleteFromWishListValidation };
