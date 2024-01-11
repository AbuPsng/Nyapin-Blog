import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"

import { app, connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import authRouter from "./routes/authRoutes.js"
import blogRouter from "./routes/blogRoutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import { test } from "./utils/authentication.js"
const router = express.Router()

dotenv.config()

connectDB()

//********** Global Middleware */
app.use(express.json())
app.use(cookieParser())

router.use(cors({
    credentials: true,
    origin: "http://localhost:5173/"
}))

app.use(express.static('public'));

// ******** Routes

app.use("/api/v1/", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/test", test)

app.get("/", (req, res) => {
    res.send("Hi how are you??")
})

//***** Global error handler */

app.use((err, req, res, next) => {
    console.log("global error")
    console.log(err)
    res.status(err.statusCode || 500).json({ status: 'error', error: `${err.message}` })
})