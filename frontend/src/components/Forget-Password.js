import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [getOtp, setgetOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatch, setIsMatch] = useState(true);




  

    const handleGetotp =async(userName) => {
        // console.log(userName)
        // setgetOtp(true);

        try {
            const response = await axios.post('http://localhost:4000/user/forgotPasswordAddUserID', 
                {
                    userId:userName,
                }
            );

            console.log(response)
            console.log(response.data.success)
            if (response.data.success === true) {
                console.log("verified user")
                setgetOtp(true);

            }
            else{
                console.log("unverified")
            }
            return;
        } catch (error) {
            console.log(error)
            // alert("UNVERIFIED!!!  please enter correct userId")
            console.error("Error subm the data:", error.response || error.message || error);
            console.log(error.status)
            console.log(error.response.data.message)
  
            alert(error.response.data.message); 
        }
    };

    const handleVerifyotp =async(otp) => {
        console.log("otphh",otp)
        // setVerifyOtp(true);


     try {
           // console.log("otp",userName)
           const response = await axios.post('http://localhost:4000/user/resetpasswordOtp', 
               {
                   otp:otp,
                   userId:userName,
               }
           );
        //    setVerifyOtp(true);
        console.log(response)
        console.log(response.data.success)
        if (response.data.success === true) {
            console.log("otp succesful")
            setVerifyOtp(true);

        }
        else{
            console.log("unverified")
            console.log(response.data.message)

        }

           console.log(response)
           return;
     } catch (error) {
        // console.log(response.data.message) console.error("Error subm the data:", error.response || error.message || error);
            console.log(error.status)
            console.log(error.response.data.message)
  
            alert(error.response.data.message); 
        // alert("please enter correct OTP")

     }
    };

    

    const handlePasswordChange =async (e) => {
        console.log(e.target.value)

        setNewPassword(e.target.value);
      
    };

    const handleConfirmPasswordChange = async (e) => {
        setConfirmPassword(e.target.value);
        setIsMatch(e.target.value === newPassword);
        
    };


    const submit=async()=>{
        try {
            const response = await axios.post('http://localhost:4000/user/resetPassword', 
                {
                    userId:userName,
                    newPassword:newPassword,
                    reEnterPass:confirmPassword
                }
            );

            console.log(response)
            console.log(response.data.message); 
            if (response.data.success === true) {
                alert("password set succesful")
                navigate('/');

    
            } // Display the error message

            return;
        } catch (error) {
            console.log(error.status)
            console.log(error.response.data.message)
  
            alert(error.response.data.message); 
        }
    }

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
                <h2 style={{ marginTop: "100px" }}>FORGOT PASSWORD?</h2>
            </div>
            <div
                className="container"
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                    width: "600px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "baseline",
                    gap: "10px"
                }}
            >
                {/* USN Input */}
                <div style={{ gridColumn: "span 1" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="USN"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ height: "40px" }}
                    />
                </div>
                <div className="submit" style={{ gridColumn: "span 1" }} >
                <button 
                    type="submit" 
                    className="otp-button" 
                    style={{ height: "auto" }} 
                    onClick={() => handleGetotp(userName)}
                >
                    Get OTP
                </button>

                </div>

                {/* OTP Input and Verify Button */}
                {getOtp && (
                    <>
                        <div style={{ gridColumn: "span 1" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{ height: "40px" }}
                            />
                        </div>
                        <div className="submit" style={{ gridColumn: "span 1" , marginTop : '0px'}} >
                        <button 
                            type="submit" 
                            className="otp-button" 
                            style={{ height: "auto", marginTop: '15px' }} 
                            onClick={() => handleVerifyotp(otp)}
                            >
                            Verify OTP
                        </button>

                        </div>
                    </>
                )}

                {/* Password Inputs and Submit Button */}
                {verifyOtp && (
                    <>
                        <div style={{ gridColumn: "span 1" }}>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                style={{ marginTop: "10px" }}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div style={{ gridColumn: "span 1" , marginLeft : '10px'}}>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter Password"
                                style={{ marginTop: "10px" }}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        {!isMatch && confirmPassword && (
                            <div style={{ color: "#ed131a", gridColumn: "span 2", fontSize: "10px" }}>
                                **Passwords do not match
                            </div>
                        )}
                        <div className="submit" style={{ gridColumn: "span 2", textAlign: "center", marginTop: '20px' }}>
                            <button type="submit" className="submit-button" onClick={() => submit()}>
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
