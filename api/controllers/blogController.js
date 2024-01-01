import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import { isExist, isNotExist } from "../utils/checkExist.js"

//*** Get all blogs */

export const getAllBlog = asyncHandler(async (req, res, next) => {

    const blogs = await blogModel.find()

    if (!blogs) return res.status(404).json({ status: "success", message: "No blogs to shows" })

    res.status(200).json({ status: "success", results: blogs.length, message: "All blogs displayed successfully", data: blogs })
})

//*** Get all my blog */

export const getMyBlogs = asyncHandler(async (req, res, next) => {
    console.log(req.user.userId)

    const blogs = await blogModel.find({ author: req.user.userId })

    if (!blogs) return res.status(404).json({ status: "success", message: "No blogs to shows" })

    res.status(200).json({ status: "success", results: blogs.length, message: "All blogs displayed successfully", data: blogs })
})

// ***** Get Single Blog/*

export const getSingleBlog = asyncHandler(async (req, res, next) => {

    const blog = await blogModel.findById(req.params.blogId).populate({
        path: "author", select: "name email"
    }).populate({ path: "review", select: " -updatedAt" })

    if (!blog) return res.status(404).json({ status: "success", message: "No blog to shows" })

    res.status(200).json({ status: "success", message: "Blog displayed successfully", data: blog })
})

//*******Create blog */ 

export const createBlog = asyncHandler(async (req, res, next) => {

    const { title, description, genre } = req.body

    isExist(res, title, "title")
    isExist(res, description, " description")
    isExist(res, genre, "genre")

    const existBlog = await blogModel.findOne({ title })

    isNotExist(res, existBlog, "Blog with this name is already exist")

    const newBlog = await blogModel.create({ title, description, genre, author: req.user.userId })

    res.status(200).json({ status: "success", message: "Blog created successfully", data: newBlog })
})

//******* Update blog */

export const updateBlog = asyncHandler(async (req, res, next) => {


    const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId, req.body, { new: true })

    res.status(200).json({ status: "success", message: "Blog updated successfully", data: updatedBlog })
})


//*** Delete blog */

export const deleteBlog = asyncHandler(async (req, res, next) => {

    const deleteBlog = await blogModel.findByIdAndDelete(req.params.blogId)

    if (!deleteBlog) return res.status(200).json({ status: "error", message: "Blog not exist or already has been deleted", data: deleteBlog })

    res.status(200).json({ status: "success", message: "Blog deleted successfully", data: deleteBlog })
})