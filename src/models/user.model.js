import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            unique: true,
            trim: true, 
            index: true
        },
        email: 
        {
            type: String, 
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullName: 
        {
            type: String, 
            required: true,
            lowercase: true,
            trim: true,
            index: true
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
        },
        refreshToken:
        {
            
        },
    }, 
    {
        timestamps: true
    }
);
userSchema.pre("save", async function (next) {
    // Check if the password is modified. Only hash the password when it is modified.
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10);  // hash(current password, no. of rounds of encryption)
        next();
    } 
    else return next();
});

// create a custom method to check if password is correct 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//custom methods to generate refresh and access token
userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,      // Payload. Can just be _id
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    );
}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    );
}

export const User = mongoose.model("User", userSchema);

