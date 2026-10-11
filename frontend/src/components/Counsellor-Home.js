import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import img1 from '../OrganiserImage1.png'
import img2 from '../OrganiserImage2.png'

export default function OrganiserHome(props) {
  return (
    <div>
      <div className="default-page">
              <div className="header">
                <Link to ="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px' , backgroundColor : 'rgba(44,38,56,255)', border: 'none'}}>
                                            {props.name}
                  </Link>
                <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
                  <Link to="/CStudentList" className="linkTop">STUDENT LIST</Link>
                  <Link to="/counsellorProfile" className="linkTop">PROFILE</Link>
                </div>
              </div>
              <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
              <div className="userBodyLanding">
          <div className="userBodyImage" style={{marginTop:'20px', marginLeft:'20px'}}>
            <img src ={img1} className="userBodyImage"></img>
          </div>
          <div className="userBodyText">
            <div className="headerText">
            <Link to="/CStudentList" style={{ fontSize: '40px', backgroundColor: 'rgba(44,38,56,255)' , border: 'none', fontWeight:'bolder' }}>STUDENT LIST🔗</Link>
            <p style={{padding : '50px', width : '700px',  textAlign:'justify', lineHeight: '40px'}}>Elevate your club management with ClubOps—your all-in-one hub for seamless coordination! From activity tracking to member engagement, keep everything running smoothly. 🎯✨<br/>Effortlessly manage  
                <span className="animation">
                  <div className="first"><div>Member Engagement</div></div>
                  <div className="second"><div>Club Activities</div></div>
                  <div className="third"><div>Reporting </div></div>
                </span></p>
            
            </div>
          </div>
          <div className="userBodyText">
            <div className="headerText">
                <Link to="/counsellorProfile" style={{ fontSize: '40px', backgroundColor: 'rgba(44,38,56,255)' , border: 'none' }}>PROFILE🔗</Link>
              </div>
              <p style={{padding : '50px', width : '700px', textAlign:'justify', lineHeight: '40px'
              }}>
             Elevate your club management with ClubOps—your all-in-one hub for seamless coordination! From activity tracking to member engagement, keep everything running smoothly. 🎯✨<br/>Effortlessly manage  
                <span className="animation">
                  <div className="first"><div>Member Engagement</div></div>
                  <div className="second"><div>Club Activities</div></div>
                  <div className="third"><div>Reporting </div></div>
                </span></p>
              
            </div>
          <div >
            <img src={img2} className="userBodyImage"></img>
          </div>
        </div>
              </div>
    </div>
  )
}