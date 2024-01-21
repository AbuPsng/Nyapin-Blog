import express from "express"
import cors from "cors"
import { createBlog, deleteBlog, getAllBlog, getMyBlogs, getSingleBlog, searchByTerm, sortBlogs, updateBlog } from "../controllers/blogController.js"
import { isSignIn } from "../utils/authentication.js"
import { isAuthor } from "../utils/isAuthor.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

router.use(cors({
    credentials: true,
    origin: "https://nyapin-blog.vercel.app/"
}))

router.get("/", getAllBlog)
router.get("/search", searchByTerm)
router.get("/sorted", sortBlogs)

router.get("/my_blogs", isSignIn, getMyBlogs)

router.post("/create_blog", isSignIn, upload.single("file"), createBlog)

router.route("/:blogId").get(isSignIn, getSingleBlog).patch(isSignIn, isAuthor, upload.single("file"), updateBlog).delete(isSignIn, isAuthor, deleteBlog)



export default router