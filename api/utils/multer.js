import expressAsyncHandler from "express-async-handler"
import multer from "multer"
import sharp from 'sharp';
import fs from "fs"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp/images/users')
    },
    filename: function (req, file, cb) {
        console.log()
        cb(null, file.originalname.split(" ").join(""))
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("Not an image! Please upload only images."))
    }
}

export const upload = multer({ storage, fileFilter: multerFilter })

export const resizeUserPhoto = expressAsyncHandler(async (req, res, next) => {
    if (!req.file) {
        // Set a default image buffer and filename
        req.file = {
            buffer: fs.readFileSync('public/temp/images/users/default.jpeg'), // Provide the path to your default image
            originalname: 'default.jpeg',
            mimetype: 'image/jpeg',
        };
    }
    req.file.filename = `user-${req.user.userId}-${Date.now()}-jpeg`

    await sharp(req.file.buffer).resize(500, 500).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`Public/temp/users/images/${req.file.filename}`)
})