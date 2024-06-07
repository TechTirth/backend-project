import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // enables searching field, now you can enable searching
      // username
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    avatar: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Encrypting the password before saving it.
// can't use arrow func as we want to use this keyword
// to access above objects of the schema. 
userSchema.pre("save", async function(next){
    // so problem here was if we change anything in the db 
    // the userSchema.pre() would run everlytime so we are
    // putting a check that only when the password is modified then only
    // run the userSchema.pre()
    // since it is a middleware we are returing the next() function
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10) // 10 hash rounds 
    next()
}) 

// Decryption
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// Tokens
userSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema);
