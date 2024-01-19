import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import { isExist, isNotExist } from "../utils/checkExist.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

//*** Get all blogs */

export const getAllBlog = asyncHandler(async (req, res, next) => {
    const blogs = await blogModel.find()

    if (!blogs) return res.status(404).json({ status: "success", message: "No blogs to shows" })

    res.status(200).json({ status: "success", results: blogs.length, message: "All blogs displayed successfully", data: blogs })
})

//*** Get all my blog */

export const getMyBlogs = asyncHandler(async (req, res, next) => {

    const blogs = await blogModel.find({ author: req.user.userId })

    if (!blogs) return res.status(404).json({ status: "success", message: "No blogs to shows" })

    res.status(200).json({ status: "success", results: blogs.length, message: "All blogs displayed successfully", data: blogs })
})

// ***** Get Single Blog/*

export const getSingleBlog = asyncHandler(async (req, res, next) => {

    const blog = await blogModel.findById(req.params.blogId).populate({
        path: "author", select: "name email profileImage"
    }).populate({ path: "review", select: " -updatedAt" })

    if (!blog) return res.status(404).json({ status: "success", message: "No blog to shows" })

    res.status(200).json({ status: "success", message: "Blog displayed successfully", data: blog })
})

//*******Create blog */ 

export const createBlog = asyncHandler(async (req, res, next) => {

    const { title, description, genre } = req.body
    const newGenre = genre.split(",")

    isExist(res, title, "title")
    isExist(res, description, " description")
    isExist(res, genre, "genre")

    const existBlog = await blogModel.findOne({ title })

    if (existBlog) return res.status(405).json({ status: "error", message: "Blog with this name is already exist" })

    const blogCoverImageUrl = await uploadOnCloudinary(req.file?.path)

    const newBlog = await blogModel.create({ title, description, genre: newGenre, author: req.user.id, coverImage: blogCoverImageUrl })

    res.status(200).json({ status: "success", message: "Blog created successfully", data: newBlog })
})

//******* Update blog */

export const updateBlog = asyncHandler(async (req, res, next) => {

    const { title, description, genre } = req.body
    const newGenre = genre.split(",")

    if (req.file?.path) {
        const blogCoverImageUrl = await uploadOnCloudinary(req.file?.path)
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId, { title, description, genre: newGenre, coverImage: blogCoverImageUrl }, { new: true })
        return res.status(200).json({ status: "success", message: "Blog updated successfully", data: updatedBlog })
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId, { title, description, genre: newGenre }, { new: true })

    if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ status: "success", message: "Blog updated successfully", data: updatedBlog })
})


//*** Delete blog */

export const deleteBlog = asyncHandler(async (req, res, next) => {

    const deleteBlog = await blogModel.findByIdAndDelete(req.params.blogId)

    if (!deleteBlog) return res.status(200).json({ status: "error", message: "Blog not exist or already has been deleted", data: deleteBlog })

    res.status(200).json({ status: "success", message: "Blog deleted successfully", data: deleteBlog })
})

//** Search Blog by term */

export const searchByTerm = asyncHandler(async (req, res, next) => {

    const searchTerm = req.query.searchTerm

    const searchedBlogs = await blogModel.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for the title
            { description: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for the description
        ],
    });

    if (!searchedBlogs) return res.status(404).json({ status: "success", message: "No blogs to shows" })

    res.status(200).json({ status: "success", results: searchedBlogs.length, message: "All blogs displayed successfully", data: searchedBlogs })
})

export const sortBlogs = asyncHandler(async (req, res) => {

    const { sortBy, order } = req.query

    console.log(req.query)

    const newOrder = +order

    const sortByQuery = {
        [sortBy]: newOrder
    }

    const sortedBlogs = await blogModel.find().sort(sortByQuery);
    console.log("sort", sortedBlogs)
    res.status(200).json({ status: "success", message: "Your Sort Blogs", data: sortedBlogs })

})