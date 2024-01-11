import jwt from "jsonwebtoken"

export const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, { expiresIn: "30d" })
    return token
};