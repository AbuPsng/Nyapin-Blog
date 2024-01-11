import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModel.js"

import blogModel from "../models/blogModel.js"
import reviewModel from "../models/reviewModel.js"


//** Checking if user is Admin */

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
    const user = req.user.userId

    const author = await userModel.findById(user)

    if (author.role !== 1) return next(new Error("You are not the owner"))

    next()

})

//** Checking if user is Admin of Is Author */


export const isAuthor = expressAsyncHandler(async (req, res, next) => {
    const { blogId } = req.params
    const user = req.user.id

    const author = await userModel.findById(user)
    console.log(author.role)

    const blog = await blogModel.findById(blogId)
    console.log(blog.author)
    console.log(user)

    if (blog.author.toString() !== user && author.role !== 1) return next(new Error("You are not the owner"))

    next()

})

//** Checking if user is Admin of Is Commenter */

export const isCommenter = expressAsyncHandler(async (req, res, next) => {
    const { reviewId } = req.params
    const user = req.user.userId

    const commenter = await userModel.findById(user)

    const review = await reviewModel.findById(reviewId)

    if (review.user.toString() !== user && commenter.role !== 1) return next(new Error("You are not the commenter"))

    next()

})

