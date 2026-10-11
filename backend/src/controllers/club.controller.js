import {uploadOnCloudinary} from "../utils/cloudinary.js"

import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

import {User} from "../models/user.model.js"

import {Club} from "../models/club.model.js"

import { MongoClient } from 'mongodb';
import {MONGODB_NAME} from "../constant.js"

import {Transaction} from "../models/transaction.model.js"
import {connectionSQL} from "../db/index.js"

let transac=0;
let counter = 0; 

const addClub = asyncHandler(async (req, res) => {
    console.log("yes");

    const { clubName, description } = req.body;
    console.log(clubName);
    console.log(description);

    const user = await User.findById(req.user._id);
    

    if (!clubName) {
        throw new ApiError(400, "Please enter club name");
    }

    const connection = await connectionSQL();

    // Check if the user already has a club
    const [userClub] = await connection.execute('SELECT * FROM Club WHERE Board_mem = ?', [user.userId]);

    if (userClub.length > 0) {
        throw new ApiError(400, "You can only add one club. You have already added a club.");
    }

    // Check if the club already exists by name
    const [existingClubs] = await connection.execute('SELECT * FROM Club WHERE Club_Name = ?', [clubName]);

    if (existingClubs.length > 0) {
        throw new ApiError(400, "Club already exists");
    }

    // Generate a unique Club ID
    function generateClubId(clubName) {
        let nameHash = clubName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 1000;
        let timestampPart = parseInt(Date.now().toString().slice(-4));
        let randomPart = Math.floor(Math.random() * 100);
        return (nameHash * 10000) + (timestampPart * 100) + randomPart;
    }

    const clubId = generateClubId(clubName);

    console.log("yes");

    const currentDate = new Date();

    // Process cover image if uploaded
    const coverImageLocalPath = req.file?.path;
    console.log(req.file?.path);
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Local path not found");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // Prepare the SQL insert query
    const insertQuery = `
        INSERT INTO Club (
            Club_id, Club_Name, Club_Description, Board_mem, Club_Date, image, Fee, Club_StartDate, Club_EndDate
        ) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)
    `;

    const userValues = [
        clubId,                          // Club ID or user ID
        clubName,                         // Club name
        description,                      // Club description
        user.userId,                      // Board_mem (User ID)
        currentDate,                      // Club_Date
        coverImage.url,                   // Image URL (from Cloudinary)
        null,                             // Fee (optional)
        null,                             // Club_StartDate
        null                              // Club_EndDate
    ];

    // Log the values to debug
    console.log('Inserting values:', userValues);

    try {
        const [result] = await connection.execute(insertQuery, userValues);
        console.log(`Inserted ${result.affectedRows} row(s)`);
        res.status(200).json(new ApiResponse(200, { clubId, clubName, description, coverImage: coverImage.url }, "Club added successfully"));
    } catch (error) {
        console.error("Error inserting data:", error);
        // res.status(500).json({ message: 'Error adding club' });
        return res.status(error.statusCode ).json({
            success: error.success,
            message: error.message,
            errors: error.errors,
            data: error.data,
        });
    } finally {
        await connection.end();
    }
});


// const addClub=asyncHandler(async (req,res)=>{
//     console.log("yes")
//     // console.log(clubName)
// const { clubName, description } = req.body;
// console.log(clubName)
// console.log(description)


// const user = await User.findById(req.user._id);

// if (!clubName) {
//     throw new ApiError(400, "Please enter club name");
// }



// const connection = await connectionSQL();

// // Check if the club already exists
// const [existingClubs] = await connection.execute('SELECT * FROM Club WHERE Club_Name = ?', [clubName]);

// if (existingClubs.length > 0) {
//     throw new ApiError(400, "Club already exists");
// }

// // Generate a unique Club ID using clubName and a timestamp
// // Counter initialized to 0

// // const clubId = parseInt(Date.now().toString().slice(-8) + (counter++).toString());// const clubId=1;
// // const clubId = parseInt(Date.now().toString().slice(-10));
// // const clubId = parseInt(Date.now().toString().slice(-8) + Math.floor(Math.random() * 100));


// function generateClubId(clubName) {
//     // Convert club name to a small hash (sum of character codes)
//     let nameHash = clubName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 1000; 

//     // Get the last 4 digits of timestamp (to keep within small range)
//     let timestampPart = parseInt(Date.now().toString().slice(-4));

//     // Add a small random number (0-99) for uniqueness
//     let randomPart = Math.floor(Math.random() * 100);

//     // Combine all parts to generate a small Club ID
//     return (nameHash * 10000) + (timestampPart * 100) + randomPart;
// }

