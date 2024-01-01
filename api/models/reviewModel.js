import mongoose, { Mongoose } from "mongoose"

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review must not be empty"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog",
        required: true
    }
}, {
    timestamps: true,
})

reviewSchema.index({ user: 1, blog: 1 }, { unique: true })



const Review = mongoose.model("Review", reviewSchema)
export default Review