// import PizZip from 'pizzip';
// import Docxtemplater from 'docxtemplater';
// import fs from 'fs';
// import path from 'path';

// // Path to the logo and photos
// const LOGO_PATH = "LOGO.png";  // Replace with your actual logo path
// const PHOTO_PATHS = ["path_to_photo1.jpg", "path_to_photo2.jpg"]; // Replace with correct photo paths

// // Helper function to get the serial number
// function getSerialNumber() {
//     const serialFile = "serial_number.txt";
//     let serial = 1;

//     if (fs.existsSync(serialFile)) {
//         serial = parseInt(fs.readFileSync(serialFile, "utf8"));
//         serial += 1;
//     }
//     fs.writeFileSync(serialFile, serial.toString());

//     return serial;
// }

// // Function to generate the report
// function createOrUpdateReport(data) {
//     const fileName = "Activity_Report.docx";

//     let doc;
//     // If the document exists, we load it, otherwise, create a new one
//     if (fs.existsSync(fileName)) {
//         const content = fs.readFileSync(fileName, 'binary');
//         const zip = new PizZip(content);
//         doc = new Docxtemplater(zip);
//     } else {
//         // Use a template docx file with placeholders (to be created manually)
//         const templatePath = "template.docx"; // Your template path
//         const content = fs.readFileSync(templatePath, 'binary');
//         const zip = new PizZip(content);
//         doc = new Docxtemplater(zip);
//     }

//     // Get the current serial number
//     const sl_no = getSerialNumber();

//     // Prepare the data for the template
//     const docData = {
//         serialNumber: sl_no,
//         dateDuration: data.date_duration,
//         activityName: data.activity_name,
//         description: data.description,
//         photos: data.photos,
//         outcome: data.outcome,
//         pointsEarned: data.points_earned
//     };

//     // Replace the placeholders in the template with the actual data
//     doc.setData(docData);

//     try {
//         doc.render();  // Apply the data to the template
//     } catch (error) {
//         console.error(error);
//     }

//     // Create the output docx file
//     const buf = doc.getZip().generate({ type: 'nodebuffer' });
//     fs.writeFileSync(fileName, buf);
//     console.log(`Report updated successfully: ${fileName}`);
// }

// // Example input data
// const data = {
//     date_duration: "2025-01-20, 3 hours",
//     activity_name: "Wellness Program",
//     description: "Participants engaged in a wellness program focusing on mental and physical health.",
//     photos: PHOTO_PATHS, // Corrected paths to images
//     outcome: "Improved awareness of health practices.",
//     points_earned: "10 AICTE points"
// };

// // Call the function
// createOrUpdateReport(data);