// // Example Usage
// const clubId = generateClubId("clubName");

// console.log("yes")

// const currentDate = new Date(); // Use Date() instead of Date.now() for actual date formatting

// // Process cover image if uploaded
// const coverImageLocalPath = req.file?.path;
// console.log(req.file?.path)
// if (!coverImageLocalPath) {
//     throw new ApiError(400, "Local path not found");
// }

// const coverImage = await uploadOnCloudinary(coverImageLocalPath);

// // Prepare the SQL insert query
// const insertQuery = `
//     INSERT INTO Club (
//         Club_id, Club_Name, Club_Description, Board_mem, Club_Date, image, Fee, Club_StartDate, Club_EndDate
//     ) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)
// `;

// const userValues = [
//     clubId,                          // Club ID or user ID
//     clubName,                   // Club name
//     description,                // Club description
//     user.userId,                          // Board_mem (User ID, as an example)
//     currentDate,               // Club_Date in correct format
//     coverImage.url,             // Image URL (from Cloudinary)
//     null,                      // Fee value (if applicable)
//     null,               // Club_StartDate in correct format
//     null// Club_EndDate (set to a default date if needed)
// ];

// // Log the values to debug
// console.log('Inserting values:', userValues);

// try {
//             const [result] = await connection.execute(insertQuery, userValues);
//             console.log(`Inserted ${result.affectedRows} row(s)`);
//             res.status(200).json(new ApiResponse(200, { clubId, clubName, description, coverImage: coverImage.url }, "Club added successfully"))
//         } catch (error) {
//             console.error("Error inserting data:", error);
//         } finally {
//             await connection.end();
//         }
// })

const checkIfBoardMember =asyncHandler( async (req,res) => {
    // Create a connection to the database
    const connection = await connectionSQL();
    const userId = req.user.userId; // Assuming userId is available in the request


    try {
        // Query the database to find if the user is a board member of any club
        const [club] = await connection.execute('SELECT * FROM Club WHERE Board_mem = ?', [userId]);

        // If the query returns any result, it means the user is a board member of at least one club
        let isMember=""

        if (club.length > 0) {
            isMember="yes"
            // return true;
            console.log("yes")

             // The user is a board member of a club
        } else {
            isMember="no"
        }
        return res.status(200).json(new ApiResponse(200, {isMember}, "user is already a board member"));

    } catch (error) {
        console.error('Error checking board member status:', error);
        throw new Error('Error checking board member status');
    } finally {
        await connection.end();
    }
});


const clubsOverview=asyncHandler(async (req,res)=>{

    const userId = req.user.userId; // Assuming userId is available in the request

    console.log(userId)
    const connection = await connectionSQL(); // Establish connection to your SQL database
    
    try {
        // Execute the query to get all clubs
        const [rows] = await connection.execute('SELECT * FROM Club');
    
        // If no rows are returned, handle this case
        if (rows.length === 0) {
            return res.status(404).json(new ApiResponse(404, null, "No clubs found"));
        }
    
        // Check if the user belongs to each club
        const membershipQuery = `
            SELECT Club_id
            FROM Belongs
            WHERE User_id = ?`;
    
        // Fetch the user's club memberships
        const [userMemberships] = await connection.execute(membershipQuery, [userId]);
        console.log(userMemberships)
        // Extract club IDs the user is a member of
        const memberClubIds = userMemberships.map(membership => membership.Club_id);
        console.log(memberClubIds)
        // Attach membership status to each club
        const clubsWithMembershipStatus = rows.map(club => ({
            ...club,
            isUserMember: memberClubIds.includes(club.Club_id) // Check if club is in the list of user's memberships
        }));
    
        // Return the clubs with the membership status
        return res.status(200).json(new ApiResponse(200, clubsWithMembershipStatus, "Club details rendered successfully"));
    
    } catch (error) {
        console.error("Error accessing SQL database:", error.message);
        return res.status(500).json(new ApiResponse(500, null, "Database error"));
    } finally {
        await connection.end();  // Close the database connection
        console.log("SQL Database connection closed.");
    }
    

})



