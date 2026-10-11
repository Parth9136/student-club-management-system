
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
            // console.log('Going to submit the data...');
            // const response = await axios.post('http://localhost:4000/user/CounsellorRegister', {
            //     fullName: parsedData.userName,
            //     email: parsedData.email,
            //     password: parsedData.password
            // });


            console.log('Going to submit the data...');
            const response = await axios.post('http://localhost:4000/user/CounsellorRegister', {
                fullName: parsedData.userName,
                email: parsedData.email,
                password: parsedData.password
            },
        
                {
                withCredentials: "true" // This should be in the config object
            }
        )

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
                <span className="key">O</span>
                <span className="key">U</span>
                <span className="key">N</span>
                <span className="key">S</span>
                <span className="key">E</span>
                <span className="key">L</span>
                <span className="key">L</span>
                <span className="key">O</span>
                <span className="key">R</span>

            </div>
            <div className="container" style={{ marginTop: '30px', textAlign: 'center', width: '600px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder=" Counsellor Name"
                    value={userName} // Bind state to the input
                    onChange={(e) => setUserName(e.target.value)} // Update state when the value changes
                />
                

                <input
                    type="email"
                    className="form-control"
                    placeholder="Counsellor Email"
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
