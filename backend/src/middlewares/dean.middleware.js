import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import {connectionSQL} from "../db/index.js";


export const verifyDean=asyncHandler(async (req,res,next)=>{

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // console.log(req.cookies)
    // console.log("Token:", token);
    
    if (!token) {
      throw new ApiError(401, "Unauthorized request: Token is missing");
    }
    
    try {
      const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
      const userM = await User.findById(decodedToken?._id).select("-password -refreshToken");

    console.log(userM.userId);
   

    //check user is present in sqll
    //   if (!user) {
    //     throw new ApiError(401, "Invalid access token: User not found");
    //   }
    //   if(user.role!="president"){
    //     throw new ApiError(402, "Invalid ...unauthorized user");

    // }
    const connection = await connectionSQL();
    const User_id=userM.userId
    
      // Query the database for the user
      const [rows] = await connection.execute(
        `SELECT Role FROM AppUser WHERE User_id = ?`,[User_id]
      );
      console.log(rows);
  
      if (rows.length === 0) {
        // User not found
        throw new ApiError(401, "Invalid access token: User not found");
      }
  
      const user = rows[0];
  
      // Check if the user's role is 'president'
      if (user.Role !== "Admin") {
        throw new ApiError(402, "Invalid ...unauthorized user");
      }
    
  




      req.user = userM;
      
      next();
    //   console.log(user);
    //   console.log("Dean authorized")
      // res.status(200).send("User authorized successfully");
    } catch (error) {
      console.log("Error:", error);
      throw new ApiError(401, "unauthorized token: " + error.message);
    }
    
})