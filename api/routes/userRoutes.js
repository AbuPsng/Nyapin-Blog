import express from "express"
import { getMe, updateMe } from "../controllers/userController.js"
import { isSignIn } from "../utils/authentication.js"
import { upload } from "../utils/multer.js"

const router = express.Router()

router.route("/me").get(isSignIn, getMe).patch(isSignIn, upload.single("profileImage"), updateMe)

export default router