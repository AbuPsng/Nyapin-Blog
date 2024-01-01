import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const isSignIn = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies["jwt-nyapin"]

    if (!token) throw new Error("Token does not exist. Please login")

    const decode = jwt.verify(token, process.env.JWT_TOKEN,)
    req.user = decode
    next()
})