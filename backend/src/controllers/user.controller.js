import {uploadOnCloudinary} from "../utils/cloudinary.js"

import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

import {User} from "../models/user.model.js"
import {connectionSQL} from "../db/index.js"
import mysql from 'mysql2/promise';

import bcrypt from "bcrypt"
import crypto from 'crypto'; // Built-in module

import nodemailer from "nodemailer";


const generateAccessAndRefreshToken=async (userId)=>{
    try{
        //server side these tokens are generated
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        //user.email like that
        //saving in the user database 
        user.refreshToken=refreshToken;
        //when saved without param password also should be validated  ..which we already used during login
        //no need of validation
        await user.save({validateBeforeSave:false})
        // console.log(accessToken,refreshToken);

        return {accessToken,refreshToken}





    }catch(error){
        throw new ApiError(500,"something went wrong while generating access token")
    }

}

const userRegister=asyncHandler(async (req,res)=>{
   


    const { UserId, email, fullName, Mname, Lname, year, branch, Phone_no, password, role,counsellorMailId} = req.body;

    const connection = await connectionSQL();

    try {

        if (!(UserId && email && fullName && year && branch && password && role)) {
            throw new ApiError(400, "Please enter all the fields");
        }
    
        // if (email.indexOf("@rvce.edu.in") === -1) {
        //     throw new ApiError(400, "Please enter the RVCE Gmail correctly");
        // }
        const [existingUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ? OR email = ?', [UserId, email]);
        if (existingUser.length > 0) {
            // Throw an ApiError with a custom message
            throw new ApiError(400, "User  already exists", [
                { field: "email", message: "This email and usn is already in use" }
            ]);
        }
        if (role === "Organizer" && password !== "admin") {
            throw new ApiError(409, "You are not a president and unauthorized",);
        }




        const createUser = (async (userId, password) => {
        
                const existingUsers = await User.find({userId});
                if(existingUsers>0){
                    throw new ApiError(400,"user already existm")
                }
                    // console.log(existingUsers);
                  const user = await User.create({
                    userId,    // Assigns the provided userId to the schema field
                    password,  // Stores the raw password (ensure you hash this in production)
                  });
                  
                  console.log('User created successfully:', user);
                
                
                }
        )
        createUser(UserId.toUpperCase(),password)
        const insertQuery = `
        INSERT INTO AppUser (User_id, FName, MName, LName, Email, Phone_no, StartYear, Branch, ActivityPoint,Counsellor_mail, Role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const userValues = [
        UserId.toUpperCase(),
        fullName,
        Mname || null, // Mname is optional
        Lname || null, // Lname is optional
        email.toLowerCase(),
        Phone_no || null, // Assuming phone number is optional
        year,
        branch,
        0, // ActivityPoint, assuming initial value as 0 // Userpay_id, assuming this field can be null initially
        counsellorMailId || "swarnamp@rvce.edu.in",
        role
    ];

    // console.log("registered")
    console.log('Executing query:', insertQuery, userValues);
    const [result] = await connection.execute(insertQuery, userValues);
    console.log(result);
    console.log(`Inserted ${result.affectedRows} row(s)`);
    const [newUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ?', [UserId]);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    // connection.release();  // Important to call this after you're done

    console.log(newUser[0])
    
    res.status(201).json(new ApiResponse(200, newUser[0], "User registered successfully"));

   

    } catch (error) {
        // Handle the error by sending the response with ApiError

        console.log(error.statusCode || 200)
        res.status(error.statusCode || 200).json({
            success: error.success,
            message: error.message,
            errors: error.errors,
            data: error.data,
        });
        
    }
    
    


   

})


const OrganizerRegister=asyncHandler(async (req,res)=>{
   


    const { UserId, email, password} = req.body;
    

    // Validation
   

    // Create SQL query to check if user already exists by User_id
    // const connection = await connectionSQL();
    // console.log("connected")

    // Check if User_id already exists in the database
    const connection = await connectionSQL();

    try {
       

        if (!(UserId && email && password)) {
            throw new ApiError(400, "Please enter all the fields");
        }
    
        
        const [existingUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ? OR email = ?', [UserId, email]);
        if (existingUser.length > 0) {
            // Throw an ApiError with a custom message
            throw new ApiError(400, "User  already exists", [
                { field: "email", message: "This email and usn is already in use" }
            ]);
        }
        if (password !== "admin") {
            throw new ApiError(409, "Incorrect Password",);
        }




        
        
        const insertQuery = `
        INSERT INTO AppUser (User_id, FName, MName, LName, Email, Phone_no, StartYear, Branch, ActivityPoint, Role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // const userValues = [
    //     UserId,
    //     null,
    //     Mname || null, // Mname is optional
    //     Lname || null, // Lname is optional
    //     email.toLowerCase(),
    //     Phone_no || null, // Assuming phone number is optional
    //     null,
    //     null,
    //     0, // ActivityPoint, assuming initial value as 0 // Userpay_id, assuming this field can be null initially
    //     role
    // ];
    console.log("here")
    const userValues = [
        UserId,
        null,
        null, // Trim whitespace if it exists
        null,
        email?.toLowerCase() || null,
        null,
        null,
        null,
        null, // ActivityPoint, assuming initial value as 0
        "Organizer" // Set a default role if undefined
    ];
    

    console.log("registered")

    console.log('Executing query: ', insertQuery, userValues);
    const [result] = await connection.execute(insertQuery, userValues);
    console.log(`Inserted ${result.affectedRows} row(s)`);
    const [newUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ?', [UserId]);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    
    res.status(201).json(new ApiResponse(200, newUser[0], "User registered successfully"));
    const createUser = (async (userId, password) => {
        
        const existingUsers = await User.find({userId});
        if(existingUsers>0){
            throw new ApiError(400,"user already existm")
        }
            // console.log(existingUsers);
          const user = await User.create({
            userId,    // Assigns the provided userId to the schema field
            password,  // Stores the raw password (ensure you hash this in production)
          });
          
          console.log('User created successfully:', user);
        
        
        }
)
createUser(UserId,password)
    console.log(newUser[0])

    } catch (error) {
        // Handle the error by sending the response with ApiError
        res.status(error.statusCode ).json({
            success: error.success,
            message: error.message,
            errors: error.errors,
            data: error.data,
        });
        console.log(error.message)
    }
    



   

})



//LOGIN
const userLogin=asyncHandler(async (req,res)=>{
    let{userId,password}=req.body

    console.log(password)
    
    userId=userId?.toUpperCase();
    console.log(userId)
    const user=await User.findOne({userId})

    try {

    if(!user){
        throw new ApiError(400,"user doesnot exist")
    }
    // console.log(password)
    const passwordVerify=await user.isPasswordCorrect(password);
    console.log(passwordVerify)
    if(!passwordVerify)
    {
        throw new ApiError(400,"password is incorrect")

    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    // const {accessToken,refreshToken}=generateAccessAndRefreshToken(user._id);
    // console.log(accessToken,refreshToken)
    // console.log(accessToken,refreshToken)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken -events -clubs -transactions -totalActivityPoints");


    const options={
        httpOnly: true,  // Prevent JavaScript from accessing the cookies
        secure: false,
        // sameSite: 'None'

    }
    console.log("logedin")
    
    // return res
    // .status(200)
    // .cookie("accessToken",accessToken,options)
    // .cookie("refreshToken",refreshToken,options)
    // .json(
    //     new ApiResponse(200,{
    //         user:loggedInUser,accessToken,refreshToken
    //     },
    // "user loggedin successfully"
    //     ))
    
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"user loggedin successfully"))

    }
    catch(error){
        console.error("Login Error:", error);  // Log full error for debugging

        res.status(error.statusCode || 500).json({
            success: false,  // Always set success explicitly
            message: error.message || "Something went wrong",
            errors: error.errors || null,
            data: error.data || null
        });
    }
})


//LOGOUT
const userLogout=asyncHandler(async (req,res)=>{
    console.log(req.user)

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined,
            }
        },
        {
            //next db acces should new not old
            new:true   
        }
    )



    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"user logged out")
    )

})


