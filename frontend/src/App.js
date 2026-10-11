import React from 'react';
import './App.css';
import IntroImages from './components/Slide-Show-Login';
import CreateAccount from './components/Create-Account';
import Login from './components/Login';
import rvLogo from './rv-logo.jpg';
import img1 from './Connect & Collaborate.mp4';
import img2 from './Plan Like a pro.mp4';
import img3 from './Track With Ease.mp4';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './components/UserHome';
import DeanLogin from './components/Dean-Login';
import DeanHome from './components/Dean-Home';
import DeanTrackEvent from './components/DeanOverview-event';
import DeanClubOverview from './components/Dean-ClubOverview';
import DeanCounsellorOverview from './components/Dean-CounsellorOverview';
import DeanApproveEvent from './components/Dean-ApproveEvent';
import OrganiserLogin from './components/Organiser-Login';
import OrganiserHome from './components/Organiser-Home';
import OrganiserRegister from './components/Organiser-Register';
import OrganiserNameUpdate from './components/organizername-update';
import OrganiserAdd from './components/Organiser-Add';
import CounsellorLogin from './components/Counsellor-Login';
import CounsellorRegister from './components/Counsellor-Register';
import CounsellorHome from './components/Counsellor-Home';
import CounsellorTrackActivity from './components/Counsellor-Activityind';
import EventHorizon from './components/Event-Horizon';
import ClubConnect from './components/Club-Connect';
import Profile from './components/Profile';
import CounsellorProfile from './components/Counsellor-Profile';
import ActivityPoints from './components/Activity-Points';
import ForgotPassword from './components/Forget-Password';
import UploadImage from './components/Upload-Image';
import ClubOps from './components/Club-Ops';
import EventOps from './components/Event-Ops';
import ViewMember from './components/View-Member';
import EventOverview from './components/Event-Overview';
import UploadDocxOnly from './components/verifyeventByDean';
import CounsellorStudentList from './components/Counsellor-StudentList';



function App() {
  return (
    <Router>
      
        {/* Define Routes */}
        <Routes>
          {/* Route for CreateAccount */}
          <Route
            path="/"
            element={
              <>
              <div className="main">
                <div className="slide-show">
                  <IntroImages img1={img1} img2={img2} img3={img3} />
                </div>
                <div className="login">
                  <CreateAccount
                    instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                  />
                </div></div>
              </>
              
            }
          />
          
          <Route
            path="/login"
            element={
              <>
                <Login instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
          <Route
            path="/ONameUpdate"
            element={
              <>
                < OrganiserNameUpdate instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
          <Route
            path="/eventOverview"
            element={
              <>
                <EventOverview instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
          <Route
            path="/CStudentList"
            element={
              <>
                <CounsellorStudentList instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
           <Route
            path="/VerifyByDean"
            element={
              <>
                <UploadDocxOnly instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
          <Route
            path="/userHome"
            element={
              <>
                <UserHome instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
           <Route
            path="/viewMembers"
            element={
              <>
                <ViewMember instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/OLogin"
            element={
              <>
                <OrganiserLogin instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DLogin"
            element={
              <>
                <DeanLogin instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DApproveEvent"
            element={
              <>
                <DeanApproveEvent instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/OAdd"
            element={
              <>
                <OrganiserAdd instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DHome"
            element={
              <>
                <DeanHome instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DEvent"
            element={
              <>
                <DeanTrackEvent instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DClubOverview"
            element={
              <>
                <DeanClubOverview instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/DCounsellorOverview"
            element={
              <>
                <DeanCounsellorOverview instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/organiserHome"
            element={
              <>
                <OrganiserHome instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/CTrackActivity"
            element={
              <>
                <CounsellorTrackActivity instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"
                    />
              </>
            }
          />
          <Route
            path="/ORegister"
            element={
              <>
                <OrganiserRegister instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/CLogin"
            element={
              <>
                <CounsellorLogin instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/CRegister"
            element={
              <>
                <CounsellorRegister instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/counsellorHome"
            element={
              <>
                <CounsellorHome instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/counsellorProfile"
            element={
              <>
                <CounsellorProfile instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/eventHorizon"
            element={
              <>
                <EventHorizon instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/clubConnect"
            element={
              <>
                <ClubConnect instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          
          <Route
            path="/profile"
            element={
              <>
                <Profile instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/activityPoints"
            element={
              <>
                <ActivityPoints instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                <ForgotPassword instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/uploadImage"
            element={
              <>
                <UploadImage instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/eventOps"
            element={
              <>
                <EventOps instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
          <Route
            path="/clubOps"
            element={
              <>
                <ClubOps instImg={rvLogo}
                    instName="RV COLLEGE OF ENGINEERING"
                    name="Event Sync"/>
              </>
            }
          />
        </Routes>
        
    </Router>
  );
}

export default App;