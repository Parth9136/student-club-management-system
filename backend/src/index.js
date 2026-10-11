import dotenv from "dotenv"
import {connectDB} from "./db/index.js"

import {app} from "./app.js"


import {connectionSQL} from "./db/index.js"

import mysql from 'mysql2/promise';

dotenv.config();

console.log("started");
// Connect to MongoDB
connectDB()
    .then(() => {
        console.log("MongoDB connected");

        // Connect to MySQL
        connectionSQL()
            .then(() => {
                console.log("MySQL connected");

                // Start the server only after both connections
                app.listen(process.env.PORT, () => {
                    console.log(`Server is listening on port ${process.env.PORT}`);
                });
            })
            .catch((error) => {
                console.error("Error connecting to MySQL:", error);
            });


// // Simple function to insert data into MySQL without using export
// async function insertAppUser() {
//     // const connection = await mysql.createConnection({
//     //     host: "localhost",
//     //     user: "root",
//     //     password: "anusha",
//     //     database: "project",
//     // });
//     const connection=await connectionSQL();
//     console.log(connection)

//     const sql = `
//         INSERT INTO AppUser (User_id, FName, MName, LName, Email, Phone_no, StartYear, Branch, ActivityPoint, PasswordHash, Role)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const userData = [
//         'U00722', 
//         'Jane', 
//         'A.', 
//         'Smith', 
//         'an.smith@example.com', 
//         '9876543210', 
//         '2022', 
//         'IT', 
//         0, 
//         'v', 
//         'User'
//     ];

//     try {
//         const [result] = await connection.execute(sql, userData);
//         console.log(`Inserted ${result.affectedRows} row(s)`);
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     } finally {
//         await connection.end();
//     }
// }

// // Call the function
// insertAppUser();


            
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