const clubRegisteredByYou=asyncHandler(async (req,res)=>{
    const userId = req.user.userId; // Assuming userId is available in the request

    console.log(userId);
    const connection = await connectionSQL(); // Establish connection to your SQL database
    
    try {
        // Execute the query to get all clubs
        const [rows] = await connection.execute('SELECT * FROM Club');
    
        // If no rows are returned, handle this case
        if (rows.length === 0) {
            return res.status(404).json(new ApiResponse(404, null, "No clubs found"));
        }
    
        // Check if the user belongs to each club
        const membershipQuery = `
            SELECT Club_id
            FROM Belongs
            WHERE User_id = ?`;
    
        // Fetch the user's club memberships
        const [userMemberships] = await connection.execute(membershipQuery, [userId]);
        console.log(userMemberships);
    
        // Extract club IDs the user is a member of
        const memberClubIds = userMemberships.map(membership => membership.Club_id);
        console.log(memberClubIds);
    
        // Filter clubs to include only those where the user is a member
        const clubsUserIsMemberOf = rows.filter(club => memberClubIds.includes(club.Club_id));
    
        // If no clubs are found where the user is a member, return a message
        if (clubsUserIsMemberOf.length === 0) {
            return res.status(404).json(new ApiResponse(404, null, "User is not a member of any clubs"));
        }
    
        // Return the clubs where the user is a member
        return res.status(200).json(new ApiResponse(200, clubsUserIsMemberOf, "Clubs user is a member of"));
    
    } catch (error) {
        console.error("Error accessing SQL database:", error.message);
        return res.status(500).json(new ApiResponse(500, null, "Database error"));
    } finally {
        await connection.end();  // Close the database connection
        console.log("SQL Database connection closed.");
    }
    

})



const clubRegistrationDetails=asyncHandler(async (req,res)=>{

const { startDate, endDate, fee, clubName } = req.body;
console.log(startDate,endDate,fee,clubName)
// Validate required fields
if (!(startDate && endDate && fee && clubName)) {
    throw new ApiError(400, "Please enter all the fields");
}

// Validate the dates
const start = new Date(startDate);
const end = new Date(endDate);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.log("Invalid date format. Please enter valid dates.");
    throw new ApiError(400, "Invalid date format.");
} else if (start >= end) {
    console.log("Start date must be earlier than the end date.");
    throw new ApiError(400, "Start date must be earlier than the end date.");
} else {
    console.log("Dates are valid: Start date is earlier than the end date.");
}

const user = req.user;

// Check if the club exists and if the user is the president
const connection = await connectionSQL();  // Your SQL connection logic

try {
    // Check if club exists
    const [clubRows] = await connection.execute('SELECT * FROM Club WHERE Club_Name = ?', [clubName]);

    if (clubRows.length === 0) {
        throw new ApiError(400, "Club doesn't exist");
    }

    const club = clubRows[0];
    const clubPresidentId = club.Board_mem; // Assuming 'Board_mem' is the president's user ID

    // Check if the user is the president of the club
    // console.log(clubPresidentId);
    // console.log(user.userId);
    if (clubPresidentId != user.userId) {
        throw new ApiError(400, "Unauthorized: You cannot update details for registration");
    }

    // Update the club registration details
    const [updateResult] = await connection.execute(
        `UPDATE Club 
        SET Club_StartDate = ?, Club_EndDate = ?, Fee = ? 
        WHERE Club_Name = ?`, 
        [start, end, fee, clubName]
    );

    if (updateResult.affectedRows > 0) {
        return res.status(200).json(new ApiResponse(200, "Registration data updated successfully"));
    } else {
        throw new ApiError(500, "Failed to update registration details");
    }

} catch (error) {
    console.error("Error updating club registration details:", error.message);
    throw new ApiError(500, "Database error");
} finally {
    await connection.end();  // Close the database connection
}
})




