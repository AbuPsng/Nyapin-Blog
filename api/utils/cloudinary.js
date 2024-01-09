import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
import fs from "fs"

dotenv.config({ path: ".env" })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        const default_Image = "public/default/default_images.jpg"
        //**upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath || default_Image, {
            resource_type: "auto"
        })
        console.log(`file is upload and its url is ${response.url}`)
        if (localFilePath) fs.unlinkSync(localFilePath)
        return response.url
    } catch (error) {
        // if(there is an error then it will deleted using unlinkSync)
        if (localFilePath) fs.unlinkSync(localFilePath)
        return error
    }
}