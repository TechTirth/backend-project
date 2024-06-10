import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const {username, fullName, email, password} = req.body;
    console.log(email);


    // validation - not empty
    if(fullName === ""){
        throw new ApiError(400,"fullname is required")
    }
    if(username === ""){
        throw new ApiError(400,"username is required")
    }
    if(email === ""){
        throw new ApiError(400,"email is required")
    }
    if(password === ""){
        throw new ApiError(400,"password is required")
    }


    // check if user already exist: unique username or email
    // firstly we imported User model from the user.model.js file
    // it has method called findOne() --> return the first equal value.

    const existedUser = User.findOne({
        // you can use operators with the help of dollar sign
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409,"User already exists with the same username or email")
    }

    

    // check for images and avatar

    //given by multer, what it does? --> just like res.body
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = re.files?.coverImage[0]?.path
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }


    // ulpoad them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar is required") 
    }


    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        //if coveer image is present take out the ur else pass empty string
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // check for user creation and removing password and refresh token field 
    // from the response
    const createdUser = await User.findById(user._id).select(
        "-pasword -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Registering User failed")
    }

    
    // return response
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucessfully")
    )

    

})

export {registerUser}

