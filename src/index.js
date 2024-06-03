//require('dotenv').config({path: './env'});  you want env vars to load at the start itself
import dotenv from "dotenv";
import connectDB from "./db/index.js"

dotenv.config({
    path: "./env" // see the changes in package.json files
})

connectDB()
.then(() => {
    
    app.on("error", (error) => {
        console.log("Error listening the App: ",error)
        throw error;
    })         // checking for error while listening the app

    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is liinstening on port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
})


//JUST ANOTHER WAY TO CONNECT DB P.S -> NOT INDUSTRY FRIENDLY
/*
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERRR: ",error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`The app is listening on ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

*/