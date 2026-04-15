
import mongoose, {Schema} from "mongoose";

const videoSchema = new Schema(
    {
        owner: 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        videoFile: 
        {
            type: String, //Cloudinary URL
            required: true
        },
        thumbnail:
        {
            type: String, //Cloudinary URL
            required: true
        },
        title:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        duration:
        {
            type: Number,  //Cloudinary URL
            required: true
        },
        views:
        {
            type: Number,
            required: true,
            default: 0
        },
        isPublished:
        {
            type: Boolean,
            default: true
        },
    }, 
    {
        timestamps: true
    }
);

export const Video = mongoose.model("Video", videoSchema);

