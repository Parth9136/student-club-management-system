import mongoose from "mongoose"
import {MONGODB_NAME} from "../constant.js"
import mysql from 'mysql2/promise';


const connectDB=( async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${MONGODB_NAME}`)
        console.log("MONGODB connected!!! ",connectionInstance.connection.host)
    } catch (error) {
        console.log("DB not connected");
        console.log( error);
        process.exit(1);
        
    }
})



// Create a 

const connectionSQL =(async ()=>{



   try{
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST || "localhost",
        database: process.env.MYSQL_DATABASE || "project",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || ""
    });
    // console.log("connected");
    return connection;

    }
    
    // Connect to the database
    catch (error) {
        console.log("SQL not connected");
        console.log( error);
        process.exit(1);
        
    }
    
   }

) 







export {connectionSQL}

export {connectDB}



