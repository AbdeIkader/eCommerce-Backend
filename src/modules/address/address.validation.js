import Joi from "joi";

const addAddressValidation = Joi.object({
  city: Joi.string(),
  street:Joi.string(),
  phone:Joi.string()

});

const deleteAddressValidation = Joi.object({
  address:Joi.string().hex().length(24).required(),
});

export { addAddressValidation, deleteAddressValidation };
