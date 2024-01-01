import express from "express"
import { sign_in, sign_up, update_password } from "../controllers/authController.js"
import { isSignIn } from "../utils/authentication.js"


const router = express.Router()

router.post("/sign_up", sign_up)

router.post("/sign_in", sign_in)

router.post("/update_password", isSignIn, update_password)


export default router