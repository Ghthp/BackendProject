
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        watchHistory: 
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        username: 
        {
            type: String, 
            required: true,
            lowercase: true,
            unique: true
        },
        email: 
        {
            type: String, 
            required: true,
            lowercase: true,
            unique: true
        },
        fullName: 
        {
            type: String, 
            required: true,
            lowercase: true
        },
        avatar: 
        {
            type: String,  //Cloudinary URL 
        },
        coverImage: 
        {
            type: String,  //Cloudinary URL 
        },
        password: 
        {
            // type: String, 
            required: true,
            lowercase: true,
            unique: true
        },
        refreshToken:
        {
            
        },
    }, 
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);

