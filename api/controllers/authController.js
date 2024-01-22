import userModel from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import { generateToken } from "../utils/generateToken.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


export const sign_up = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body

    const existUser = await userModel.findOne({ email })

    if (existUser) return res.status(409).json({ status: 'error', message: "User already exist" })

    const cloudinary_image = await uploadOnCloudinary(req.file?.path)

    const newUser = await userModel.create({ name, email, password, profileImage: cloudinary_image })

    res.status(200).json({ status: "success", message: "Account created successfully", data: true })
})

export const sign_in = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const existUser = await userModel.findOne({ email }).select("+password")

    if (!existUser) return res.status(404).json({ status: 'error', message: "User dose not exist" })

    const matchPassword = await existUser.matchPassword(password, existUser.password)

    if (!matchPassword) return res.status(401).json({ status: "error", message: "Either email or password is wrong" })

    const token = generateToken(res, existUser._id)

    console.log(res.cookie, "before")

    res.cookie('blog', token, {
        httpOnly: true,
        sameSite: "None",
        secure: true
    }).status(202).json({
        status: "success", message: "Logged in successfully", data: {
            name: existUser.name,
            email: existUser.email,
            userId: existUser._id,
            profileImage: existUser.profileImage,
            phone: existUser.phone,
            address: existUser.address,
        }
    })
})
console.log(res.cookie, "after")

export const update_password = asyncHandler(async (req, res, next) => {
    const { password, newPassword } = req.body

    const existUser = await userModel.findOne({ _id: req.user.userId }).select("+password")

    if (!existUser) return res.status(404).json({ status: 'error', message: "You are not logged in" })

    const matchPassword = await existUser.matchPassword(password, existUser.password)

    if (!matchPassword) return res.status(401).json({ status: "error", message: "Wrong password" })

    existUser.password = newPassword
    await existUser.save()

    generateToken(res, existUser._id)

    res.status(200).json({ status: "success", message: "Password updated successfully", data: existUser })
}
)

export const sign_out = asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "loggedOut", { expires: new Date(Date.now() + 100), httpOnly: true })
    res.status(200).json({ status: "success" })
})