//CHANGE PASSWORD
const changecurrentPassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
    if(oldPassword==newPassword){
        throw new ApiError(400,"please enter different password")

    }
    if(!oldPassword && !newPassword){
        throw new ApiError(400,"please enter password")

    }
    
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"password is incorrect")
    }

    user.password=newPassword;
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"password set succesfuully")
    )
})




//reset
const resetPassword=asyncHandler(async(req,res)=>{
    // const {newPassword,otp}=req.body
    // // if(oldPassword==newPassword){
    // //     throw new ApiError(400,"please enter different password")

    // // }
    // if(!newPassword){
    //     throw new ApiError(400,"please enter password")

    // }
    
    // const user=await User.findById(req.user?._id)
    // // const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    // // if(!isPasswordCorrect){
    // //     throw new ApiError(400,"password is incorrect")
    // // }

    // user.password=newPassword;
    // await user.save({validateBeforeSave:false})

    // return res
    // .status(200)
    // .json(
    //     new ApiResponse(200,{},"password set succesfuully")
    // )



   try {
     const {userId,newPassword,reEnterPass}=req.body
     if(!(newPassword && reEnterPass)){
         throw new ApiError(400,"please enter password")
 
     }
     const userr=await User.findOne({userId});
     console.log(userId)
     console.log(userr)
     const user=await User.findById(userr._id)
     // const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
     // if(!isPasswordCorrect){
     //     throw new ApiError(400,"password is incorrect")
     // }
 
     if(!(newPassword===reEnterPass)){
         throw new ApiError(400,"password doesnt match")
 
     }
 
     user.password=newPassword;
     await user.save({validateBeforeSave:false})
 
     return res
     .status(200)
     .json(
         new ApiResponse(200,{},"password set succesfuully")
     )
   } catch (error) {
    return res.status(error.statusCode ).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data,
    });
   }
})


