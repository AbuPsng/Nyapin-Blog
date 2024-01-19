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
    console.log(req.user.userId)

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

    console.log(req.file?.path)

    if (req.file?.path) {
        const blogCoverImageUrl = await uploadOnCloudinary(req.file?.path)
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId, { title, description, genre: newGenre, coverImage: blogCoverImageUrl }, { new: true })
        return res.status(200).json({ status: "success", message: "Blog updated successfully", data: updatedBlog })
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(req.params.blogId, { title, description, genre: newGenre }, { new: true })

    if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    console.log("update blog", updatedBlog)

    res.status(200).json({ status: "success", message: "Blog updated successfully", data: updatedBlog })
})


//*** Delete blog */

export const deleteBlog = asyncHandler(async (req, res, next) => {

    const deleteBlog = await blogModel.findByIdAndDelete(req.params.blogId)

    if (!deleteBlog) return res.status(200).json({ status: "error", message: "Blog not exist or already has been deleted", data: deleteBlog })

    res.status(200).json({ status: "success", message: "Blog deleted successfully", data: deleteBlog })
})

//** Search Blog by term */

export const searchBlogByTitleOrDescription = asyncHandler(async (req, res) => {

    const searchTerm = req.query.term

    const query = {
        $or: [
            { title: { $regex: new RegExp(searchTerm, 'i') } },
            { description: { $regex: new RegExp(searchTerm, 'i') } }
        ]
    };

    const searchBlogs = await blogModel.find(query)
    console.log(searchBlogs)

    // const searchBlogs = await blogModel.find(req.query)
    res.status(200).json({ status: "success", message: "Your Search Blogs", data: searchBlogs })

})

export const sortBlogs = asyncHandler(async (req, res) => {
    const sortBlogs = await blogModel.find()

    console.log(sortBlogs)

    res.status(200).json({ status: "success", message: "Your Sort Blogs", data: sortBlogs })

})