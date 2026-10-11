// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";


// cloudinary.config({ 
//         cloud_name: "dnga4gkbe", 
//         api_key: "776667111429756", 
//         api_secret: "BNc-wxA8kQXJzVSCn3vqlfvBz9w"
//     });


//     const uploadOnCloudinary = async (localFilePath)=>{
//         try{
//             if (fs.existsSync(localFilePath)) {
//                 console.log('File existing true:', localFilePath);
//             }
            
    
//             console.log("Uploading file from:", localFilePath);
    
//             if(!localFilePath) return null;
//             //upload the file on cloudinary
//             const response=await cloudinary.uploader.upload(
//                 localFilePath,
//                 {
//                     //any type of file
//                     resource_type:"auto"
//                 }
//             );
//             //file has been uploaded successfully
//             console.log(`File is uploaded in cloudinary ${response.url}`)
//             if (fs.existsSync(localFilePath)) {
//                 fs.unlinkSync(localFilePath);
//             }
//             return response;
//         }catch(error){
//             if (fs.existsSync(localFilePath)) {
//                 fs.unlinkSync(localFilePath);
//             }
            
//             console.error("Error uploading file to Cloudinary:", error);
//             //remove the locally saved temporary file as the upload
//             //operation got failed-->try uplaoding next tinme
//             return null;
//         }
//     }
    
//     export {uploadOnCloudinary}



import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configure Cloudinary with credentials from environment variables
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (fs.existsSync(localFilePath)) {
            console.log('File exists:', localFilePath);
        } else {
            console.error('File does not exist:', localFilePath);
            return null;
        }

        console.log("Uploading file from:", localFilePath);

        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw" // Specify raw for PDF uploads
        });

        // File has been uploaded successfully
        console.log(`File uploaded to Cloudinary: ${response.url}`);

        // Delete the local file after upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        // Ensure the local file is deleted if an error occurs
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };
