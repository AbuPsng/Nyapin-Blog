import express from "express"
import { sign_in, sign_out, sign_up, update_password } from "../controllers/authController.js"
import { isSignIn } from "../utils/authentication.js"
import { upload } from "../utils/multer.js"
import cors from "cors"

const router = express.Router()

router.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

router.post("/sign_up", upload.single("file"), sign_up)

router.post("/sign_in", sign_in)

router.get("/sign_out", sign_out)

router.post("/update_password", isSignIn, update_password)


export default router