const clubRegister=asyncHandler( async (req,res)=>{


const { clubName} = req.body;
const db = await connectionSQL();  // Your SQL connection logic

try {
    const user = req.user;
    
    // Step 1: Find the club by name and retrieve start and end dates
    const clubQuery = `
        SELECT Club_id, Club_StartDate, Club_EndDate, Fee
        FROM Club
        WHERE Club_Name = ?;
    `;
    
    
    // Execute the query to get the club details
    const [club] = await db.query(clubQuery, [clubName]);
    console.log(club);
    if (!club || club.length === 0) {
        throw new ApiError(404, `Club with name ${clubName} not found.`);
    }
    
    // Extract the necessary club details
    const { Club_id, Club_StartDate, Club_EndDate, Fee } = club[0];
    // new Date(Club_StartDate).toDateString();
    
    // // Convert the start and end dates to JavaScript Date objects
    const startDate = new Date(Club_StartDate);
    // ;
    const endDate = new Date(Club_EndDate);
    
    // console.log(`Club Start Date: ${startDate}`);
    // console.log(`Club End Date: ${endDate}`);
    // const startDate=Club_StartDate;
    // const endDate=Club_EndDate;
    const today = new Date();
    console.log(today)
    console.log(Club_EndDate)
    console.log(endDate)
    // Step 2: Check if registration is within the valid period
    if (!(today >= startDate && today <= endDate)) {
        if (today < startDate) {
            throw new ApiError(400, "Registration not yet opened");
        } else {
            throw new ApiError(400, "Registration is closed");
        }
    }
    
    // Step 3: Validate fee if applicable
    // if (Fee > 0) {
    //     if (!fee || fee <= 0) {
    //         throw new ApiError(400, "Amount should be paid to register. Please pay the amount.");
    //     }
    // }
    
    // console.log(User_id)
    console.log(req.user.userId)
    // Step 4: Add user to the club (Belongs table)
    const addUserToClubQuery = `
        INSERT IGNORE INTO Belongs (User_id, Club_id)
        VALUES (?, ?);
    `;
    
    await db.query(addUserToClubQuery, [req.user.userId, Club_id]);
    
    // Step 5: Create transaction for the user
    // const transactionId = generateTransactionId(); // Implement your own function for generating a unique transaction ID
    const timestamp = Date.now();  // Current time in milliseconds since Unix epoch
    const randomNum = Math.floor(Math.random() * 10000);  // Random 4-digit number
    const transactionId = `${timestamp}-${randomNum}`;const paymentDate = today.toISOString().split('T')[0]; // Date in 'YYYY-MM-DD' format
    const method = "Online"; // You can set this as per your method of payment (could be passed from the frontend)
    
    const createTransactionQuery = `
        INSERT INTO Payment (Trans_id, Reg_id, Amount, Payment_Status, Method, Payment_date, Club_id, Event_id, User_id)
        VALUES (?, ?, ?, 'Completed', ?, ?, ?, ?, ?);
    `;
    
    await db.query(createTransactionQuery, [
        transactionId, 
        user.User_id, 
        method, 
        paymentDate, 
        Club_id, 
        null, // If there's no Event_id, you can leave this as null
        req.user.userId
    ]
    );
    
    // Step 6: Add transaction to the user's transaction list if fee is paid
    // let transactionAddingToUser;
    // if (fee > 0) {
    //     const updateUserTransactionsQuery = `
    //         UPDATE AppUser
    //         SET ActivityPoint = ActivityPoint + ?, transactions = JSON_ARRAY_APPEND(transactions, '$', ?)
    //         WHERE User_id = ?;
    //     `;
    //     transactionAddingToUser = await db.query(updateUserTransactionsQuery, [
    //         fee, 
    //         transactionId, 
    //         user.User_id
    //     ]);
    // }
    
    // Return response
    
    
    const checkRegistrationQuery =
    "SELECT COUNT(*) AS count FROM Belongs WHERE User_id = ? AND Club_id = ?";
    
    const [result] = await db.execute(checkRegistrationQuery, [req.user.userId, Club_id]);
    if (result[0].count > 0) {
        return res.status(409).json({ message: "You have already registered for this club" });
    }
    return res.status(200).json(
        new ApiResponse(200, { 
            club, 
            transactionId, 
            user, 
            // transactionAddingToUser 
        }, `Registered successfully to ${clubName}`)
    )
    
    
} catch (error) {
    res.status(error.statusCode ).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data,
    });
    console.log(error.message)
}finally{
    await connectionSQL.end()
}
})





const clubOverviewByPresident=asyncHandler(async (req,res)=>{


const userId = req.user.userId;
const db = await connectionSQL();

console.log("User ID:", userId);

// Get the Club ID(s), Name, and Description where the user is a Board Member
const clubQuery = 'SELECT Club_id, Club_name, Club_Description FROM Club WHERE TRIM(Board_mem) = ?';
const [clubs] = await db.execute(clubQuery, [userId]);

console.log(clubs);

if (clubs.length === 0) {
    console.log("No clubs found for the user.");
    return res.status(404).json({ message: "No clubs found for the user." });
}

// Extract Club IDs
const clubIds = clubs.map(club => club.Club_id);

console.log("Club IDs:", clubIds);
console.log(req.user);

// Prepare response object
let response = {};

// Loop through each club and get its users
for (const club of clubs) {
    // Get all User IDs belonging to this Club ID
    const belongsQuery = `SELECT User_id FROM Belongs WHERE Club_id = ?`;
    const [users] = await db.execute(belongsQuery, [club.Club_id]);

    // Add club details to the response
    response[club.Club_name] = {
        description: club.Club_Description,
        users: users.map(user => user.User_id) // Extract only User IDs
    };
}

// console.log("Response:", response);

res.json(response);




})