//userINfo
const userinfo=asyncHandler(async (req,res)=>{
    const db = await connectionSQL();
    const userId = req.user.userId; // Assuming userId is passed through the request (authenticated user)
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ message: "Please provide the User ID" });
    }

    // Query to fetch all user information based on the User_id
    const userInfoQuery = `
        SELECT 
            User_id, 
            FName, 
            MName, 
            LName, 
            Email, 
            Phone_no, 
            StartYear, 
            Branch, 
            ActivityPoint
        FROM AppUser
        WHERE User_id = ?
    `;

    try {
        // Fetch user information
        const [userInfo] = await db.execute(userInfoQuery, [userId]);

        if (userInfo.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        // db.release();  // Important to call this after you're done
        else{

        
        // Return user information as response
        res.status(200).json({
            userInfo: userInfo[0] // Assuming the result is an array, and we need the first item
        });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    finally{
        // if (db) db.release(); // Optional in this case but ensures the release
        if (db) {
            
                await db.end(); // single connection
            }
        }

        


})



import jwt from "jsonwebtoken"
// import nodemailer from "nodemailer";
 

const verifyemail=asyncHandler(async (req,res)=>{
    const {email}=req.body;
    try{
        console.log(req.user.userId);
        const user1=req.user.userId;
        const db = await connectionSQL();
        
        const query = 'SELECT Email FROM AppUser WHERE User_id = ?'; // SQL Query
          const [rows] = await db.query(query, [req.user.userId]);
            console.log(rows)
          if (rows.length > 0) {
          } else {
            console.log('Incorrect email');
          }
          const dbemail = rows[0].Email;  // Accessing the email from the first row of the result



        //   try {
        //     const testa = await User.create({
        //       userId: "1test23",    // User ID
        //       password: "123",     // Raw password (it will be hashed before saving)
        //       otp: "12356"         // OTP (optional)
        //     });
        //     console.log(testa); // This will log the saved user document
        //   } catch (err) {
        //     console.error(err);
        //   }


// const dummy1 = new User({
//     userId: '1RV235698',
//     password: 'hashed_password_here',
//     otp: '123456', // OTP for testing
//     verified: false // Verified status
//   });
  
//   await dummy1.save();
          if(email==dbemail){
                console.log("mathed")


                const userId=req.user.userId;

                
                    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit random OTP
                    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
                
                    const user = await User.findOneAndUpdate(
                      { userId }, 
                      { otp, otpExpiry }, // Update OTP and expiry
                      { new: true } // Return the updated document
                    );
                
                    if (user) {
                      console.log(`OTP for ${userId}: ${otp}`);
                    } else {
                      console.log("User not found!");
                    }
                  
             
                // const loggedInUser=await User.findById(user._id).select("-password -refreshToken -events -clubs -transactions -totalActivityPoints");
                // console.log(loggedInUser)




                //for urll via link
                // const secret=process.env.ACCESS_TOKEN_SECRET;
                // const token=jwt.sign({email:dbemail,userId:user},secret,{expiresIn:"51m"})
                // const resetUrl = `${process.env.URL_FORGOTPASSWORD}${token}`;
                // console.log("Reset URL:", resetUrl);






                
                let transport=await nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for port 465, false for other ports
                    auth: {
                     user: 'anuanuhb08@gmail.com',
                    pass: 'bdaridbtmwiviufh'
                    },
                  });
// console.log(email)

                  let info = await transport.sendMail({
                    to: "anuanuhb08@gmail.com", // Send to actual user email
                    subject: "Reset Password",
                    text: `Click the link to reset your password:${otp}`
                });
                console.log(info)
        
                // console.log("Reset URL:", resetUrl);
                console.log("Message sent: %s", info.messageId);
            }
        }
          
          catch(error){
            console.log(error)
            return res.json(ApiError(200,{},"email is incorrect"))
          }



          
       
    }

  
)


//forgot password in frontend so reseting it 



