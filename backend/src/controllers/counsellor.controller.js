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




//LOGIN
const counsellorLogin=asyncHandler(async (req,res)=>{
    const{userId,password}=req.body

    console.log(password)
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


const getCounsellorEmails = asyncHandler(async (req, res) => {
    // const connection = await connectionSQL();
    // try {
    //     // Fetch Name and Email from Counsellor table
    //     const [rows] = await connection.query('SELECT Name, Email FROM Counsellor');

    //     // Map the results to include both name and email
    //     const counsellorDetails = rows.map(row => ({
    //         name: row.Name,
    //         email: row.Email
    //     }));

    //     res.status(200).json(
    //         new ApiResponse(200, counsellorDetails, "Counsellor details fetched successfully")
    //     );
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Error fetching counsellor details",
    //         error: error.message,
    //     });
    // }



    const connection = await connectionSQL();
    try {
        const [rows] = await connection.query('SELECT Name, Email FROM Counsellor');
        const counsellorDetails = rows.map(row => ({
            name: row.Name,
            email: row.Email
        }));

        res.status(200).json(
            new ApiResponse(200, counsellorDetails, "Counsellor details fetched successfully")
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching counsellor details",
            error: error.message,
        });
    }
});




const counsellorStudentList = asyncHandler(async (req, res) => {
  // console.log("fcgsxhjkaljsdbh")
  // console.log(req.user.userId);
    const  counsellorEmail  = req.user.userId; // Expect email as body param
    // console.log("hi");
    console.log(counsellorEmail);

    if (!counsellorEmail) {
        throw new ApiError(400, "Counsellor email is required");
    }

    const connection = await connectionSQL();

    try {
        const [students] = await connection.query(
            `SELECT 
                User_id, FName, Email, Phone_no, StartYear, ActivityPoint
             FROM 
                AppUser
             WHERE 
                Counsellor_mail = ?`,
            [counsellorEmail]
        );
        console.log("here")

        res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database query failed",
            error: error.message,
        });
    }
});


const getStudentsWithEvents = asyncHandler(async (req, res) => {
  const counsellorEmail = req.user.userId; // Set by middleware
  const conn = await connectionSQL();

  const [rows] = await conn.execute(
    `SELECT
         u.User_id,
         u.FName, u.MName, u.LName, u.Email, u.Phone_no,
         u.StartYear, u.Branch, u.ActivityPoint,
         CASE 
           WHEN rf.User_id IS NULL THEN NULL
           WHEN rf.attendance = 'yes' THEN 'participated'
           ELSE 'registered'
         END AS list_type,
         ce.Event_id,
         ce.Title,
         ce.Points AS Event_Points,
         CASE WHEN rf.attendance = 'yes' THEN ce.Points ELSE 0 END AS EarnedPoints,
         ce.Event_StartDate,
         ce.Event_EndDate,
         c.Club_id,
         c.Club_Name
     FROM AppUser u
     LEFT JOIN RegistersFor rf ON rf.User_id = u.User_id
     LEFT JOIN Club_Event ce ON ce.Event_id = rf.Event_id
     LEFT JOIN Club c ON c.Club_id = ce.Club_id
     WHERE u.Counsellor_mail = ?`,
    [counsellorEmail]
  );

  // Group rows by user and structure them
  const map = new Map(); // key = User_id

  for (const r of rows) {
    if (!map.has(r.User_id)) {
      map.set(r.User_id, {
        student: {
          User_id: r.User_id,
          FName: r.FName,
          MName: r.MName,
          LName: r.LName,
          Email: r.Email,
          Phone_no: r.Phone_no,
          StartYear: r.StartYear,
          Branch: r.Branch,
          ActivityPoint: r.ActivityPoint
        },
        registered: [],
        participated: [],
        earnedDetails: [] // NEW array to hold earned points per event
      });
    }

    if (r.list_type) {
      const ev = {
        Event_id: r.Event_id,
        Title: r.Title,
        Event_Points: r.Event_Points,
        Event_StartDate: r.Event_StartDate,
        Event_EndDate: r.Event_EndDate,
        Club_id: r.Club_id,
        Club_Name: r.Club_Name,
        EarnedPoints: r.EarnedPoints // NEW: track earned points
      };

      map.get(r.User_id)[r.list_type].push(ev);

      if (r.list_type === 'participated') {
        map.get(r.User_id).earnedDetails.push({
          Event_id: r.Event_id,
          Title: r.Title,
          EarnedPoints: r.EarnedPoints
        });
      }
    }
  }

  const payload = Array.from(map.values());

  res.status(200).json(
    new ApiResponse(
      200,
      payload,
      `Students and events for counsellor ${counsellorEmail} fetched successfully`
    )
  );
});

const updateCounsellorDetails = asyncHandler(async (req, res) => {
  try {
    const email = req.user.userId; // Assumes email is stored in token payload
    const { phone_no, department } = req.body;

    if (!phone_no || !department) {
      return res.status(400).json({ success: false, message: "Phone number and department are required" });
    }

    const conn = await connectionSQL();

    // Check if counsellor already exists
    const [existing] = await conn.execute(
      `SELECT * FROM Counsellor WHERE Email = ?`,
      [email]
    );

    if (existing.length === 0) {
      // Insert new counsellor
      await conn.execute(
        `INSERT INTO Counsellor (Email, Phone_no, Department) VALUES (?, ?, ?)`,
        [email, phone_no, department]
      );
    } else {
      // Update existing counsellor
      await conn.execute(
        `UPDATE Counsellor SET Phone_no = ?, Department = ? WHERE Email = ?`,
        [phone_no, department, email]
      );
    }

    res.status(200).json({
      success: true,
      message: "Counsellor details saved successfully"
    });

  } catch (error) {
    console.error("Error updating counsellor details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating counsellor details"
    });
  }
});


const getCounsellorDetails =asyncHandler( async (req, res) => {
  try {
    console.log("dfdgff")
    const email = req.user.userId; // Email of logged-in user
    console.log(email)
    const conn = await connectionSQL();

    const [rows] = await conn.execute(
      `SELECT 
        c.Email, c.Name, c.Phone_no, c.Department
       FROM Counsellor c 
       WHERE c.Email = ?`,
      [email]
    );
    console.log(rows)
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Counsellor details not found for the user"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error("Error fetching counsellor details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});




export {counsellorLogin,getCounsellorEmails,counsellorStudentList,getStudentsWithEvents,updateCounsellorDetails,getCounsellorDetails}