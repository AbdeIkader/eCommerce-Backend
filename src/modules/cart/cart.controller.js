import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "./../../../Database/models/cart.model.js";
import { productModel } from "../../../Database/models/product.model.js";
import { couponModel } from "./../../../Database/models/coupon.model.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItem.forEach((element) => {
    totalPrice += element.quantity * element.price;
  });

  cart.totalPrice = totalPrice;
}

const addProductToCart = catchAsyncError(async (req, res, next) => {
  let productId = await productModel
    .findById(req.body.productId)
    .select("price");
  if (!productId) return next(new AppError("Product was not found", 404));
  req.body.price = productId.price;
  let isCartExist = await cartModel.findOne({
    userId: req.user._id,
  });

  if (!isCartExist) {
    let result = new cartModel({
      userId: req.user._id,
      cartItem: [req.body],
    });
    calcTotalPrice(result);
    await result.save();
    return res.status(201).json({ message: "success", result });
  }
  console.log(isCartExist.cartItem);

  let item = isCartExist.cartItem.find((element) => {
    return element.productId == req.body.productId;
  });
  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCartExist.cartItem.push(req.body);
  }
  calcTotalPrice(isCartExist);

  if (isCartExist.discount) {
    isCartExist.totalPriceAfterDiscount =
      isCartExist.totalPrice -
      (isCartExist.totalPrice * isCartExist.discount) / 100;
  }
  await isCartExist.save();
  res.status(201).json({ message: "success", result: isCartExist });
});

const removeProductFromCart = catchAsyncError(async (req, res, next) => {
  let result = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { cartItem: { _id: req.params.id } } },
    { new: true }
  );
  !result && next(new AppError("Item was not found"), 404);
  calcTotalPrice(result);
  if (result.discount) {
    result.totalPriceAfterDiscount =
      result.totalPrice - (result.totalPrice * result.discount) / 100;
  }
  result && res.status(200).json({ message: "success", cart: result });
});

const updateProductQuantity = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) return next(new AppError("Product was not found"), 404);

  let isCartExist = await cartModel.findOne({ userId: req.user._id });

  let item = isCartExist.cartItem.find((elm) => elm.productId == req.params.id);
  if (item) {
    item.quantity = req.body.quantity;
  }
  calcTotalPrice(isCartExist);

  if (isCartExist.discount) {
    isCartExist.totalPriceAfterDiscount =
      isCartExist.totalPrice -
      (isCartExist.totalPrice * isCartExist.discount) / 100;
  }
  await isCartExist.save();

  res.status(201).json({ message: "success", cart: isCartExist });
});

const applyCoupon = catchAsyncError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
    expires: { $gt: Date.now() },
  });

  let cart = await cartModel.findOne({ userId: req.user._id });

  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;

  cart.discount = coupon.discount;

  await cart.save();

  res.status(201).json({ message: "success", cart });
});

const getLoggedUserCart = catchAsyncError(async (req,res,next)=>{

  let cartItems = await cartModel.findOne({userId:req.user._id}).populate('cartItem.productId')

  res.status(200).json({message:"success",cart : cartItems})
})

export {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  applyCoupon,
  getLoggedUserCart
};
