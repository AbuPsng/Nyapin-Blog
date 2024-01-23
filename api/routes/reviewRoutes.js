import express from "express"
import { createReview, deleteReview, getAllReview, updateReview } from "../controllers/reviewController.js"
import { isSignIn } from "../utils/authentication.js"
import { isCommenter } from "../utils/isAuthor.js"


const router = express.Router()

router.get("/:blogId", getAllReview)

router.post("/create_review/:blogId", isSignIn, createReview)

router.route("/:reviewId").patch(isSignIn, isCommenter, updateReview).delete(isSignIn, isCommenter, deleteReview)

export default router
