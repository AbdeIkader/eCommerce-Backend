import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../../handlers/factor.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { reviewModel } from "./../../../Database/models/review.model.js";

const addReview = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user._id;
  let isReviewed = await reviewModel.findOne({
    userId: req.user._id, //fe 7etet en el product law 8ayrt el id bta3oh le ay product tany
    //me4 mawgood hay4ta8l bardo w da me4 sa7
    productId: req.body.productId,
  });
  if (isReviewed) return next(new AppError("You created a review before", 409));
  const addReview = new reviewModel(req.body);
  await addReview.save();

  res.status(201).json({ message: "success", addReview });
});

const getAllReviews = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(reviewModel.find(), req.query)
    .pagination()
    .fields()
    .filteration()
    .search()
    .sort();
  const PAGE_NUMBER = apiFeature.queryString.page * 1 || 1;
  const getAllReviews = await apiFeature.mongooseQuery;
  res
    .status(201)
    .json({ page: PAGE_NUMBER, message: "success", getAllReviews });
});

const getSpecificReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);

  let result = await reviewModel.findById(id);

  !result && next(new AppError("Reveiw was not found", 404));
  result && res.status(200).json({ message: "success", result });
});

const updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log({ user: req.user._id });
  const updateReview = await reviewModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  console.log(updateReview);

  updateReview && res.status(201).json({ message: "success", updateReview });

  !updateReview &&
    next(
      new AppError(
        "Review was not found or you're not authorized to review this project",
        404
      )
    );
});

const deleteReview = deleteOne(reviewModel, "Review");
export {
  addReview,
  getAllReviews,
  getSpecificReview,
  updateReview,
  deleteReview,
};
