import express from "express"
import { createBlog, deleteBlog, getAllBlog, getMyBlogs, getSingleBlog, updateBlog } from "../controllers/blogController.js"
import { isSignIn } from "../utils/authentication.js"
import { isAuthor } from "../utils/isAuthor.js"


const router = express.Router()

router.get("/", getAllBlog)

router.get("/my_blogs", isSignIn, getMyBlogs)

router.post("/create_blog", isSignIn, createBlog)

router.route("/:blogId").get(isSignIn, getSingleBlog).patch(isSignIn, isAuthor, updateBlog).delete(isSignIn, isAuthor, deleteBlog)

export default router