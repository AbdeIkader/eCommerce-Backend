import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { userModel } from "../../../Database/models/user.model.js";

const addAddress = catchAsyncError(async (req, res, next) => {
  const addAddress = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    {
      new: true,
    }
  );

  addAddress &&
    res
      .status(201)
      .json({ message: "success", addAddress: addAddress.addresses });

  !addAddress && next(new AppError("Address was not found", 404));
});

const removeAddress = catchAsyncError(async (req, res, next) => {
  const removeAddress = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.body.address } } },
    {
      new: true,
    }
  );

  removeAddress &&
    res.status(201).json({
      message: "success",
      removeAddress: removeAddress.addresses,
    });

  !removeAddress && next(new AppError("Address was not found", 404));
});

const getAllAddresses = catchAsyncError(async (req, res, next) => {
  const getAllAddresses = await userModel.findOne({ _id: req.user._id });

  getAllAddresses &&
    res.status(201).json({
      message: "success",
      getAllAddresses: getAllAddresses.addresses,
    });

  !getAllAddresses && next(new AppError("WishList was not found", 404));
});

export { addAddress, removeAddress, getAllAddresses };
