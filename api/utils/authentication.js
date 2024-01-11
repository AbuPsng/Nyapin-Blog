import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { generateToken } from './generateToken.js'

export const isSignIn = expressAsyncHandler(async (req, res, next) => {
    console.log("hero", req.cookies)
    // console.log(req)
    const token = req.cookies["blog"]
    console.log(token)

    if (!token) throw new Error("Token does not exist. Please login")

    const decode = jwt.verify(token, process.env.JWT_TOKEN,)
    req.user = decode
    next()
})

export const test = (req, res) => {
    generateToken(res, 3)
    res.send("message")
}