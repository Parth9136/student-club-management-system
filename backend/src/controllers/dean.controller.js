
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

import {User} from "../models/user.model.js"
import {connectionSQL} from "../db/index.js"
import jwt from "jsonwebtoken";




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


const deanLogin=asyncHandler(async (req,res)=>{
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



const deanRegister=asyncHandler(async(req,res)=>{



    




    const {email,password} = req.body;
        
    const UserId="DEAN";
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
            if (password !== "dean") {
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
            "Admin" // Set a default role if undefined
        ];
        
    
        console.log("registered")
    
        console.log('Executing query: ', insertQuery, userValues);
        const [result] = await connection.execute(insertQuery, userValues);
        console.log(`Inserted ${result.affectedRows} row(s)`);
        const [newUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ?', [UserId]);
        if (!newUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }
        
        res.status(201).json(new ApiResponse(200, newUser[0], "registered successfully"));
        const createUser = (async (userId, password) => {
            
            const existingUsers = await User.find({userId});
            if(existingUsers.length>0){
                throw new ApiError(400,"user already exist")
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






const OrganizerRegister=asyncHandler(async (req,res)=>{
    const { UserId, email, password,Fname,Mname,Lname} = req.body;
    

    // Validation
   

    // Create SQL query to check if user already exists by User_id
    // const connection = await connectionSQL();
    // console.log("connected")

    // Check if User_id already exists in the database
    const connection = await connectionSQL();

    try {
       

        if (!(UserId && email && password)) {
            throw new ApiError(4070, "Please enter all the fields");
        }
    
        
        const [existingUser] = await connection.query('SELECT * FROM AppUser WHERE User_id = ? OR email = ?', [UserId, email]);
        if (existingUser.length > 0) {
            // Throw an ApiError with a custom message
            throw new ApiError(400, "User  already exists", [
                { field: "email", message: "This email and usn is already in use" }
            ]);
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
        Fname || null,
        Mname || null, // Mname is optional
        Lname || null,
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



// const CounsellorRegister=asyncHandler(async (req,res)=>{

//     const { fullName, email , password} = req.body;
//     console.log(fullName);

//     const connection = await connectionSQL();

//     try {

//         if (!(email && fullName && password)) {
//             throw new ApiError(400, "Please enter all the fields");
//         }
    
//         // if (email.indexOf("@rvce.edu.in") === -1) {
//         //     throw new ApiError(400, "Please enter the RVCE Gmail correctly");
//         // }
//         const [existingUser] = await connection.query('SELECT * FROM AppUser WHERE email = ?', [email]);
//         if (existingUser.length > 0) {
//             // Throw an ApiError with a custom message
//             throw new ApiError(400, "User  already exists", [
//                 { field: "email", message: "This email and usn is already in use" }
//             ]);
//         }
//         // if (role === "Organizer" && password !== "admin") {
//         //     throw new ApiError(409, "You are not a president and unauthorized",);
//         // }


    
//         const createUser = (async (userId, password) => {
        
//                 const existingUsers = await User.find({userId});
//                 if(existingUsers>0){
//                     throw new ApiError(400,"user already existm")
//                 }
//                     // console.log(existingUsers);
//                   const user = await User.create({
//                     userId,    // Assigns the provided userId to the schema field
//                     password,  // Stores the raw password (ensure you hash this in production)
//                   });
                  
//                   console.log('User created successfully:', user);
                
                
//                 }
//         )
//         createUser(email.toLowerCase(),password)


//         const insertQuery = `
//         INSERT INTO Counsellor (Email, Name)
//         VALUES (?, ?)
//     `;
// const [result] = await connection.execute(insertQuery, userValues);
//     const userValues = [
    
        
// // Lname is optional
//         email.toLowerCase(),
//         fullName,
       
//          // Assuming phone number is optional
        
//     ];

//     console.log("registered")
//     console.log('Executing query:', insertQuery, userValues);
    
//     console.log(`Inserted ${result.affectedRows} row(s)`);
// //    const [existingCounsellor] = await connection.query('SELECT * FROM Counsellor WHERE Email = ?', [email.toLowerCase()]);
// //    console.log(existingCounsellor.length);
// // if (existingCounsellor.length > 0) {
// //     throw new ApiError(400, "Counsellor already exists", [
// //         { field: "email", message: "This email is already registered as a counsellor" }
// //     ]);
// // }
//     // connection.release();  // Important to call this after you're done

//     console.log(newUser[0])
    
//     res.status(201).json(new ApiResponse(200, newUser[0], "User registered successfully"));

   

//     } catch (error) {
//         // Handle the error by sending the response with ApiError

//         console.log(error.statusCode || 200)
//         res.status(error.statusCode || 200).json({
//             success: error.success,
//             message: error.message,
//             errors: error.errors,
//             data: error.data,
//         });
        
//     }
    
    


   


// })


const CounsellorRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName);

  const connection = await connectionSQL();

  try {
    if (!(email && fullName && password)) {
      throw new ApiError(400, "Please enter all the fields");
    }

    // Check if user already exists in AppUser
    const [existingUser] = await connection.query('SELECT * FROM AppUser WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      throw new ApiError(400, "User already exists", [
        { field: "email", message: "This email is already in use" }
      ]);
    }

    // ✅ Check if already registered as counsellor
    const [existingCounsellor] = await connection.query('SELECT * FROM Counsellor WHERE Email = ?', [email.toLowerCase()]);
    if (existingCounsellor.length > 0) {
      throw new ApiError(400, "Counsellor already exists", [
        { field: "email", message: "This email is already registered as a counsellor" }
      ]);
    }

    // ✅ Create user in MongoDB (assuming mongoose User model)
    const createUser = async (userId, password) => {
      const existingUsers = await User.find({ userId });
      if (existingUsers.length > 0) {
        throw new ApiError(400, "User already exists in MongoDB");
      }

      const user = await User.create({
        userId,
        password,
      });

      console.log('User created successfully:', user);
    };
    await createUser(email.toLowerCase(), password);

    // ✅ Insert into Counsellor table
    const insertQuery = `
      INSERT INTO Counsellor (Email, Name)
      VALUES (?, ?)
    `;
    const userValues = [email.toLowerCase(), fullName];

    console.log("Executing query:", insertQuery, userValues);
    const [result] = await connection.execute(insertQuery, userValues);
    console.log(`Inserted ${result.affectedRows} row(s)`);

    // ✅ Fetch newly created user from AppUser
    const [newUser] = await connection.query('SELECT * FROM AppUser WHERE Email = ?', [email]);
    if (!newUser && newUser.length === 0) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json(new ApiResponse(200, newUser[0], "User registered successfully"));

  } catch (error) {
    console.log(error.statusCode || 500);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
      data: null,
    });
  }
});



const viewOrganizer=asyncHandler(async (req,res)=>{
    console.log("viewing");
    const connection = await connectionSQL();

    try {
        // Fetch all organizers and the club titles where they are board members
        const [organizers] = await connection.execute(`
            SELECT 
                au.User_id,
                au.FName,
                au.MName,
                au.LName,
                c.Club_Name
            FROM appuser au
            LEFT JOIN Club c ON au.User_id = c.Board_mem
            WHERE au.Role = 'Organizer';
        `);

        if (organizers.length === 0) {
            return res.status(404).json(new ApiResponse(404, null, "No organizers found"));
        }

        return res.status(200).json(new ApiResponse(200, organizers, "Organizers with their clubs"));
        
    } catch (error) {
        console.error("Error accessing SQL database:", error.message);
        return res.status(500).json(new ApiResponse(500, null, "Database error"));
    } finally {
        await connection.end();  // Close the database connection
        console.log("SQL Database connection closed.");
    }
})



const viewEventsUnderClub=asyncHandler(async (req,res)=>{
   const db = await connectionSQL();

    const { boardMemName } = req.body;

    if (!boardMemName) {
        return res.status(400).json({ message: "Board member name is required" });
    }

    try {
        // Step 1: Get the club(s) where this person is board member
        const [clubs] = await db.execute(
            `SELECT Club_id, Club_Name FROM Club WHERE Board_mem = ?`,
            [boardMemName]
        );

        if (clubs.length === 0) {
            return res.status(404).json({ message: "No club found for this board member" });
        }
        console.log(clubs[0])
        console.log(clubs[0].Club_id)
        const clubIds = clubs[0].Club_id;
        console.log(clubIds)
        // Step 2: Get all events for these club(s)
        const [events] = await db.execute(
            `SELECT 
                ce.Event_id,
                ce.Title,
                ce.Summary,
                ce.Fee,
                ce.Points,
                ce.Event_StartDate,
                ce.Event_EndDate,
                ce.Event_Time,
                c.Club_Name
            FROM Club_Event ce
            JOIN Club c ON ce.Club_id = c.Club_id
            WHERE ce.Club_id IN (?)`,
            [clubIds]
        );

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this board member's club" });
        }

        return res.status(200).json({
            events,
            message: "Events fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching events by board member:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await db.end();
    }


})


const deanevent=asyncHandler(async (req,res)=>{
    console.log("hello");
 const { clubId } = req.body;       

  if (!clubId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "clubId is required"));
  }

  const connection = await connectionSQL();  

  try {

    const [clubRows] = await connection.execute(
      "SELECT * FROM Club WHERE Club_id = ?",
      [clubId]
    );

    if (clubRows.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Club not found"));
    }

    const [events] = await connection.execute(
      `SELECT *
        FROM Club_Event          
        WHERE Club_id = ?`,   // optional ordering
      [clubId]
    );

 
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { club: events },
          "Events fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error accessing SQL database:", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Database error"));
  } finally {
    await connection.end();               
    console.log("SQL Database connection closed.");
  }
})


const deanApprove = asyncHandler(async (req, res) => {
   const { eventId, verified } = req.body;
  const deanApprovalPdf       = req.file?.path || req.body.deanApprovalPdf || null;

  /* ---------- 1. Validate ---------- */
  if (!eventId || !['yes', 'no'].includes(verified)) {
    throw new ApiError(400, "eventId and verified ('yes' | 'no') are required");
  }

  const conn = await connectionSQL();

  /* ---------- 2. Fetch event (incl. Title & Club_id) ---------- */
  const [rows] = await conn.execute(
    `SELECT Dean_approval, Dean_approvalPdF, Title, Club_id
       FROM Club_Event
      WHERE Event_id = ?`,
    [eventId]
  );
  if (!rows.length) throw new ApiError(404, "Event not found");

  const { Dean_approval, Title: eventName, Club_id: clubId } = rows[0];
  const currentApproval = Dean_approval === 1;
  const wantApproval    = verified === 'yes';

  /* ---------- 3. Fetch club name ---------- */
  const [[clubRow] = []] = await conn.execute(
    `SELECT Club_name FROM Club WHERE Club_id = ?`,
    [clubId]
  );
  const clubName = clubRow?.Club_name || "Unknown Club";

  /* ---------- 4. Short-circuit if no change ---------- */
  if (currentApproval === wantApproval) {
    const msg = wantApproval
      ? "Event already approved"
      : "Event already un-approved";
    return res.json(
      new ApiResponse(
        200,
        { eventId, eventName, clubName, approved: currentApproval },
        msg
      )
    );
  }

  /* ---------- 5. Build dynamic UPDATE ---------- */
  let sql     = "UPDATE Club_Event SET Dean_approval = ?";
  const params = [wantApproval, eventId];       // (... WHERE Event_id = ?)

  if (deanApprovalPdf) {
    sql   = "UPDATE Club_Event SET Dean_approvalPdF = ?, Dean_approval = ?";
    params.unshift(deanApprovalPdf);            // pdf, approval, id
  }

  /* ---------- 6. Execute ---------- */
  const [result] = await conn.execute(sql + " WHERE Event_id = ?", params);
  if (result.affectedRows === 0)
    throw new ApiError(500, "Failed to update event");

  /* ---------- 7. Respond ---------- */
  res.status(200).json(
    new ApiResponse(
      200,
      { eventId, eventName, clubName, approved: wantApproval, deanApprovalPdf },
      "Dean approval status updated"
    )
  );
});



const EventForapproval=asyncHandler(async(req,res)=>{
  console.log("hiii")
  if (!Object.keys(req.body).length) {
    const conn = await connectionSQL();

    const [rows] = await conn.execute(`
      SELECT
  CE.Event_id         AS eventId,
  CE.Title            AS eventName,
  C.Club_name         AS clubName,
  CE.Dean_approval    AS approved,
  CE.Dean_approvalPdF AS deanApprovalPdf 
FROM Club_Event CE
JOIN Club C ON C.Club_id = CE.Club_id
WHERE CE.Dean_approvalPdF IS NOT NULL
  AND CE.Dean_approvalPdF != ''
  AND CE.Dean_approvalPdF != 'null';
    `);

    return res.json(new ApiResponse(200, rows, "All events fetched"));
  }

  /* =============== 2. UPDATE branch =============== */
  const updates = Array.isArray(req.body) ? req.body : [req.body];

  const conn = await connectionSQL();
  const results = [];

  for (const upd of updates) {
    const { eventId, verified } = upd;
    const deanApprovalPdf =
      upd.deanApprovalPdf ||                       // plain path/URL in JSON
      req.files?.find?.((f) => f.fieldname === eventId)?.path || // multer array
      req.file?.path ||                            // single file
      null;

    /* ---- validate ---- */
    if (!eventId || !['yes', 'no'].includes(verified)) {
      results.push({
        eventId,
        success: false,
        message: "eventId + verified ('yes'|'no') required"
      });
      
    }
    console.log("hgfvdkj")

    /* ---- fetch current ---- */
   const [row] = await conn.execute(
  `SELECT Dean_approval, Title, Club_id, Event_id FROM Club_Event WHERE Event_id = ? AND Dean_approvalPdF IS NOT NULL AND Dean_approvalPdF != '' AND Dean_approvalPdF!='null'`,
  [eventId]
);
console.log("cjhbdn")
  console.log(row)

    if (!row) {
      results.push({ eventId, success: false, message: "Event not found" });
      continue;
    }

    const want = verified === 'yes';
    if (row.Dean_approval === want) {
      results.push({
        eventId,
        success: true,
        message: `Already ${want ? "approved" : "un-approved"}`
      });
      continue;
    }

    /* ---- build SQL ---- */
    let sql    = `UPDATE Club_Event SET Dean_approval = ?`;
    const p    = [want, eventId];

    if (deanApprovalPdf) {
      sql = `UPDATE Club_Event SET Dean_approvalPdF = ?, Dean_approval = ?`;
      p.unshift(deanApprovalPdf);   // pdf, bool, id
    }

    const [r] = await conn.execute(sql + " WHERE Event_id = ?", p);

    results.push({
      eventId,
      success: r.affectedRows > 0,
      message: r.affectedRows ? "updated" : "update failed"
    });
  }

  res.json(new ApiResponse(200, results, "Dean approval batch processed"));
})

export {deanLogin,deanRegister,OrganizerRegister,viewOrganizer,viewEventsUnderClub,CounsellorRegister,deanevent,deanApprove,EventForapproval}