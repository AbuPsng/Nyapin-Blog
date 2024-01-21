import express from "express"
import { getAllUser, deleteSingleUser, getSingleUser, updateSingleUser } from "../controllers/adminController.js"
import { isSignIn } from "../utils/authentication.js"
import { upload } from "../utils/multer.js"
import { isAdmin } from "../utils/isAuthor.js"

const router = express.Router()

router.route("/").get(isSignIn, getAllUser)
router.route("/:userId").get(isSignIn, isAdmin, getSingleUser).patch(isSignIn, isAdmin, updateSingleUser).delete(isSignIn, isAdmin, deleteSingleUser)

export default router