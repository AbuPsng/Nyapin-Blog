import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        max: 10,
        required: [true, "Please enter your name"]
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 2 && value.length <= 6
            },
            message: "Blog must have genre under 3 to 6"
        }
    },
    images: {
        type: String
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

blogSchema.virtual("review", {
    ref: "Review",
    foreignField: "blog",
    localField: "_id"
})

const Blog = mongoose.model("Blog", blogSchema)
export default Blog