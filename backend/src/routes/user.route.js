import {Router} from "express";

import {updateOrganizer,userRegister,userLogin,userLogout,changecurrentPassword,userinfo,resetPassword,verifyemail,resetpasswordOtp,forgotPasswordAddUserID,getCounsellorDetailsForUser} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {addClub,clubsOverview,clubRegister,clubRegistrationDetails,clubRegisteredByYou,clubOverviewByPresident,clubdelete,addSummary,clubInfoPresident,checkIfBoardMember,checkClubRegStatus} from "../controllers/club.controller.js"


import {counsellorLogin,getCounsellorEmails,counsellorStudentList,getStudentsWithEvents,updateCounsellorDetails,getCounsellorDetails}  from "../controllers/counsellor.controller.js";
import {deanLogin,deanRegister,OrganizerRegister,viewOrganizer,viewEventsUnderClub,CounsellorRegister,deanevent,deanApprove,EventForapproval} from "../controllers/dean.controller.js"
import {eventRegistration,eventAdd,eventOverview,eventRegisteredByYou,eventOverviewOfPresident,eventParticipatedByYou,markAttendenceByPresident,activityPointView,eventDelete,addEventImage,report,eventImagesView,eventOverViewAllEvents,eventOverviewOfPresidentOfEvent,showAttendance,addEventImageProof,eventOverviewOfPresidentVerify,eventAddPdf,supeventadd} from "../controllers/event.controller.js"
import {verifyPresident} from "../middlewares/president.middleware.js";
import {verifyDean} from "../middlewares/dean.middleware.js";
import {verifyCounsellor} from "../middlewares/counsellor.middleware.js";


import {upload} from "../middlewares/multer.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const userRoute =Router(); 

userRoute.route("/register").post(userRegister);

userRoute.route("/deanApprove").post(verifyJWT,verifyDean,deanApprove);

userRoute.route("/login").post(userLogin);

userRoute.route("/logout").get(verifyJWT,userLogout)
userRoute.route("/counsellorLogin").post(verifyJWT,counsellorLogin)

userRoute.route("/changepassword").post(verifyJWT,changecurrentPassword)

userRoute.route("/resetPassword").post(resetPassword)

userRoute.route("/supeventadd").post(upload.single("coverImage"),supeventadd)



userRoute.route("/forgotPasswordAddUserID").post(forgotPasswordAddUserID)
userRoute.route("/resetpasswordOtp").post(resetpasswordOtp)


userRoute.route("/addclub").post(verifyJWT,verifyPresident,upload.single("coverImage"),addClub)

userRoute.route("/eventAddPdf").post(verifyJWT,verifyPresident,upload.single("coverImage"),eventAddPdf)

userRoute.route("/addEventImage").post(verifyJWT,upload.array("coverImage",2),addEventImage)



userRoute.route("/addEventImageProof").post(verifyJWT,upload.single("coverImage"),addEventImageProof)








userRoute.route("/checkIfBoardMember").get(verifyJWT,verifyPresident,checkIfBoardMember)


userRoute.route("/checkClubRegStatus").get(verifyJWT,verifyPresident,checkClubRegStatus)


userRoute.route("/updateOrganizer").post(verifyJWT,verifyPresident,updateOrganizer)


userRoute.route("/clubregdetails").post(verifyJWT,verifyPresident,clubRegistrationDetails)

userRoute.route("/clubpage").get(verifyJWT,clubsOverview)

userRoute.route("/clubInfoPresident").get(verifyJWT,clubInfoPresident)


userRoute.route("/clubRegisteredByYou").get(verifyJWT,clubRegisteredByYou)


userRoute.route("/clubregister").post(verifyJWT,clubRegister)


userRoute.route("/eventregister").post(verifyJWT,eventRegistration);

userRoute.route("/eventImagesView").post(eventImagesView);


userRoute.route("/eventOverview").get(verifyJWT,eventOverview);
userRoute.route("/eventOverviewOfPresidentOfEvent").post(verifyJWT,eventOverviewOfPresidentOfEvent);