const clubdelete=asyncHandler(async (req,res)=>{
    const connection = await connectionSQL();

    try {
        const { clubName } = req.body; // Get clubName from request body

        if (!clubName) {
            throw new ApiError(400, "Club name is required");
        }

        // Check if the club exists
        const [existingClub] = await connection.execute('SELECT * FROM Club WHERE Club_Name = ?', [clubName]);

        if (existingClub.length === 0) {
            throw new ApiError(404, "Club not found");
        }

        // Delete the club
        const deleteQuery = 'DELETE FROM Club WHERE Club_Name = ?';
        const [result] = await connection.execute(deleteQuery, [clubName]);

        if (result.affectedRows > 0) {
            res.status(200).json(new ApiResponse(200, { clubName }, "Club deleted successfully"));
        } else {
            throw new ApiError(500, "Failed to delete the club");
        }

    } catch (error) {
        console.error("Error deleting club:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        if (connection) await connection.end();
    }
})


const addSummary=asyncHandler(async (req,res)=>{
    try {
        const userId = req.user.userId;
        const db = await connectionSQL();
    
        console.log("User ID:", userId);
    
        // Fetch the club where the user is a board member
        const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
        const [clubs] = await db.execute(clubQuery, [userId]);
    
        if (clubs.length === 0) {
            return res.status(404).json({ message: "No clubs found for the user." });
        }
    
        console.log("Clubs:", clubs);
    
        const clubId = clubs[0].Club_id;
        const isOrganizer = clubs[0].Organizer_id === userId;
    
        // If the user is an organizer and wants to update an event summary
        if (isOrganizer && req.body.eventId && req.body.newSummary) {
            const updateSummaryQuery = 'UPDATE Club_Event SET Summary = ? WHERE Event_id = ? AND Club_id = ?';
            const [updateResult] = await db.execute(updateSummaryQuery, [req.body.newSummary, req.body.eventId, clubId]);
    
            if (updateResult.affectedRows === 0) {
                return res.status(400).json({ message: "Event not found or not authorized to update." });
            }
    
            console.log(`Event summary updated by organizer for Event ID: ${req.body.eventId}`);
            return res.status(200).json({ message: "Event summary updated successfully." });
        }
    
        // Fetch events for the club
        const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
        const [events] = await db.execute(eventQuery, [clubId]);
    
        if (events.length === 0) {
            return res.status(409).json({ message: "You don't have any events." });
        }
    
        console.log("Events:", events);
    
        res.status(200).json({
            message: "Events fetched successfully.",
            events
        });
    
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
    
})


const clubInfoPresident=asyncHandler(async(req,res)=>{
    const db = await connectionSQL();
    console.log(req.user)
    const user=req.user.userId;
    console.log(user)
    const clubQuery = `
        SELECT Club_id, Club_Name, Club_Description, Club_StartDate,image
        FROM Club
        WHERE Board_mem = ?;
    `;
    
    try {
        // Execute the query with the user ID
        const clubInfo = await db.query(clubQuery, [user]); // Assuming you're using a database library like MySQL

        if (clubInfo.length > 0) {
            // If the user is a board member, send the club information
            res.status(200).json({
                message: 'Club information fetched successfully.',
                data: clubInfo[0], // Assuming there's only one club
            });
        } else {
            // If the user is not a board member for any club
            res.status(404).json({
                message: 'You are not a board member of any club.',
            });
        }
    } catch (error) {
        console.error('Error fetching club info:', error);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }

})



const checkClubRegStatus=asyncHandler( async (req, res) => {
   const db = await connectionSQL();
    console.log(req.user)
    const user=req.user.userId;
    console.log(user)
    const clubQuery = `
        SELECT Fee AS fee, Club_StartDate AS startDate, Club_EndDate AS endDate
        FROM Club WHERE Board_mem = ?

    `;
    
    try {
        // Execute the query with the user ID
        const clubInfo = await db.query(clubQuery, [user]); // Assuming you're using a database library like MySQL
        console.log(clubInfo[0][0].startDate);
        if(clubInfo[0][0].startDate==null){
            res.status(200).json({message:'false'})
        }
        else{
             res.status(200).json({message:'true',
                data:clubInfo[0][0]
             })
        }
    } catch (error) {
        console.error('Error fetching club info:', error);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }

});



export {addClub,clubsOverview,clubRegister,clubRegistrationDetails,clubRegisteredByYou,clubOverviewByPresident,clubdelete,addSummary,clubInfoPresident}
export {checkIfBoardMember,checkClubRegStatus}