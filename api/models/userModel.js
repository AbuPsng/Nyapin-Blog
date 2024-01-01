import mongoose from "mongoose";
import bcrypt from "bcrypt"
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 10,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
        validate: {
            validator: isEmail,
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        min: 6,
        required: true,
        select: false
    },
    phone: {
        type: Number,
        // required: true
    },
    profileImage: {
        type: String
    },
    address: {
        type: String,
        // required: true
    },
    role: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.matchPassword = async function (password, userPassword) {
    const matchPassword = await bcrypt.compare(password, userPassword)
    console.log(matchPassword)
    return matchPassword
}

const User = mongoose.model("User", userSchema)
export default User