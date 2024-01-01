import express from "express"
import mongoose from "mongoose"

export const app = express()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the database successfully")
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT} port...`)
        })
    } catch (error) {
        console.log("Unable to connect the database")
        console.log(error)
    }
}