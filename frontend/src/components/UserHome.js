import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import image from '../rv-logo.jpg'; // Make sure the path to your image is correct
import img1 from '../image1.png';
import img2 from '../image2.png';
import axios from 'axios';

import img3 from '../image3.png';
import { useState, useEffect } from 'react';





const UserHome = (props) => {
  const [totalactivity,setTotalactivity]=useState("")// Store the generated report URL

  
  
useEffect(() => {
  async function fetchData() {
    try {
      console.log("anusha");
      const response = await axios.get("http://localhost:4000/user/activityPointView", { withCredentials: true });
      console.log(response.data.totalPoints);
      setTotalactivity(response.data.totalPoints);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  fetchData();
}, []);


  return (
    <>
      <div className="default-page">
        <div className="header">
          <div className="name-page" style={{ fontSize: '15px', padding: '0px' }}>
            {props.name}
          </div>
          <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
            <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
            <Link to="clubConnect" className="linkTop">CLUB CONNECT</Link>
            
            <Link to="/profile" className="linkTop">PROFILE</Link>

                    <Link
                      to="/activityPoints"
                      className="linkTop"
                      style={{
                        border: '1px white solid',
                        borderRadius: '20px',
                        paddingRight: '15px',
                        backgroundColor: '#7338A0'
                      }}
                    >
                      ACTIVITY POINTS🪙: {totalactivity}
                    </Link>



            
                      
          </div>
        </div>
        <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
        <div className="userBodyLanding">
          <div className="userBodyImage" style={{marginTop:'20px', marginLeft:'20px'}}>
            <img src ={img1} className="userBodyImage"></img>
          </div>
          <div className="userBodyText">
            <div className="headerText">
            <Link to="/eventHorizon" style={{ fontSize: '40px', backgroundColor: 'rgba(44,38,56,255)' , border: 'none', fontWeight:'bolder' }}>EVENT HORIZON🔗</Link>
            <p style={{padding : '50px', width : '700px',  textAlign:'justify', lineHeight: '40px'}}>Your ultimate hub for discovering and registering for exciting events. Find your passion, sign up, and make every event count!🚀.<br/>Explore a curated list of 
              <span class="animation" style={{marginLeft : '10px'}}>
                  <div class="first"><div>Competitions</div></div>
                  <div class="second"><div>Workshop</div></div>
                  <div class="third"><div>Activities</div></div>
              </span></p>
            
            </div>
          </div>
          <div className="userBodyText">
            <div className="headerText">
                <Link to="/eventHorizon" style={{ fontSize: '40px', backgroundColor: 'rgba(44,38,56,255)' , border: 'none' }}>CLUB CONNECT🔗</Link>
              </div>
              <p style={{padding : '50px', width : '700px', textAlign:'justify', lineHeight: '40px'
              }}>
              A dynamic platform linking you to clubs and organizations. Explore events, engage with communities, and stay updated on activities to have the ultimate memories.<br/>Connect with clubs,  
                <span className="animation">
                  <div className="first"><div>Discover</div></div>
                  <div className="second"><div>Engage</div></div>
                  <div className="third"><div>Grow</div></div>
                </span>, and be part of a thriving community!</p>
              
            </div>
          <div >
            <img src={img2} className="userBodyImage"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
