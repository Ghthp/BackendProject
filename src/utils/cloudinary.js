import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // file system manager

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;    //return null if the file is not found

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"   // auto automatically assigns the file type. img-> img, vid-> vid, pdf-> raw
        });

        console.log("File has been uploaded successfully ", response.url);

        return response;
        
    } catch (error) {
        if (fs.existsSync(localFilePath)) {  // checks if the file to be deleted exists.
            fs.unlinkSync(localFilePath);   // deletes the locally stored file when the upload to cloudinary fails.
        }  // unlinkSync is synchronous i.e. it blocks the process until the file is deleted. Bad for handling multiple users.
        console.error("Cloudinary upload failed:", error);
        
        return null;
    }
};


export {uploadOnCloudinary};