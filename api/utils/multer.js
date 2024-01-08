import expressAsyncHandler from "express-async-handler"
import multer from "multer"
import sharp from 'sharp';
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        console.log()
        cb(null, file.originalname.split(" ").join(""))
    }
})


export const upload = multer({ storage })