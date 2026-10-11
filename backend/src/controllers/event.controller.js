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



import {supabase} from '../utils/supabaseClient.js';


const eventRegistration=asyncHandler(async (req,res)=>{
    
    console.log(req.user);
    // const {eventName}=req.body;
    const  {eventId}= req.body;

    const db=await connectionSQL();
    const user = req.user;
    const userId=user.userId

    // const eventId=
    const query = 'SELECT Event_id FROM Club_Event WHERE Event_id = ?';

    const [result] = await db.execute(query, [eventId]);
    if (result.length === 0) {
        throw new ApiError(404, "Club not found");
    }

    if(!(eventId)){
        throw new ApiError(400,"please enter all the fields")
    }

    const checkRegistrationQuery =
        "SELECT COUNT(*) AS count FROM RegistersFor WHERE User_id = ? AND Event_id = ?";
    const checkEventQuery = "SELECT COUNT(*) AS count FROM Club_Event WHERE Event_id = ?";
    const insertRegisterQuery = "INSERT INTO RegistersFor (User_id, Event_id) VALUES (?, ?)";
    try {
        const [result] = await db.execute(checkRegistrationQuery, [userId, eventId]);

        if (result[0].count > 0) {
            return res.status(409).json({ message: "You have already registered for this event" });
        }
        // Check if the event exists
        const [eventExists] = await db.execute(checkEventQuery, [eventId]);

        if (eventExists[0].count === 0) {
            throw new ApiError(404, "Event not found");
        }

        // Add the user to the RegistersFor table
        await db.execute(insertRegisterQuery, [userId, eventId]);

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
    
   


})

// const AllCurrentEvent=asyncHandler(async(req,res)=>{
//     const db = await connectionSQL();

//    try {
//      const query = `
//          SELECT Event_id, Title, Summary, Fee, Points, Event_StartDate, Event_EndDate, Event_Time, Club_id
//          FROM Club_Event
//          WHERE Event_EndDate >= CURDATE();
//      `;
 
//      const [events] = await db.execute(query);
//      console.log(events)
//      return res.json(ApiResponse(200,{},events));
//    } catch (error) {
//     res.status(error.statusCode ).json({
//         success: error.success,
//         message: error.message,
//         errors: error.errors,
//         data: error.data,
//     });
//     console.log(error.message)
//    }





// })


const eventOverview = asyncHandler(async (req, res) => {
    const db = await connectionSQL();
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ message: "Please provide the User ID" });
    }

    const eventsQuery = `
        SELECT 
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
        WHERE ce.Dean_approval = TRUE
          AND ce.Event_EndDate >= CURDATE()
        ORDER BY ce.Event_StartDate;
    `;

    const userRegistrationQuery = `
        SELECT Event_id FROM RegistersFor WHERE User_id = ?
    `;

    try {
        const [events] = await db.execute(eventsQuery);
        if (events.length === 0) {
            return res.status(404).json({ message: "No dean-approved events found" });
        }

        const [userRegistrations] = await db.execute(userRegistrationQuery, [userId]);
        const registeredEventIds = userRegistrations.map(e => e.Event_id);

        const eventOverview = events.map(event => ({
            ...event,
            isRegistered: registeredEventIds.includes(event.Event_id)
        }));

        res.status(200).json({ events: eventOverview });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});

// 2. Only events user is registered for AND dean-approved
const eventRegisteredByYou = asyncHandler(async (req, res) => {
    const db = await connectionSQL();
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ message: "Please provide the User ID" });
    }

    const eventsQuery = `
        SELECT 
            ce.Event_id,
            ce.Title,
            ce.Summary,
            ce.Fee,
            ce.Points,
            ce.Event_StartDate,
            ce.Event_EndDate,
            ce.Event_Time
        FROM Club_Event ce
        WHERE ce.Dean_approval = TRUE
        ORDER BY ce.Event_StartDate;
    `;

    const userRegistrationQuery = `
        SELECT Event_id FROM RegistersFor WHERE User_id = ?
    `;

    try {
        const [events] = await db.execute(eventsQuery);
        if (events.length === 0) {
            return res.status(404).json({ message: "No dean-approved events found" });
        }

        const [userRegistrations] = await db.execute(userRegistrationQuery, [userId]);
        const registeredEventIds = userRegistrations.map(e => e.Event_id);

        const eventOverview = events
            .map(event => ({
                ...event,
                isRegistered: registeredEventIds.includes(event.Event_id)
            }))
            .filter(event => event.isRegistered);

        if (eventOverview.length === 0) {
            return res.status(404).json({ message: "User is not registered for any dean-approved events" });
        }

        res.status(200).json({ events: eventOverview });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal server error");
    }
});



