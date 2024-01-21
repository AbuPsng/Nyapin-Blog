import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModel.js"

export const getAllUser = expressAsyncHandler(async (req, res, next) => {
    const users = await userModel.find()

    if (!users.length > 0) return next(new Error("No users found"))

    res.status(200).json({ status: "success", result: users.length, data: users })
})

export const getSingleUser = expressAsyncHandler(async (req, res, next) => {

    const userId = req.params.userId

    const user = await userModel.findById(userId)

    if (!user) return next(new Error("No user found"))

    res.status(200).json({ status: "success", message: "User profile has been displayed successfully", data: user })
})

export const updateSingleUser = expressAsyncHandler(async (req, res, next) => {

    const userId = req.params.userId

    const user = await userModel.findByIdAndUpdate(userId, req.body)

    if (!user) return next(new Error("Please enter valid user Id"))

    res.status(200).json({ status: "success", message: "User profile has been displayed successfully", data: existUser })
})

export const deleteSingleUser = expressAsyncHandler(async (req, res, next) => {

    const userId = req.params.userId

    console.log(req.params)

    const user = await userModel.findByIdAndDelete(userId)

    if (!user) return next(new Error("No user found"))

    res.status(200).json({ status: "success", message: "User profile has been deleted successfully", data: user })
})