import reviewModel from "../models/reviewModel.js"
import asyncHandler from "express-async-handler"

//*** Get all Reviews Of a single blog */

export const getAllReview = asyncHandler(async (req, res, next) => {

    const Review = await reviewModel.find({ blog: req.params.blogId }).populate({
        path: "user", select: "name profileImage"
    })

    if (!Review) return res.status(404).json({ status: "success", message: "No Review to shows" })

    res.status(200).json({ status: "success", result: Review.length, message: "Review displayed successfully", data: Review, })
})

//*******Create Review */ 

export const createReview = asyncHandler(async (req, res, next) => {

    const { review } = req.body
    const { blogId } = req.params
    const userId = req.user.id

    const newReview = await reviewModel.create({ review, blog: blogId, user: userId })

    res.status(200).json({ status: "success", message: "Review created successfully", data: newReview })
})

//******* Update Review */

export const updateReview = asyncHandler(async (req, res, next) => {

    const updatedReview = await reviewModel.findByIdAndUpdate(req.params.reviewId, req.body, { new: true })

    if (!updatedReview) {
        return res.status(404).json({ status: "error", message: "Review not found with the provided ID" });
    }

    res.status(200).json({ status: "success", message: "Review updated successfully", data: updatedReview })
})

//*** Delete Review */

export const deleteReview = asyncHandler(async (req, res, next) => {
    const deleteReview = await reviewModel.findByIdAndDelete(req.params.reviewId)

    if (!deleteReview) return res.status(200).json({ status: "error", message: "Review not exist or already has been deleted", data: deleteReview })

    res.status(200).json({ status: "success", message: "Review deleted successfully", data: deleteReview })
})