const eventAdd=asyncHandler(async (req,res) => {
    console.log("hii")
    const { title, summary, fee, points, startDate, endDate, eventTime } = req.body;
    console.log(title, summary, fee, points, startDate, endDate, eventTime)
    const connection = await connectionSQL();
    const checkTitleQuery = `SELECT * FROM Club_Event WHERE Title = ?`;
    const [existingEvent] = await connection.execute(checkTitleQuery, [title]);

    if (existingEvent.length > 0) {
        return res.status(409).json({ message: "You  already added this event" });
    }
    const clubQuery = 'SELECT Club_id, Club_name, Club_Description FROM Club WHERE TRIM(Board_mem) = ?';
    const [clubs] = await connection.execute(clubQuery, [req.user.userId]);
    
    console.log(clubs);
    console.log(clubs[0].Club_name);
    const clubName=clubs[0].Club_name;




    if (!(title && startDate && endDate && eventTime && points &&clubName)) {
        throw new ApiError(400, "All required fields must be filled");
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if(start>end){
        throw new ApiError(400, "startdate must be lesser than end date");

    }
    const query = 'SELECT Club_id FROM Club WHERE Club_Name = ?';
    const [result] = await connection.execute(query, [clubName]);
    if (result.length === 0) {
        throw new ApiError(404, "Club not found");
    }
    const clubId = result[0].Club_id;

    try {
        // Check if the Club ID exists
        const [existingClub] = await connection.execute('SELECT * FROM Club WHERE Club_id = ?', [clubId]);
        if (existingClub.length === 0) {
            throw new ApiError(400, "Invalid Club ID. Club does not exist");
        }
    
        // Generate a unique Event ID (based on timestamp and random suffix)
        const eventId = clubName.slice(0, 2).toUpperCase() + Math.floor(100 + Math.random() * 900);
        const clubPresidentId = existingClub[0].Board_mem; // Assuming 'Board_mem' is the president's user ID

        // Check if the user is the president of the club
        console.log(clubPresidentId);



        // console.log(user.userId);
        // console.log(existingClub)
        const user = req.user;
        console.log(clubPresidentId)
        // console.log(user.userId)
        if (clubPresidentId != user.userId) {
            throw new ApiError(400, "Unauthorized: You cannot add event");
        }
    
        // Ensure Fee is a non-negative decimal (handled by the SQL CHECK constraint too)
        if (fee && parseFloat(fee) < 0) {
            throw new ApiError(400, "Fee cannot be negative");
        }
    
        // Insert Event details into the database
        const insertEventQuery = `
            INSERT INTO Club_Event (
                Event_id, Title, Summary, Fee, Points, Event_StartDate, Event_EndDate, Event_Time, Club_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        const eventValues = [
            eventId,
            title,
            summary || null, // Nullable field
            fee || null,     // Nullable field
            points,
            startDate,
            endDate,
            eventTime,
            clubId
        ];
    
        const [result] = await connection.execute(insertEventQuery, eventValues);
    
        if (result.affectedRows > 0) {
            res.status(200).json(new ApiResponse(200, { eventId, title, startDate, endDate, clubName }, "Event added successfully"));
        } else {
            throw new ApiError(500, "Failed to add event");
        }
    } catch (error) {
        console.error("Error adding event:", error);
        throw new ApiError(500, "Internal Server Error");
    } finally {
        await connection.end();
    }
})



// const eventOverviewOfPresident=asyncHandler(async (req,res)=>{
// console.log("event")


// try {
//     const userId = req.user.userId;
//     const db = await connectionSQL();

//     console.log("User ID:", userId);

//     // Fetch the club(s) where the user is a board member
//     const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
//     const [clubs] = await db.execute(clubQuery, [userId]);

//     if (clubs.length === 0) {
//         return res.status(404).json({ message: "No clubs found for the user." });
//     }

//     console.log("Clubs:", clubs);

//     // Fetch events for the first club (assuming one club per user for now)
//     const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
//     const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

//     if (events.length === 0) {
//         return res.status(409).json({ message: "You don't have any events." });
//     }

//     console.log("Events:", events);

//     // Fetch user registrations for these events
//     const eventIds = events.map(event => `'${event.Event_id}'`).join(', ');

//     const userRegistrationsQuery = `
//         SELECT RegistersFor.User_id, RegistersFor.Event_id, Club_Event.Title, Club_Event.Summary
//         FROM RegistersFor
//         INNER JOIN Club_Event ON RegistersFor.Event_id = Club_Event.Event_id
//         WHERE RegistersFor.Event_id IN (${eventIds})
//     `;

//     const [userRegistrations] = await db.execute(userRegistrationsQuery);

//     if (userRegistrations.length === 0) {
//         return res.status(404).json({ message: "No users are registered for any events." });
//     }

//     // Group registrations by event ID
//     const groupedUserRegistrations = userRegistrations.reduce((acc, registration) => {
//         if (!acc[registration.Event_id]) {
//             acc[registration.Event_id] = {
//                 title: registration.Title,
//                 description: registration.Summary,
//                 users: [],
//             };
//         }
//         acc[registration.Event_id].users.push(registration.User_id);
//         return acc;
//     }, {});

//     res.status(200).json({
//         message: "User registrations for the events",
//         registrations: groupedUserRegistrations
//     });

//     console.log("Final Response:", groupedUserRegistrations);

// } catch (error) {
//     console.error("Error fetching event registrations:", error.message);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
// }


const eventOverviewOfPresident = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId.trim(); // president’s user-id
    const db = await connectionSQL();

    // 1️⃣ Get the club where the user is a board member
    const [clubs] = await db.execute(
      `SELECT Club_id, Club_Name
       FROM   Club
       WHERE  TRIM(Board_mem) = ?`,
      [userId]
    );

    if (clubs.length === 0) {
      return res.status(404).json({ message: "No clubs found for the user." });
    }

    const clubId = clubs[0].Club_id;

    // 2️⃣ Get all events of the club along with any registered users
    const [rows] = await db.execute(
      `SELECT
          e.Event_id,
          e.Title,
          e.Summary,
          r.User_id AS RegisteredUser,
          e.Dean_approval
       FROM   Club_Event e
       LEFT JOIN RegistersFor r ON r.Event_id = e.Event_id
       WHERE  e.Club_id = ?
       ORDER BY e.Event_StartDate`,
      [clubId]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        message: "This club has no events yet.",
        events: []
      });
    }

    // 3️⃣ Group events and registrations
    const eventMap = new Map();

    rows.forEach(row => {
      if (!eventMap.has(row.Event_id)) {
        eventMap.set(row.Event_id, {
          eventId: row.Event_id,
          title: row.Title,
          description: row.Summary,
          dean_approval:row.Dean_approval,
          users: []
        });
      }
      if (row.RegisteredUser) {
        eventMap.get(row.Event_id).users.push(row.RegisteredUser);
      }
    });

    // Convert Map to array
    const eventsArray = Array.from(eventMap.values());

    res.status(200).json({
      message: "Event overview with registered users",
      events: eventsArray
    });

  } catch (error) {
    console.error("Error fetching event overview:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});





const eventOverviewOfPresidentVerify = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId.trim(); // president’s user-id
    const db = await connectionSQL();

    // 1️⃣ Get the club where the user is a board member
    const [clubs] = await db.execute(
      `SELECT Club_id, Club_Name
       FROM   Club
       WHERE  TRIM(Board_mem) = ?`,
      [userId]
    );

    if (clubs.length === 0) {
      return res.status(404).json({ message: "No clubs found for the user." });
    }

    const clubId = clubs[0].Club_id;

    // 2️⃣ Get all events of the club along with any registered users
    const [rows] = await db.execute(
      `SELECT
          e.Event_id,
          e.Title,
          e.Summary,
          r.User_id AS RegisteredUser
       FROM   Club_Event e
       LEFT JOIN RegistersFor r ON r.Event_id = e.Event_id
       WHERE  e.Club_id = ?
       ORDER BY e.Event_StartDate`,
      [clubId]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        message: "This club has no events yet.",
        events: []
      });
    }

    // 3️⃣ Group events and registrations
    const eventMap = new Map();

    rows.forEach(row => {
      if (!eventMap.has(row.Event_id)) {
        eventMap.set(row.Event_id, {
          eventId: row.Event_id,
          title: row.Title,
          description: row.Summary,
          users: []
        });
      }
      if (row.RegisteredUser) {
        eventMap.get(row.Event_id).users.push(row.RegisteredUser);
      }
    });

    // Convert Map to array
    const eventsArray = Array.from(eventMap.values());

    res.status(200).json({
      message: "Event overview with registered users",
      events: eventsArray
    });

  } catch (error) {
    console.error("Error fetching event overview:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// const eventOverviewOfPresidentOfEvent = asyncHandler(async (req, res) => {
//     console.log("event");

//     try {
//         const {eventId }= req.body; // Get eventId from request params
//         const userId = req.user.userId;
//         const db = await connectionSQL();
//         console.log(eventId)
//         // console.log("User ID:", userId);

//         // Fetch the club(s) where the user is a board member
//         const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
//         const [clubs] = await db.execute(clubQuery, [userId]);
    
//         if (clubs.length === 0) {
//             return res.status(404).json({ message: "No clubs found for the user." });
//         }

//         console.log("Clubs:", clubs);
        

//         const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
//     const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

//     if (events.length === 0) {
//         return res.status(409).json({ message: "You don't have any events." });
//     }

//         // console.log("Event:", events);

//         // Fetch user registrations for the specified event, along with user details (USN, name, phone_number)
//         const userRegistrationsQuery = `
//             SELECT 
//                 RegistersFor.User_id, 
//                 AppUser.User_id AS USN, 
               
//                 AppUser.FName AS name,
//                 AppUser.Phone_no AS phone_number
//             FROM RegistersFor
//             INNER JOIN AppUser ON AppUser.User_id = RegistersFor.User_id
//             WHERE RegistersFor.Event_id = ?
//         `;

//         const [userRegistrations] = await db.execute(userRegistrationsQuery, [eventId]);

//         if (userRegistrations.length === 0) {
//             return res.status(404).json({ message: "No users are registered for this event." });
//         }

//         // Format the response to return user details
//         const users = userRegistrations.map(registration => ({
//             USN: registration.USN,
//             name: registration.name,
//             phone_number: registration.phone_number
//         }));

//         res.status(200).json({
//             message: "User registrations for the event",
//             event_id: eventId,
//             users: users
//         });

//         console.log("Final Response:", users);

//     } catch (error) {
//         console.error("Error fetching event registrations:", error.message);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// });
// const eventOverviewOfPresidentOfEvent = asyncHandler(async (req, res) => {
//     console.log("event");

//     try {
//         const { eventId } = req.body;
//         const userId = req.user.userId;
//         const db = await connectionSQL();

//         if (!eventId) {
//             return res.status(400).json({ message: "Event ID is required." });
//         }

//         // Fetch the club(s) where the user is a board member
//         const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
//         const [clubs] = await db.execute(clubQuery, [userId]);

//         if (clubs.length === 0) {
//             return res.status(404).json({ message: "No clubs found for the user." });
//         }

//         const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
//         const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

//         if (events.length === 0) {
//             return res.status(409).json({ message: "You don't have any events." });
//         }

//         // Fetch user registrations with proof URL
//         const userRegistrationsQuery = `
//             SELECT 
//                 RegistersFor.User_id, 
//                 AppUser.User_id AS USN, 
//                 AppUser.FName AS name,
//                 AppUser.Phone_no AS phone_number,
//                 RegistersFor.attendance AS attendance,
//                 Event_Images.ImageURL AS proof_url
//             FROM RegistersFor
//             INNER JOIN AppUser ON AppUser.User_id = RegistersFor.User_id
//             LEFT JOIN Event_Images 
//                 ON Event_Images.User_id = RegistersFor.User_id 
//                 AND Event_Images.Event_id = RegistersFor.Event_id
//             WHERE RegistersFor.Event_id = ?
//         `;

//         const [userRegistrations] = await db.execute(userRegistrationsQuery, [eventId]);

//         if (userRegistrations.length === 0) {
//             return res.status(404).json({ message: "No users are registered for this event." });
//         }

//         // Format users with URL
//         const users = userRegistrations.map(registration => ({
//             USN: registration.USN,
//             name: registration.name,
//             phone_number: registration.phone_number,
//             attendance: registration.attendance,
//             proof_url: registration.proof_url || null
//         }));

//         res.status(200).json({
//             message: "User registrations for the event",
//             event_id: eventId,
//             users: users
//         });

//         console.log("Final Response:", users);

//     } catch (error) {
//         console.error("Error fetching event registrations:", error.message);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// });


// const eventOverviewOfPresidentOfEvent = asyncHandler(async (req, res) => {
//     console.log("event");

//     try {
//         const { eventId } = req.body; // Get eventId from request body
//         const userId = req.user.userId;
//         const db = await connectionSQL();
//         console.log(eventId);

//         // Fetch the club(s) where the user is a board member
//         const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
//         const [clubs] = await db.execute(clubQuery, [userId]);

//         if (clubs.length === 0) {
//             return res.status(404).json({ message: "No clubs found for the user." });
//         }

//         console.log("Clubs:", clubs);

//         const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
//         const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

//         if (events.length === 0) {
//             return res.status(409).json({ message: "You don't have any events." });
//         }

//         // Fetch user registrations for the specified event, along with user details (USN, name, phone_number)
//         const userRegistrationsQuery = `
//             SELECT 
//                 RegistersFor.User_id, 
//                 AppUser.User_id AS USN, 
//                 AppUser.FName AS name,
//                 AppUser.Phone_no AS phone_number,
//                 RegistersFor.attendance AS attendance,
//                 Event_Images.ImageURL AS proof_url
//             FROM RegistersFor
//             INNER JOIN AppUser ON AppUser.User_id = RegistersFor.User_id
//             LEFT JOIN Event_Images 
//                 ON Event_Images.User_id = RegistersFor.User_id 
//                 AND Event_Images.Event_id = RegistersFor.Event_id
//             WHERE RegistersFor.Event_id = ?
//         `;

//         const [userRegistrations] = await db.execute(userRegistrationsQuery, [eventId]);

//         if (userRegistrations.length === 0) {
//             return res.status(404).json({ message: "No users are registered for this event." });
//         }

//         // Group by USN to avoid duplicates and collect proof URLs
//         const userMap = {};

//         userRegistrations.forEach(reg => {
//             if (!userMap[reg.USN]) {
//                 userMap[reg.USN] = {
//                     USN: reg.USN,
//                     name: reg.name,
//                     phone_number: reg.phone_number,
//                     attendance: reg.attendance,
//                     proof_urls: reg.proof_url ? [reg.proof_url] : []
//                 };
//             } else if (reg.proof_url) {
//                 userMap[reg.USN].proof_urls.push(reg.proof_url);
//             }
//         });

//         const users = Object.values(userMap);

//         res.status(200).json({
//             message: "User registrations for the event",
//             event_id: eventId,
//             users: users
//         });

//         console.log("Final Response:", users);

//     } catch (error) {
//         console.error("Error fetching event registrations:", error.message);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// });

const eventOverviewOfPresidentOfEvent = asyncHandler(async (req, res) => {
    console.log("event");

    try {
        const { eventId } = req.body;
        const userId = req.user.userId;
        const db = await connectionSQL();
        console.log(eventId);

        // Fetch the club(s) where the user is a board member
        const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
        const [clubs] = await db.execute(clubQuery, [userId]);

        if (clubs.length === 0) {
            return res.status(404).json({ message: "No clubs found for the user." });
        }

        console.log("Clubs:", clubs);

        // Fetch events for that club
        const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
        const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

        if (events.length === 0) {
            return res.status(409).json({ message: "You don't have any events." });
        }

        // Fetch user registrations and event image URLs
        const userRegistrationsQuery = `
            SELECT 
                RegistersFor.User_id, 
                AppUser.User_id AS USN, 
                AppUser.FName AS name,
                AppUser.Phone_no AS phone_number,
                RegistersFor.attendance AS attendance,
                Event_Images.ImageURL AS proof_url
            FROM RegistersFor
            INNER JOIN AppUser ON AppUser.User_id = RegistersFor.User_id
            LEFT JOIN Event_Images 
                ON Event_Images.User_id = RegistersFor.User_id 
                AND Event_Images.Event_id = RegistersFor.Event_id
            WHERE RegistersFor.Event_id = ?
        `;

        const [userRegistrations] = await db.execute(userRegistrationsQuery, [eventId]);

        if (userRegistrations.length === 0) {
            return res.status(404).json({ message: "No users are registered for this event." });
        }

        // Group by unique USN and keep only the first proof_url
        const userMap = {};

        userRegistrations.forEach(reg => {
            if (!userMap[reg.USN]) {
                userMap[reg.USN] = {
                    USN: reg.USN,
                    name: reg.name,
                    phone_number: reg.phone_number,
                    attendance: reg.attendance,
                    proof_url: reg.proof_url || null
                };
            } else if (!userMap[reg.USN].proof_url && reg.proof_url) {
                userMap[reg.USN].proof_url = reg.proof_url;
            }
        });

        const users = Object.values(userMap);

        res.status(200).json({
            message: "User registrations for the event",
            event_id: eventId,
            users: users
        });

        console.log("Final Response:", users);

    } catch (error) {
        console.error("Error fetching event registrations:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// const eventOverViewAllEvents=asyncHandler(async(req,res)=>{
//     console.log("event");
//     console.log(req.user)
//     console.log("yesheere");


//     try {
//         const userId = req.user.userId;
//         const db = await connectionSQL();

//         console.log("User ID:", userId);

//         // Fetch the club(s) where the user is a board member
//         const clubQuery = 'SELECT * FROM Club WHERE TRIM(Board_mem) = ?';
//         const [clubs] = await db.execute(clubQuery, [userId]);

//         if (clubs.length === 0) {
//             return res.status(404).json({ message: "No clubs found for the user." });
//         }

//         console.log("Clubs:", clubs);

//         // Fetch events for the first club (assuming one club per user for now)
//         const eventQuery = 'SELECT * FROM Club_Event WHERE Club_id = ?';
//         const [events] = await db.execute(eventQuery, [clubs[0].Club_id]);

//         if (events.length === 0) {
//             return res.status(409).json({ message: "You don't have any events." });
//         }

//         console.log("Events:", events);

//         // Fetch user registrations for these events
//         const eventIds = events.map(event => `'${event.Event_id}'`).join(', ');

//         const userRegistrationsQuery = `
//             SELECT RegistersFor.User_id, RegistersFor.Event_id, Club_Event.Title, Club_Event.Summary
//             FROM RegistersFor
//             INNER JOIN Club_Event ON RegistersFor.Event_id = Club_Event.Event_id
//             WHERE RegistersFor.Event_id IN (${eventIds}) AND RegistersFor.User_id = ?
//         `;

//         const [userRegistrations] = await db.execute(userRegistrationsQuery, [userId]);

//         // Create a set of event ids the user is registered for
//         const registeredEventIds = new Set(userRegistrations.map(reg => reg.Event_id));

//         // Filter out events where the user is already registered
//         const filteredEvents = events.filter(event => !registeredEventIds.has(event.Event_id));

//         if (filteredEvents.length === 0) {
//             return res.status(404).json({ message: "No events available that you are not registered for." });
//         }
        

//         // Prepare the response
//         const eventDetails = filteredEvents.map(event => ({
//             eventId: event.Event_id,
//             title: event.Title,
//             summary: event.Summary,
//         }));
    
//         console.log("Final Response:", eventDetails);

//         res.status(200).json({
//             message: "Events you are not registered for",
//             events: eventDetails
//         });

//     } catch (error) {
//         console.error("Error fetching event registrations:", error.message);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// })
const eventOverViewAllEvents = asyncHandler(async (req, res) => {
    console.log("event");
    console.log(req.user);
    console.log("yesheere");

    try {
        const userId = req.user.userId;
        const db = await connectionSQL();

        console.log("User ID:", userId);

        // Fetch all events in the "Footprints" club
        const eventQuery = `
            SELECT Club_Event.*
            FROM Club_Event
            JOIN Club ON Club_Event.Club_id = Club.Club_id
            WHERE TRIM(Club.Club_name) = ?
        `;
        const [events] = await db.execute(eventQuery,[userId]);
        console.log("here")

        if (events.length === 0) {
            return res.status(201).json({ message: "No" });
        }else{
        
        

        

        // Format response with all event details
        const eventDetails = events.map(event => ({
            eventId: event.Event_id,
            title: event.Title,
            summary: event.Summary,
            fee: event.Fee,
            points: event.Points,
            startDate: event.Event_StartDate,
            endDate: event.Event_EndDate,
            time: event.Event_Time
        }));
    

        console.log("Final Response:", eventDetails);

        res.status(200).json({
            message: "All events in the Footprints club",
            events: eventDetails
        });
    }
    } catch (error) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});




const eventParticipatedByYou=asyncHandler(async (req,res)=>{
    const db = await connectionSQL();
    const userId = req.user.userId; // Assuming userId is passed through the request (authenticated user)
    
    if (!userId) {
        return res.status(400).json({ message: "Please provide the User ID" });
    }
    
    // Query to get all events
    const eventsQuery = `
        SELECT 
            Event_id,
            Title,
            Summary,
            Fee,
            Points,
            Event_StartDate,
            Event_EndDate,
            Event_Time
        FROM Club_Event
        ORDER BY Event_StartDate;
    `;
    
    // Query to check if the user is registered and their attendance status
    const userRegistrationQuery = `
        SELECT Event_id, attendance 
        FROM RegistersFor 
        WHERE User_id = ?
    `;
    
    try {
        // Fetch all events
        const [events] = await db.execute(eventsQuery);
    
        if (events.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }
    
        // Fetch user registrations and attendance status
        const [userRegistrations] = await db.execute(userRegistrationQuery, [userId]);
    
        // Create a map of registered events with their attendance status
        const registrationMap = userRegistrations.reduce((acc, { Event_id, attendance }) => {
            acc[Event_id] = attendance;
            return acc;
        }, {});
    
        // Attach registration and attendance status to each event and filter only attended events
        const attendedEvents = events
            .map(event => ({
                ...event,
                isRegistered: registrationMap.hasOwnProperty(event.Event_id),
                attendance: registrationMap[event.Event_id] || "no" // Default to 'no' if not found
            }))
            .filter(event => event.isRegistered && event.attendance === "yes"); // Only return attended events
    
        if (attendedEvents.length === 0) {
            return res.status(404).json({ message: "User has not attended any events" });
        }
    
        res.status(200).json({
            attendedEvents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
})



const markAttendenceByPresident=asyncHandler(async(req,res)=>{

    try {
        const { eventid, userid, attendance } = req.body; // Extract data from request body
        const db = await connectionSQL();
    
        if (!eventid || !userid || !attendance) {
            return res.status(400).json({ message: "Event ID, User ID, and Attendance status are required." });
        }
        const checkRegistrationQueryy = 'SELECT * FROM RegistersFor WHERE Event_id = ? AND User_id = ?';
        const [registrationn] = await db.execute(checkRegistrationQueryy, [eventid, userid]);
    
        if (registrationn.length === 0) {
            return res.status(404).json({ message: "User is not registered for this event." });
        }
        console.log("heree")
        console.log(registrationn[0].attendance)
        console.log(registrationn[0].attendance === 'yes')
        console.log(attendance ==='yes')
        // Check if the attendance is already 'yes'
        if (registrationn[0].attendance === 'yes' && attendance ==='yes') {
            return res.json(new ApiResponse(200,{},"marked yes already"))
        }



     
    

        console.log("Event ID:", eventid);
        console.log("User ID:", userid);
        console.log("Attendance:", attendance);
    
        // Check if the user is registered for the event
        const checkRegistrationQuery = 'SELECT * FROM RegistersFor WHERE Event_id = ? AND User_id = ?';
        const [registration] = await db.execute(checkRegistrationQuery, [eventid, userid]);
    
        if (registration.length === 0) {
            return res.status(404).json({ message: "User is not registered for this event." });
        }
    
        console.log("User is registered. Proceeding to update attendance.");
  








        const eventPointsQuery = 'SELECT Points FROM Club_Event WHERE Event_id = ?';
            const [event] = await db.execute(eventPointsQuery, [eventid]);
        
            if (event.length === 0) {
                return res.status(404).json({ message: "Event not found." });
            }
        
            const eventPoints = event[0].Points;


        console.log(eventPoints)
    



        const getUserPointsQuery = 'SELECT ActivityPoint FROM AppUser WHERE User_id = ?';
            const [user] = await db.execute(getUserPointsQuery, [userid]);
        
            if (user.length === 0) {
                return res.status(404).json({ message: "User not found." });
            }
        
            const currentActivityPoints = user[0].ActivityPoint;
        // console.log(currentActivityPoints)
            // Add the event's points to the current activity points


            let updatedActivityPoints=0;
            if (registrationn[0].attendance === 'no' && attendance ==='yes') {
                // return res.json(new ApiResponse(200,{},"marked yes already"))
                console.log("notoyes")
                updatedActivityPoints=currentActivityPoints + eventPoints;
            }
            if (registrationn[0].attendance === 'yes' && attendance ==='no') {
                // return res.json(new ApiResponse(200,{},"marked yes already"))
                console.log("notoyes")
                updatedActivityPoints=currentActivityPoints - eventPoints;
            }
            console.log(updatedActivityPoints)



        
            // Update the user's activity points in the AppUser table
            const updateUserPointsQuery = `
                UPDATE AppUser
                SET ActivityPoint = ?
                WHERE User_id = ?
            `;
            await db.execute(updateUserPointsQuery, [updatedActivityPoints, userid]);

        console.log(updatedActivityPoints)




        const updateAttendanceQuery = `
            UPDATE RegistersFor 
            SET attendance = ? 
            WHERE Event_id = ? AND User_id = ?
        `;
        await db.execute(updateAttendanceQuery, [attendance, eventid, userid]);
    
        res.status(200).json({
            message: "Attendance updated successfully.",
            eventid,
            userid,
            attendance
        });
    
        console.log("Attendance updated successfully for User ID:", userid);
    
    } catch (error) {
        console.error("Error updating attendance:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
   
})



const showAttendance = asyncHandler(async (req, res) => {
    try {
        const { eventid, userid } = req.body; // Extract data from request body
        const db = await connectionSQL();

        if (!eventid || !userid) {
            return res.status(400).json({ message: "Event ID and User ID are required." });
        }

        // Check if the user is registered for the event
        const checkRegistrationQuery = 'SELECT * FROM RegistersFor WHERE Event_id = ? AND User_id = ?';
        const [registration] = await db.execute(checkRegistrationQuery, [eventid, userid]);

        if (registration.length === 0) {
            return res.status(404).json({ message: "User is not registered for this event." });
        }

        // Get the attendance status of the user for the event
        const currentAttendance = registration[0].attendance;
        
        // Send the current attendance status as a response
        res.status(200).json({
            message: `Attendance status for User ID: ${userid} in Event ID: ${eventid}`,
            attendance: currentAttendance,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});



const activityPointView=asyncHandler(async (req,res)=>{
    const db = await connectionSQL();
    // const connection = await pool.getConnection();
    const userId = req.user.userId; // Assuming userId is passed through the request (authenticated user)

if (!userId) {
    return res.status(400).json({ message: "Please provide the User ID" });
}

// Query to check if the user is registered and their attendance status
const userAttendanceQuery = `
    SELECT 
        r.Event_id, 
        e.Title,  
        r.attendance, 
        e.Points
    FROM RegistersFor r
    INNER JOIN Club_Event e ON r.Event_id = e.Event_id
    WHERE r.User_id = ? AND r.attendance = 'yes'
`;



try {
    // Fetch attended events with points
    const [attendedEvents] = await db.execute(userAttendanceQuery, [userId]);

    if (attendedEvents.length === 0) {
        return res.status(200).json({ message: "User has not attended any events" });
    }
    else{
    const totalPoints = attendedEvents.reduce((sum, event) => sum + event.Points, 0);
    console.log(888)
    res.status(200).json({
        attendedEvents,
        totalPoints
    });
}
} catch (error) {
    console.error(error);
    console.log("activityhereerror")
    res.status(500).json({ message: "Internal server error" });
}

})


const eventDelete=asyncHandler(async (req,res)=>{

const connection = await connectionSQL();

try {
    const { eventName } = req.body; // Get eventName from request body

    if (!eventName) {
        throw new ApiError(400, "Event name is required");
    }

    // Check if the event exists
    const [existingEvent] = await connection.execute('SELECT * FROM Club_Event WHERE Title = ?', [eventName]);

    if (existingEvent.length === 0) {
        throw new ApiError(404, "Event not found");
    }

    // Delete the event
    const deleteQuery = 'DELETE FROM Club_Event WHERE Title = ?';
    const [result] = await connection.execute(deleteQuery, [eventName]);

    if (result.affectedRows > 0) {
        res.status(200).json(new ApiResponse(200, { eventName }, "Event deleted successfully"));
    } else {
        throw new ApiError(500, "Failed to delete the event");
    }

} catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
} finally {
    if (connection) await connection.end();
}

})



//adding event ids anyone event participant and organizer can add event images


const addEventImage=asyncHandler(async(req,res)=>{

    const db = await connectionSQL();

try {
    const files = req.files; // Multiple image files from the request
    
    if (!files || files.length === 0) {
        throw new ApiError(400, "No files uploaded");
    }
    
    const eventName = req.body.eventName; // Get event name from request body
    
    if (!eventName) {
        throw new ApiError(400, "Event name is required");
    }
    
    // Step 1: Get Event ID using the event name
    const [eventRows] = await db.query(
        `SELECT Event_id FROM Club_Event WHERE Title = ?`, 
        [eventName]
    );
    
    if (eventRows.length === 0) {
        throw new ApiError(404, "Event not found");
    }
    
    const eventId = eventRows[0].Event_id; // Get event ID
    
    // Step 2: Upload each image and store URL in the database
    for (const file of files) {
        const uploadedImage = await uploadOnCloudinary(file.path); // Upload to Cloudinary
    
        if (!uploadedImage || !uploadedImage.url) {
            throw new ApiError(400, "Image upload failed");
        }
    
        console.log("Uploaded Image URL:", uploadedImage.url);
    
        // Step 3: Insert Image URL into Event_Images table
        await db.query(
            `INSERT INTO Event_Images (Event_id, ImageURL) VALUES (?, ?)`,
            [eventId, uploadedImage.url]
        );
    }
    
    res.json({ message: "Images uploaded successfully", eventId });
} catch (error) {
    res.status(error.statusCode ).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data,
    });
    console.log(error.message)
}



})





const eventImagesView=asyncHandler(async (req,res)=>{
    const db = await connectionSQL();
    console.log("here")
    try {
        // Assuming the event name is passed in the request query (e.g., ?eventName=Event1)
        const { eventName } = req.body;
        console.log(eventName)


        if (!eventName) {
            return res.status(400).json({ message: "Event name is required" });
        }

        // Query to get the Event_id using the Event_name
        const eventQuery = `SELECT Event_id FROM Club_Event WHERE Title = ?`;
        const [eventResult] = await db.execute(eventQuery, [eventName]);

        if (eventResult.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        const eventId = eventResult[0].Event_id;

        // Query to get the image URLs associated with the event_id
        const imagesQuery = `SELECT ImageURL FROM Event_Images WHERE Event_id = ?`;
        const [imageResults] = await db.execute(imagesQuery, [eventId]);

        console.log(imageResults)
        if (imageResults.length === 0) {
            return res.status(404).json({ message: "No images found for this event" });
        }

        // Send the image URLs as a response
        res.status(200).json({
            eventName,
            images: imageResults.map((image) => image.ImageURL),
        });
    } catch (error) {
        console.error("Error fetching event images:", error);
        res.status(500).json({ message: "Server error" });
    }finally{
        db.end();
    }
})








import { PythonShell } from 'python-shell';
// import {uploadOnCloudinary} from "../utils/cloudinary.js"


const report= (req,res)=>{
   try {
     console.log(req.user);
     console.log(req.user.userId);
     const user=req.user.userId;
     console.log("hi");
 
     let options = {
         scriptPath: "E:/El_CLUB_SQL/backend/src/controllers", // Use forward slashes or escaped backslashes
         mode: 'text',
         args:[user]
     };
 
     console.log("here");
 
 
     const timeout = setTimeout(async () => {
         // If 10 seconds pass without a response, return a timeout message
         // res.status(408).json({ message: "Request timeout" });
         console.log("timeout")
         console.log("Report_Activity.docx")
         const coverImageLocalPath = "Report_Activity.docx";
         console.log(coverImageLocalPath)
         if (!coverImageLocalPath) {
             throw new ApiError(400, "Local path not found");
         }
 
         const coverImage = await uploadOnCloudinary(coverImageLocalPath);
         console.log(coverImage.url)
         const url=coverImage.url
         res.status(200).json(new ApiResponse(200, { url }, "generated"));

 
     }, 10000);  // 10 seconds timeout
     
 
     PythonShell.run("tryyyy.py", options, (err, pythonResult) => {
         console.log("here");
 
         if (err) {
             console.error("Error executing Python script:", err);
             return res.status(500).json({ message: "Error executing Python script", error: err });
         }
         
         // console.log("Python script output:", pythonResult);
         const resultString = pythonResult.join('');
         
         // Send the result back to the client
     });
 
    //  return res.status(200).json(new ApiResponse(200,{url},"generated"))

   } catch (error) {
    res.status(error.statusCode ).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data,
    });
    console.log(error.message)
   }

   
}
import fs from 'fs';



const addEventImageProof = asyncHandler(async (req, res) => {
  const db = await connectionSQL();
  const file = req.file; // ✅ Single image file
  const eventId = req.body.eventId;
  const userId = req.user.userId;

  console.log("User ID:", userId);

  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }
  if (!eventId) {
    throw new ApiError(400, "Event ID is required");
  }

  // 1️⃣ Verify event exists
  const [eventRows] = await db.query(
    "SELECT Event_id FROM Club_Event WHERE Event_id = ?",
    [eventId]
  );
  if (eventRows.length === 0) {
    throw new ApiError(404, "Event not found");
  }

  // 2️⃣ Upload to Cloudinary
  const uploaded = await uploadOnCloudinary(file.path);
  if (!uploaded?.url) {
    throw new ApiError(400, "Image upload failed");
  }

  // 3️⃣ Save to database
  await db.query(
    `INSERT INTO Event_Images (Event_id, User_id, ImageURL) VALUES (?, ?, ?)`,
    [eventId, userId, uploaded.url]
  );

  // Optional: remove temp file
  fs.unlink(file.path, (err) => {
    if (err) console.warn("Temp file not deleted:", file.path);
  });

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    eventId,
    imageUrl: uploaded.url,
  });
});


const fetchprooforg=asyncHandler(async(req,res)=>{

})



const eventAddPdf = asyncHandler(async (req, res) => {
  const db      = await connectionSQL();
  const file    = req.file;            // pdfUpload middleware puts it here
  const { eventId } = req.body;
  console.log("file")
  console.log(file)
  console.log("eventid")
  console.log(eventId)        // send Event_id in body

  if (!file)          return res.status(400).json({ message: "No PDF uploaded" });
  if (!eventId)       return res.status(400).json({ message: "Event ID required" });

 
  const [rows] = await db.query(
    "SELECT Event_id FROM Club_Event WHERE Event_id = ?", [eventId]
  );
  if (rows.length === 0)
    return res.status(404).json({ message: "Event not found" });

 
  const uploaded = await uploadOnCloudinary(file.path, { resource_type: "raw" });
  if (!uploaded?.url)
    return res.status(500).json({ message: "PDF upload failed" });

  
//   await db.query(
//     "UPDATE Club_Event SET Dean_approvalPdF = ? WHERE Event_id = ?",
//     [uploaded.url, eventId]
//   );

//   // optional: remove temp file
//   fs.unlink(file.path, () => {});

//   res.status(200).json({
//     message: "Dean-approval PDF stored",
//     event_id: eventId,
//     pdf_url: uploaded.url
//   });
const [updateResult] = await db.query(
  "UPDATE Club_Event SET Dean_approvalPdF = ? WHERE Event_id = ?",
  [uploaded.url, eventId]
);

// Ensure update was successful
if (updateResult.affectedRows === 0) {
  throw new ApiError(500, "Failed to update Dean approval PDF URL in database");
}

// Optional: Remove temporary file only after successful DB update
fs.unlink(file.path, (err) => {
  if (err) {
    console.error("Failed to delete temp file:", err);
  }
});

res.status(200).json({
  message: "Dean-approval PDF stored",
  event_id: eventId,
  pdf_url: uploaded.url
});




});


// routes/documents.js (updated)
const supeventadd = asyncHandler(async (req, res) => {
  const db = await connectionSQL();
  const file = req.file;
  const { eventId } = req.body;

  if (!file) return res.status(400).json({ message: 'No PDF uploaded' });
  if (!eventId) return res.status(400).json({ message: 'Event ID required' });

  // 1. Sanitize filename (critical fix)
  const sanitizeFileName = (filename) => {
    return filename.replace(/[\[\]{}()*+?^$\\|<>#%&!'"`~:;@=]/g, '_');
  };
  const safeFileName = sanitizeFileName(file.originalname);

  // 2. Create object path with sanitized name
  const objectPath = `events/${eventId}/${Date.now()}_${safeFileName}`;

  try {
    // 3. Upload to Supabase (with error handling)
    const { error: uploadError } = await supabase.storage
      .from('clubmanagment')
      .upload(objectPath, file.buffer, {
        contentType: 'application/pdf', // explicit type
        cacheControl: '3600',
        upsert: false,
        contentDisposition: 'inline' // for browser preview
      });

    if (uploadError) throw uploadError;

    // 4. Generate public URL (format: https://[project-ref].supabase.co/storage/v1/object/public/[bucket]/[path])
    const { data: { publicUrl } } = supabase.storage
      .from('clubmanagment')
      .getPublicUrl(objectPath);

    // 5. Save to database
    await db.query(
      'UPDATE Club_Event SET Dean_approvalPdF = ? WHERE Event_id = ?',
      [publicUrl, eventId]
    );

    res.status(200).json({
      message: 'PDF stored successfully',
      pdf_url: publicUrl, // Use this URL to access the PDF
      example_url: `https://${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://','')}/storage/v1/object/public/clubmanagment/${objectPath}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'PDF processing failed',
      details: error.message
    });
  }
});




export {eventRegistration,eventAdd,eventOverview,eventRegisteredByYou,eventOverviewOfPresident,eventParticipatedByYou,markAttendenceByPresident,activityPointView,eventDelete,addEventImage,report,eventImagesView}
export {eventOverViewAllEvents,eventOverviewOfPresidentOfEvent,showAttendance,addEventImageProof,eventOverviewOfPresidentVerify,eventAddPdf,supeventadd}