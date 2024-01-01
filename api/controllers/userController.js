import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModel.js"

export const getAllUser = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find()
    res.status(200).json({ status: "success", result: users.length, data: users })
})

export const updateMe = expressAsyncHandler(async (req, res, next) => {
    const updatedUser = await userModel.findByIdAndUpdate(req.user.userId, { $set: { profileImage: req.file.filename, ...req.body } }, { new: true })

    if (!updatedUser) return next(new Error("Please login first ."))
    console.log(updatedUser)

    res.status(200).json({ status: "success", message: "Your profile has been updated successfully", data: updatedUser })
})

export const getMe = expressAsyncHandler(async (req, res, next) => {
    const existUser = await userModel.findById(req.user.userId)

    if (!existUser) return next(new Error("Please Login"))

    res.status(200).json({ status: "success", message: "Your profile has been displayed successfully", data: existUser })
})

export const getSingleUser = expressAsyncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.user.userId)

    if (!user) return next(new Error("Please enter valid user Id"))

    res.status(200).json({ status: "success", message: "User profile has been displayed successfully", data: existUser })
})

export const deleteSingleUser = expressAsyncHandler(async (req, res, next) => {

    const user = await userModel.findByIdAndDelete(req.user.userId)

    if (!user) return next(new Error("Please enter valid user Id"))

    res.status(200).json({ status: "success", message: "User profile has been deleted successfully", data: existUser })
})