import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"





const app=express();
app.use(cookieParser());
// app.use(express.json());
app.use(express.json({limit:"50kb"}))
app.use(express.urlencoded({extended:true,limit:"500kb"}))

// app.use(express.urlencoded({ extended: true })); // For form data


// app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,  // Allow cookies to be sent
}));




// app.use(cors())
//configuration wht to accept ,how much

// app.use(express.json({limit:"50kb"}))

//to accept from URL

//what type of folder,pdf,img to store local
//"public"--> in which folder to save 
app.use(express.static("public"))

//to store cookies in user browser which is helpful for server
// app.use(cookieParser());




import {userRoute} from "./routes/user.route.js"
app.use("/user",userRoute)


export {app}