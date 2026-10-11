import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import axios from "axios";


const Login = (props) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    /*Harcoded for frontend Development purposes ******/
    
    // console.log(userName);

    // const formData = new FormData();

    // // Convert JSON object to string and append it
    // const jsonPayload = JSON.stringify({ userName, password });
    // formData.append('data', jsonPayload);

    // console.log(formData)
    // console.log(Array.from(formData.entries().pair[0]));

    // const entries = Array.from(formData.entries());
// console.log(entries[0]);














    const handleLogin = async () => {
        const formData = new FormData();
        // console.log(userName)
    // Convert JSON object to string and append it
        const jsonPayload = JSON.stringify({ userName, password });
        formData.append('data', jsonPayload);

        const entries = Array.from(formData.entries());
        // console.log(entries[0]);

        const dataEntry = entries.find(entry => entry[0] === 'data');
        const parsedData = JSON.parse(dataEntry[1]);
        console.log(parsedData.password); // Output: examplePassword
        // e.preventDefault();


        
        
        try {
            // alert("Submitting data...");
            console.log("Going to submit the data...");
        
            // Ensure formData is defined and has all the required fields
            
            console.log("here",userName)
            console.log(password)
            const response = await axios.post('http://localhost:4000/user/login', 
                {
                    userId:userName,
                    password:password
                },
                {
                    withCredentials: "true" // This should be in the config object
                }
            );
            
            // console.log("Response Data:", response.data);  // Log the full response data
            console.log(response)
            // Check if the success flag is false and log accordingly
            if (!response.data.success) {
                console.error("Error:", response.data.message);
                alert(response.data.message);  // Display the error message
            } else {
                
                if (response.data.success === true) {
                    // console.log("inside");
                    alert("loggedin")
                    navigate('/userHome');
                }
                

                console.log(response.data.success);  // Log success message
                // alert("Data submitted successfully!");  // Show success alert
            }
        
        } catch (error) {
            // Log more details of the error if available
            // console.error("Error subm the data:", error.response || error.message || error);
            // console.log(error.status)
            // console.log(error.response.data.message)
  
            // alert(error.response.data.message);  // Show generic error message
            
                if (error.response) {
                    console.error("Server Error:", error.response.status, error.response.data);
                    alert(error.response.data?.message || "Login failed!");
                } else if (error.request) {
                    console.error("No Response from Server:", error.request);
                    alert("No response from the server. Check your network.");
                } else {
                    console.error("Request Error:", error.message);
                    alert("An unexpected error occurred.");
                }
            }
            
        













        // if (userName === correctUsername && password === correctPassword) {
        //     navigate('/userHome');
        // } else {
        //     alert('Invalid username or password');
        // }
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
               <span className="key">U</span>
                <span className="key">S</span>
                <span className="key">E</span>
                <span className="key">R</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {/* 3 spaces */}
                <span className="key">L</span>
                <span className="key">O</span>
                <span className="key">G</span>
                <span className="key">I</span>
                <span className="key">N</span>
            </div>

            <div className="container" style={{ marginTop: '30px', textAlign: 'center', width: '600px' }}>
                 <p style={{ marginTop:'-10px',color: '#7f759f', fontSize: '12px' }}>
                    Are you a Counsellor? <Link to="/CLogin" style={{ fontSize: '12px', color: '#7f759f', textDecoration: 'underline', backgroundColor: 'rgba(44,38,56,255)' , border: 'none' }}>Log in</Link>
                </p>
                <p style={{ color: '#7f759f', fontSize: '12px' }}>
                    Are you an Organiser? <Link to="/OLogin" style={{ fontSize: '12px', color: '#7f759f', textDecoration: 'underline', backgroundColor: 'rgba(44,38,56,255)' , border: 'none' }}>Log in</Link>
                </p>
               
                <input
                    type="text"
                    className="form-control"
                    placeholder="USN"
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
                    <Link to="/forgotPassword" style={{ fontSize: '16px', color: '#7f759f' ,backgroundColor: 'rgba(44,38,56,255)' , border: 'none'}}>Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;