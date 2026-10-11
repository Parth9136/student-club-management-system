import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import profile from '../profile.webp';

export default function Profile(props) {
    const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [totalactivity,setTotalactivity]=useState("")// Store the generated report URL

  
  
  useEffect(() => {
    
    async function fetchData() {
      try {
        console.log("anushahhhhhhhhhhh")
        axios.get("http://localhost:4000/user/activityPointView", { withCredentials: true })
        .then((response)=>{
          console.log(response.data.totalPoints)
          setTotalactivity(response.data.totalPoints)
        })

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, []);


  const logout=async ()=>{
    const response = await axios.get('http://localhost:4000/user/logout', {withCredentials: true });
  navigate("/")
  }
  // Fetch user data using axios
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await axios.get('http://localhost:4000/user/userinfo', {
          withCredentials: true,  // Make sure credentials are included with the request
        });
        // alert(response.data.userInfo.FName)
        console.log("hereeresponse", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    console.log("hereee", userData);
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const userInfo = userData.userInfo || {}; // Ensure userInfo exists before rendering

  return (
    <div>
      <div className="default-page">
        <div className="header">
           <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
                      {props.name}
            </Link>
          <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
            <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
            <Link to="/clubConnect" className="linkTop">CLUB CONNECT</Link>
            <Link to="/eventHorizon" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>PROFILE</Link>
            
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
        {/* <hr style={{ marginTop: '0px', border: '1.5px solid white' }} /> */}
        <hr style={{ marginTop: '0px', border: '1.5px solid white'}} />
        <div style={{display : 'flex' , justifyContent : 'flex-end'}}>
        <Link style={{color :'white', backgroundColor : '#7338A0', fontSize : '16px',width : '100px', textAlign:'center', borderRadius : '20px', marginRight : '20px'}} onClick={logout}>
          <span class="glyphicon glyphicon-log-out"></span> Log out↪
        </Link>
        </div>
        <div className="keyboard">
          <span className="key">P</span>
          <span className="key">R</span>
          <span className="key">O</span>
          <span className="key">F</span>
          <span className="key">I</span>
          <span className="key">L</span>
          <span className="key">E</span>
        </div>
        <div className="profileBody">
          {/* <img src={profile} alt="Profile" style={{ width: '300px' }} /> */}
          <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left', marginTop: '30px', marginBottom: '40px' }}>
            <tbody>
              <tr>
                <td className='heading'>User ID</td>
                <td className='data'>{userInfo.User_id || 'N/A'}</td>
              </tr>
              <tr>
                <td className='heading'>Name</td>
                <td className='data'>{`${userInfo.FName || ''} ${userInfo.MName ? userInfo.MName + ' ' : ''}${userInfo.LName || ''}`}</td>
              </tr>
              <tr>
                <td className='heading'>Email</td>
                <td className='data'>{userInfo.Email || 'N/A'}</td>
              </tr>
              <tr>
                <td className='heading'>Phone Number</td>
                <td className='data'>{userInfo.Phone_no || 'N/A'}</td>
              </tr>
              {/* <tr>
                <td className='heading'>Signed Up in</td>
                <td className='data'>{userInfo.StartYear || 'N/A'}</td>
              </tr> */}
              <tr>
                <td className='heading'>Branch</td>
                <td className='data'>{userInfo.Branch || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
