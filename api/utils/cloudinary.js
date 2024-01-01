import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
    api_key: process.env.CLOUDINRAY_CLOUD_API,
    api_secret: process.env.CLOUDINRAY_CLOUD_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //Upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully

        console.log("file is uploaded on cloudinary", response.url)
        return response

    } catch (error) {
        // remove the locally saved temporary file as the uploading operation got failed
        fs.unlinkSync(localFilePath)
    }
}


cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) { console.log(result); });