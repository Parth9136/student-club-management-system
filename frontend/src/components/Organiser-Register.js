// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import axios from "axios";



// const OrganiserLogin =(props) => {
//     const navigate = useNavigate();

//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [Email, setEmail] = useState('');

//     const handleLogin = async () => {
//       /******Extract user password match it ********/
//     //   console.log(userName.Password)
//     console.log(userName)



//     const formData = new FormData();

//     // Convert JSON object to string and append it
//         const jsonPayload = JSON.stringify({ userName, password,Email});
//         formData.append('data', jsonPayload);

//         const entries = Array.from(formData.entries());
//         // console.log(entries[0]);

//         const dataEntry = entries.find(entry => entry[0] === 'data');
//         const parsedData = JSON.parse(dataEntry[1]);

//         console.log("name",parsedData.userName); // Output: examplePassword
//         // e.preventDefault();


        
        
//         try {
//             // alert("Submitting data...");
//             console.log("Going to submit the data...");
        
//             // Ensure formData is defined and has all the required fields
            
        
//             const response = await axios.post('http://localhost:4000/user/OrganizerRegister', {
//                 UserId:parsedData.userName,
//                 email:parsedData.Email,
//                 password:parsedData.password
              

//             });
        
//             console.log("Response Data:", response.data);  // Log the full response data
        
//             // Check if the success flag is false and log accordingly
//             if (!response.data.success) {
//                 console.error("Error:", response.data.message);
//                 alert(response.data.message);  // Display the error message
//             } else {
                
//                 if (response.data.success === true) {
//                     // console.log("inside");
//                     navigate('/OLogin');
//                 }
                

//                 console.log(response.data.success);  // Log success message
//                 // alert("Data submitted successfully!");  // Show success alert
//             }
        
//         } catch (error) {
//             // Log more details of the error if available
//             console.error("Error subm the data:", error.response || error.message || error);
//             console.log(error.status)
//             console.log(error.response.data.message)
  
//             alert(error.response.data.message);  // Show generic error message
//         }



//         // if ( password === userName.Password) {
//         //     navigate('/OLogin');
//         //     alert('Registration Successful')
//         // } else {
//         //     alert('Invalid password');
//         // }
//     };

//     return (
//         <div className="default-page">
//             <div className="header">
//                 <div>
//                     <img src={props.instImg} className="rvLogo" alt={props.instName} />
//                     <p className="instName">{props.instName}</p>
//                 </div>
//                 <div className="name-page">{props.name}</div>
//             </div>
//             <div className="keyboard">
//                 <span className="key">R</span>
//                 <span className="key">E</span>
//                 <span className="key">G</span>
//                 <span className="key">I</span>
//                 <span className="key">S</span>
//                 <span className="key">T</span>
//                 <span className="key">E</span>
//                 <span className="key">R</span>
//             </div>
//             <div className="container" style={{ marginTop: '30px', textAlign: 'center', width: '600px' }}>
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="USN"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                 />

//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Email"
//                     value={Email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />



//                 <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     style={{ marginTop: '25px' }}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

                
//                 <div className="submit">
//                     <button type="submit" className="submit-button" style={{ marginBottom: '25px' }} onClick={handleLogin}>
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrganiserLogin;

// import CreateAccount from './components/Create-Account.js';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganiserLogin = (props) => {
    const navigate = useNavigate();

    // State hooks
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        console.log(userName); // Log the username to check if the value is updating

        // Prepare the form data
        const formData = new FormData();
        const jsonPayload = JSON.stringify({ userName, password, email });
        formData.append('data', jsonPayload);

        const entries = Array.from(formData.entries());
        const dataEntry = entries.find(entry => entry[0] === 'data');
        const parsedData = JSON.parse(dataEntry[1]);

        console.log('name', parsedData.userName);

        try {
            console.log('Going to submit the data...');
            const response = await axios.post('http://localhost:4000/user/OrganizerRegister', {
                UserId: parsedData.userName,
                email: parsedData.email,
                password: parsedData.password
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
                if (response.data.success === true) {
                    // navigate('/OLogin');
                    navigate('/DHome');
                    window.location.reload();
                }
                console.log(response.data.success);
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
                <span className="key">A</span>
                <span className="key">D</span>
                <span className="key">D</span>
                <span className="key">&nbsp;</span>
                <span className="key">C</span>
                <span className="key">L</span>
                <span className="key">U</span>
                <span className="key">B</span>
            </div>
            <div className="container" style={{ marginTop: '30px', textAlign: 'center', width: '600px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Club ID"
                    value={userName} // Bind state to the input
                    onChange={(e) => setUserName(e.target.value)} // Update state when the value changes
                />

                <input
                    type="email"
                    className="form-control"
                    placeholder="Club Email"
                    value={email} // Bind state to the input
                    onChange={(e) => setEmail(e.target.value)} // Update state when the value changes
                    style={{ marginTop: '25px' }}
                />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    style={{ marginTop: '25px' }}
                    value={password} // Bind state to the input
                    onChange={(e) => setPassword(e.target.value)} // Update state when the value changes
                />

                <div className="submit">
                    <button
                        type="submit"
                        className="submit-button"
                        style={{ marginBottom: '25px' }}
                        onClick={handleLogin}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrganiserLogin;
