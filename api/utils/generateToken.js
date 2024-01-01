import jwt from "jsonwebtoken"

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES })
    return res.cookie("jwt-nyapin", token, {
        httpOnly: true,
        sameSite: "strict"
    })
}