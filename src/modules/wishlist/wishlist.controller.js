import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { userModel } from "../../../Database/models/user.model.js";

const addToWishList = catchAsyncError(async (req, res, next) => {
  const { productId } = req.body;

  const addToWishList = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: productId } },
    {
      new: true,
    }
  );

  addToWishList &&
    res
      .status(201)
      .json({ message: "success", addToWishList: addToWishList.wishlist });

  !addToWishList && next(new AppError("WishList was not found", 404));
});

const removeFromWishList = catchAsyncError(async (req, res, next) => {
  const { productId } = req.body;

  const removeFromWishList = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: productId } },
    {
      new: true,
    }
  );

  removeFromWishList &&
    res
      .status(201)
      .json({
        message: "success",
        removeFromWishList: removeFromWishList.wishlist,
      });

  !removeFromWishList && next(new AppError("WishList was not found", 404));
});

const getAllUserWishList = catchAsyncError(async (req, res, next) => {
  const getAllUserWishList = await userModel
    .findOne({ _id: req.user._id })
    .populate("wishlist");

  getAllUserWishList &&
    res
      .status(201)
      .json({
        message: "success",
        getAllUserWishList: getAllUserWishList.wishlist,
      });

  !getAllUserWishList && next(new AppError("WishList was not found", 404));
});

export { addToWishList, removeFromWishList, getAllUserWishList };