userRoute.route("/eventRegisteredByYou").get(verifyJWT,eventRegisteredByYou);

userRoute.route("/eventDelete").get(verifyJWT,eventDelete);

userRoute.route("/eventadd").post(verifyJWT,eventAdd)
userRoute.route("/showAttendance").post(verifyJWT,showAttendance)


userRoute.route("/eventOverviewOfPresident").get(verifyJWT,verifyPresident,eventOverviewOfPresident)
userRoute.route("/eventOverViewAllEvents").get(verifyJWT,eventOverViewAllEvents)

userRoute.route("/eventOverviewOfPresidentVerify").get(verifyJWT,verifyPresident,eventOverviewOfPresidentVerify)



userRoute.route("/clubOverviewByPresident").get(verifyJWT,verifyPresident,clubOverviewByPresident)
userRoute.route("/eventParticipatedByYou").get(verifyJWT,eventParticipatedByYou)
userRoute.route("/clubdelete").post(verifyJWT,clubdelete)

userRoute.route("/addSummary").post(verifyJWT,verifyPresident,addSummary)


userRoute.route("/markAttendenceByPresident").post(verifyJWT,verifyPresident,markAttendenceByPresident)

userRoute.route("/activityPointView").get(verifyJWT,activityPointView)

userRoute.route("/userinfo").get(verifyJWT,userinfo)



userRoute.route("/deanLogin").post(deanLogin)
userRoute.route("/deanRegister").get(deanRegister)
userRoute.route("/OrganizerRegister").post(verifyJWT,verifyDean,OrganizerRegister);
userRoute.route("/viewOrganizer").get(verifyJWT,verifyDean,viewOrganizer);
userRoute.route("/viewEventsUnderClub").get(verifyJWT,verifyDean,viewEventsUnderClub);
// userRoute.route("/checkPresident").post(verifyJWT,verifyPresident,upload.single("coverImage"));

userRoute.route("/deanevent").post(verifyJWT,verifyDean,deanevent);



userRoute.route("/CounsellorRegister").post(verifyJWT,verifyDean,CounsellorRegister);

userRoute.route("/CounsellorRegister").post(verifyJWT,verifyDean,CounsellorRegister);


userRoute.route("/EventForapproval").get(verifyJWT,verifyDean,EventForapproval);




userRoute.route("/getCounsellorEmails").get(getCounsellorEmails);

userRoute.route("/counsellorStudentList").get(verifyJWT,verifyCounsellor,counsellorStudentList);


userRoute.route("/counsellorStudentList").get(verifyJWT,verifyCounsellor,counsellorStudentList);

userRoute.route("/getStudentsWithEvents").get(verifyJWT,verifyCounsellor,getStudentsWithEvents);





userRoute.route("/getCounsellorDetailsForUser").get(verifyJWT,getCounsellorDetailsForUser);






userRoute.route("/updateCounsellorDetails").get(verifyJWT,verifyCounsellor,updateCounsellorDetails);

userRoute.route("/getCounsellorDetails").get(verifyJWT,verifyCounsellor,getCounsellorDetails);











userRoute.route("/report").get(verifyJWT,report)

//for frontend
const frontendTest=asyncHandler(async (req,res)=>{
    try{
    const { UserId, email, fullName, Mname, Lname, year, branch, Phone_no, password, role } = req.body;
    console.log('UserId:', UserId);
    console.log('Email:', email);
    console.log('Full Name:', fullName);
    console.log('Middle Name:', Mname);
    console.log('Last Name:', Lname);
    console.log('Year:', year);
    console.log('Branch:', branch);
    console.log('Phone Number:', Phone_no);
    console.log('Password:', password);
    console.log('Role:', role);
  
    // console.log(formData);
    // const {firstname}=req.body
    res.json("hi");
    }
    catch(e){
        res.json("fail")
    }
})
userRoute.route("/home").post(frontendTest)




userRoute.route("/verifyemail").post(verifyJWT,verifyemail)

















export {userRoute}