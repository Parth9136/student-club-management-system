import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganiserLogin = (props) => {
    const navigate = useNavigate();
    // console.log("organizseanulogin")
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      /******Extract user password match it ********/
      console.log(userName); // Log the username to check if the value is updating

      // Prepare the form data
      const formData = new FormData();
      const jsonPayload = JSON.stringify({ userName, password});
      formData.append('data', jsonPayload);

      const entries = Array.from(formData.entries());
      const dataEntry = entries.find(entry => entry[0] === 'data');
      const parsedData = JSON.parse(dataEntry[1]);

      console.log('namegfhfh', parsedData.userName);
      console.log("sfjhbfvc",parsedData.password)

      try {
          console.log('Going to submit the data...');
          const response = await axios.post('http://localhost:4000/user/deanLogin', 
            {
                userId:parsedData.userName,
                password:parsedData.password,
                
            },
            {
                withCredentials: "true" // This should be in the config object
            }
        );

          console.log('Response Data:', response.data);

          if (!response.data.success) {
              console.error('Error:', response.data.message);
              alert(response.data.message);
          } else {
            console.log(response.data.success === true) 
            
              if (response.data.success === true) {
                alert("you are loggedin")
                //   navigate('/userHome');
                  navigate('/DHome');
                //   window.location.reload();
              }
              console.log("44",response.data.success);
          }
      } catch (error) {
          console.error('Error submitting the data:', error.response || error.message || error);
          alert(error.response?.data?.message || 'An error occurred');
      }
       
    };

    return (
        <div className="default-page">
            <div className="header">
                <div>
                    <img src={props.instImg} className="rvLogo" alt={props.instName} />
                    <p className="instName">{props.instName}</p>
                </div>
                <div className="name-page">{props.name}</div>
            </div>
            <div className="keyboard">
                <span className="key">D</span>
                <span className="key">E</span>
                <span className="key">A</span>
                <span className="key">N</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="key">L</span>
                <span className="key">O</span>
                <span className="key">G</span>
                <span className="key">I</span>
                <span className="key">N</span>
            </div>
            <div className="container" style={{ marginTop: '30px', textAlign: 'center', width: '600px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Dean ID"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    style={{ marginTop: '25px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="submit">
                    <button type="submit" className="submit-button" style={{ marginBottom: '25px' }} onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <p>
                    <Link to="/forgotPassword" style={{ fontSize: '16px', color: '#7f759f' , backgroundColor: 'rgba(44,38,56,255)' , border: 'none'}}>Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default OrganiserLogin;