const forgotPasswordAddUserID=asyncHandler(async(req, res) => {

    
    try {
        const {userId}=req.body;
        const db = await connectionSQL();
    
        const [rows] = await db.execute('SELECT Email FROM AppUser WHERE User_id = ?', [userId]);
        if (rows.length <= 0) {
         
            throw new ApiError(400,"user doesnot exist")
        
        }
        const email=rows[0].Email;;
        const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit random OTP
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 5 minutes
    
        const user = await User.findOneAndUpdate(
            { userId }, 
            { otp, otpExpiry }, // Update OTP and expiry
            { new: true } // Return the updated document
        );
    
        if (user) {
            console.log(`OTP for ${userId}: ${otp}`);
        } else {
            throw new ApiError(400,"user doesnot exist")
        }
    
    
        let transport=await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
             user: 'anuanuhb08@gmail.com',
            pass: 'bdaridbtmwiviufh'
            },
          });
        // const transport = await nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     auth: {
        //         user: 'abigayle12@ethereal.email',
        //         pass: 'b2yVXQQprfpnWJ1Fxk'
        //     }
        // });
    // console.log(email)
    
          let info = await transport.sendMail({
            to: email, // Send to actual user email
            subject: "Reset Password",
            text: `Click the link to reset your password:${otp}`
        });
        console.log(info)
    
        // console.log("Reset URL:", resetUrl);
        console.log("Message sent: %s", info.messageId);
        return res
        .status(200)
        .json(new ApiResponse(200,{},"User verified successfully!"));



    
    } catch (error) {
        return res.status(error.statusCode ).json({
            success: error.success,
            message: error.message,
            errors: error.errors,
            data: error.data,
        });
        
    }

})








const resetpasswordOtp= asyncHandler(async(req, res) => {

    const { otp ,userId} = req.body;
    console.log(otp)
    // const userId = req.headers.userid; // Get userId from frontend (localStorage)
    // console.log(userId)
    try {
        // const duu="1Rv23CS400"
        // const user=await User.findOne({duu})
        // const users = await User.find(); // Returns an array of user documents

        // users.forEach(user => {
        //     console.log(`User ID: ${user.userId}, Password: ${user.password}, OTP: ${user.otp}, OTP Expiry: ${user.otpExpiry}`);
        // });
        
        const user=await User.findOne({userId});

        // console.log("hqliii",user)

        if(!user){
            throw new ApiError(400,"user doesnot exist")
        }
        console.log("hqliii",user)
        console.log(user.otp === otp)
        console.log(new Date())
        console.log(user.otpExpiry)
        if (!user) {
            // return res.status(404).json({ message: "User not found!" });
            throw new ApiError(400,  "User not found!")

        }

        if (user.otp === otp && new Date() < user.otpExpiry) {
            user.otp = null; // Clear OTP after successful verification
            user.otpExpiry = null;
            await user.save();

            return res.status(200).json(new ApiResponse(200,{},"OTP verified successfully!"));
        } else {
            // return res.status(400).json({ message: "Invalid or expired OTP!" });
            throw new ApiError(400, "Invalid or expired OTP!")
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(error.statusCode ).json({
            success: error.success,
            message: error.message,
            errors: error.errors,
            data: error.data,
        });
        
    }    
    
});


const getCounsellorDetailsForUser = asyncHandler(async (req, res) => {
  const userEmail = req.user.userId; // assuming auth middleware stores the logged-in user's email as userId
    console.log(req.user)
  const conn = await connectionSQL();

  const [rows] = await conn.execute(
    `SELECT c.*
     FROM AppUser u
     JOIN Counsellor c ON u.Counsellor_mail = c.Email
     WHERE u.User_id = ?`,
    [userEmail]
  );
  console.log(rows)
  if (rows.length === 0) {
    return res.status(404).json(new ApiResponse(404, null, 'Counsellor not found for this user'));
  }

  res.status(200).json(new ApiResponse(200, rows[0], 'Counsellor details fetched successfully'));
});






const updateOrganizer = asyncHandler(async (req, res) => {
  const userId        = req.user.userId;          // board member’s ID / USN
  const { organizerName } = req.body;

  if (!organizerName || !organizerName.trim()) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "organizerName is required"));
  }

  const connection = await connectionSQL();

  try {
    /* 🔄  Update Organiser_name where this user is the board member */
    const [result] = await connection.execute(
      `UPDATE Club
          SET Organiser_name = ?
        WHERE Board_mem      = ?`,
      [organizerName.trim(), userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            "No club found for which you are the board member"
          )
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Organizer name updated successfully"));
  } catch (err) {
    console.error("SQL error:", err.message);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Database error"));
  } finally {
    await connection.end();
  }
});



export {updateOrganizer,userRegister,userLogin,userLogout,changecurrentPassword,userinfo,OrganizerRegister,resetPassword,verifyemail,resetpasswordOtp,forgotPasswordAddUserID,getCounsellorDetailsForUser}