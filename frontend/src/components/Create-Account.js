// // import React, { useState } from 'react'
// // import '../App.css';
// // import Login from './Login'; 

// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



// // export default function CreateAccount(props) {
// //   const[password, setPassword] = useState('');
// //   const[confirmPassword , setConfirmPassword] = useState('');
// //   const[isMatch , setIsMatch] = useState(true);

// //   const handlePasswordChange= (event) =>{
// //     const value = event.target.value;
// //     setPassword(value);
// //     setIsMatch(value === confirmPassword); // Check match as password changes 
// //   } 

// //   const handleConfirmPasswordChange = (event) =>{
// //     const value = event.target.value;
// //     setConfirmPassword(value);
// //     setIsMatch(value === confirmPassword);
// //   }

// //   return (
// //     <>
// //         <div className="inst-name">
// //           <img src = {props.instImg}  className = "rvLogo" alt={props.instName} ></img>
// //           <p className='instName'>{props.instName}</p>
// //         </div>
// //         <div className="container">
// //           <p className="name">{props.name}</p>
// //           <p className="welcome">
// //             Create An Account
// //             <p style={{ color: '#7f759f', fontSize: '12px',marginBottom: '7px' , }}>
// //               Already have an account? <Link to="/login" style={{ backgroundColor : '#2c2638',fontSize: '12px' ,color: '#7f759f', textDecoration: 'underline' , border : '0px',  padding : '0px'}}>Log in</Link>
// //             </p>
// //             <p style={{ color: '#7f759f', fontSize: '12px' }}>
// //                                 Are you an Organiser? <Link to="/ORegister" style={{ fontSize: '12px', color: '#7f759f', textDecoration: 'underline', backgroundColor: 'rgba(44,38,56,255)' , border: 'none', margin : '0px' }}>Create Account</Link>
// //                             </p>
// //           </p>
          
// //         </div>
// //         <div className="container" style={{marginTop : '35px'}}>
// //           <form>
// //             <div className="row">
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="First name" />
// //               </div>
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="Middle name (Optional)"/>
// //               </div>
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="Last name (Optional)"/>
// //               </div>
// //             </div>
// //           </form>
// //           <div className="ep">
// //             <form>
// //               <div className="form-group">
// //                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
// //               </div>
// //               <div className="row">
// //                 <div className="col">
// //                   <input type="text" className="form-control" placeholder="USN" />
// //                 </div>
// //                 <div className="col">
// //                   <input type="tel" className="form-control" placeholder="Phone number" pattern="[0-9]{10}"/>
// //                 </div>
// //               </div>
              
// //                 <div className="row" style={{marginTop:'20px'}}>
// //                   <div className="col">
// //                     <select className="form-select" aria-label="Default select example" placeholder= "Year Of Study" style={{height:'35px'}}>
// //                       <option value="" disabled selected>Year Of Study</option>
// //                       <option value="1">First year</option>
// //                       <option value="2">Second Year</option>
// //                       <option value="3">Third Year</option>
// //                       <option value="3">Fourth Year</option>
// //                     </select>
// //                   </div>
// //                   <div className="col">
// //                     <select className="form-select" aria-label="Default select example" style={{height:'35px'}}>
// //                       <option value="" disabled selected>Branch</option>
// //                       <option value="1">CSE</option>
// //                       <option value="2">ISE</option>
// //                       <option value="3">AIML</option>
// //                       <option value="3">CD</option>
// //                     </select>
// //                   </div>
                  
// //                 </div>
// //                 <div className="col-auto">
// //                     <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder='Create Password' style={{marginTop:'25px'}} onChange={handlePasswordChange}/>
// //                 </div>
// //                 <div className="col-auto">
// //                     <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder='Re enter Password' style={{marginTop : '25px'}} onChange={handleConfirmPasswordChange}/>
// //                 </div>
// //                 {!isMatch && confirmPassword && (
// //                   <div style={{ color: '#ed131a', marginTop: '2px', fontSize: '10px'}}>
// //                     **Passwords do not match
// //                   </div>
// //                 )}
// //               <div className="submit">
// //                 <button type="submit" className="submit-button">Create Account</button>
// //               </div>
              
// //             </form>
// //           </div>
// //         </div>
// //     </>
// //   )
// // }



// // import React, { useState } from 'react'
// // import '../App.css';
// // import Login from './Login'; 

// // import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



// // export default function CreateAccount(props) {
// //   const[password, setPassword] = useState('');
// //   const[confirmPassword , setConfirmPassword] = useState('');
// //   const[isMatch , setIsMatch] = useState(true);

// //   const handlePasswordChange= (event) =>{
// //     const value = event.target.value;
// //     setPassword(value);
// //     setIsMatch(value === confirmPassword); // Check match as password changes 
// //   } 

// //   const handleConfirmPasswordChange = (event) =>{
// //     const value = event.target.value;
// //     setConfirmPassword(value);
// //     setIsMatch(value === confirmPassword);
// //   }

// //   return (
// //     <>
// //         <div className="inst-name">
// //           <img src = {props.instImg}  className = "rvLogo" alt={props.instName} ></img>
// //           <p className='instName'>{props.instName}</p>
// //         </div>
// //         <div className="container">
// //           <p className="name">{props.name}</p>
// //           <p className="welcome">
// //             Create An Account
// //             <p style={{ color: '#7f759f', fontSize: '12px',marginBottom: '7px' , }}>
// //               Already have an account? <Link to="/login" style={{ backgroundColor : '#2c2638',fontSize: '12px' ,color: '#7f759f', textDecoration: 'underline' , border : '0px',  padding : '0px'}}>Log in</Link>
// //             </p>
// //             <p style={{ color: '#7f759f', fontSize: '12px' }}>
// //                                 Are you an Organiser? <Link to="/ORegister" style={{ fontSize: '12px', color: '#7f759f', textDecoration: 'underline', backgroundColor: 'rgba(44,38,56,255)' , border: 'none', margin : '0px' }}>Create Account</Link>
// //                             </p>
// //           </p>
          
// //         </div>
// //         <div className="container" style={{marginTop : '35px'}}>
// //           <form >
// //             <div className="row">
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="First name"   value={formData.firstName} onSubmit={handleSubmit} />
// //               </div>
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="Middle name (Optional)" value={formData.middleName} onChange={handleChange}
// //                 />
// //               </div>
// //               <div className="col">
// //                 <input type="text" className="form-control" placeholder="Last name (Optional)"                 value={formData.email}                   onChange={handleChange}

// // />
// //               </div>
// //             </div>
// //           </form>
// //           <div className="ep">
// //             <form>
// //               <div className="form-group">
// //                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
// //               </div>
// //               <div className="row">
// //                 <div className="col">
// //                   <input type="text" className="form-control" placeholder="USN" />
// //                 </div>
// //                 <div className="col">
// //                   <input type="tel" className="form-control" placeholder="Phone number" pattern="[0-9]{10}"/>
// //                 </div>
// //               </div>
              
// //                 <div className="row" style={{marginTop:'20px'}}>
// //                   <div className="col">
// //                     <select className="form-select" aria-label="Default select example" placeholder= "Year Of Study" style={{height:'35px'}}>
// //                       <option value="" disabled selected>Year Of Study</option>
// //                       <option value="1">First year</option>
// //                       <option value="2">Second Year</option>
// //                       <option value="3">Third Year</option>
// //                       <option value="3">Fourth Year</option>
// //                     </select>
// //                   </div>
// //                   <div className="col">
// //                     <select className="form-select" aria-label="Default select example" style={{height:'35px'}}>
// //                       <option value="" disabled selected>Branch</option>
// //                       <option value="1">CSE</option>
// //                       <option value="2">ISE</option>
// //                       <option value="3">AIML</option>
// //                       <option value="3">CD</option>
// //                     </select>
// //                   </div>
                  
// //                 </div>
// //                 <div className="col-auto">
// //                     <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder='Create Password' style={{marginTop:'25px'}} onChange={handlePasswordChange}/>
// //                 </div>
// //                 <div className="col-auto">
// //                     <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder='Re enter Password' style={{marginTop : '25px'}} onChange={handleConfirmPasswordChange}/>
// //                 </div>
// //                 {!isMatch && confirmPassword && (
// //                   <div style={{ color: '#ed131a', marginTop: '2px', fontSize: '10px'}}>
// //                     **Passwords do not match
// //                   </div>
// //                 )}
// //               <div className="submit">
// //                 <button type="submit" className="submit-button">Create Account</button>
// //               </div>
              
// //             </form>
// //           </div>
// //         </div>
// //     </>
// //   )
// // }












// import React, { useState } from 'react'
// import '../App.css';
// import Login from './Login'; 

// import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";

// import axios from "axios";


// export default function CreateAccount(props) {
//     const navigate = useNavigate();
  
//   const[password, setPassword] = useState('');
//   const[confirmPassword , setConfirmPassword] = useState('');
//   const[isMatch , setIsMatch] = useState(true);

//   const handlePasswordChange= (event) =>{
//     const value = event.target.value;
//     setPassword(value);
//     setIsMatch(value === confirmPassword); // Check match as password changes 
//   } 

//   const handleConfirmPasswordChange = (event) =>{
//     const value = event.target.value;
//     setConfirmPassword(value);
//     setIsMatch(value === confirmPassword);
//   }
//     const [formData, setFormData] = useState({
//           firstName: '',
//           middleName: '',
//           lastName: '',
//           email: '',
//           usn: '',
//           phone: '',
//           yearOfStudy: '',
//           branch: '',
//           password: '',
//           confirmPassword: '',
//         });
//   const counsellorEmails = [
//     "shantharangaswamy@rvce.edu.in",
//     "pavithrah@rvce.edu.in",
//     "prapullasb@rvce.edu.in",
//     "someshnandi@rvce.edu.in",
//     "swarnamp@rvce.edu.in",
//     "shanmukhan@rvce.edu.in"
//   ];

//   const handleChange = (event) => 
//     {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: value,
//     }))}
//     const handleSubmit = async (e) => {
//       // e.preventDefault();
//       // console.log(formData); // Log the data to the console
//       e.preventDefault(); // Prevent page reload
          
//           try {
//             // alert("Submitting data...");
//             console.log("Going to submit the data...");
        
//             // Ensure formData is defined and has all the required fields
//             console.log("Form Data:", formData);
        
//             const response = await axios.post('http://localhost:4000/user/register', {
//                 UserId: formData.usn,
//                 email: formData.email,
//                 fullName: formData.firstName,
//                 Mname: formData.middleName,
//                 Lname: formData.lastName,
//                 year: formData.yearOfStudy,
//                 branch: formData.branch,
//                 Phone_no: formData.phone,
//                 password: formData.password,
//                 role: "user"
//             });
        
//             console.log("Response Data:", response.data);  // Log the full response data
//             // alert(response.data);
//             // Check if the success flag is false and log accordingly
//             if (!response.data.success) {
//                 console.error("Error:", response.data.message);
//                 // alert(response.data.message);  // Display the error message
//             } else {
//                 console.log("Success:", response.data.message);  // Log success message
//                 alert("Data submitted successfully!"); 
//                 navigate("/login") // Show success alert
//             }
        
//         } catch (error) {
//             // Log more details of the error if available
//             console.error("Error subm the data:", error.response || error.message || error);
//             console.log(error.status)
//             console.log(error.response.data.message)
//             alert(error.response.data.message)
  
//             // alert(error.response.data.message);  // Show generic error message
//         }
        
//     };

//   return (
//     <>
//         <div className="inst-name">
//           <img src = {props.instImg}  className = "rvLogo" alt={props.instName} ></img>
//           <p className='instName'>{props.instName}</p>
//         </div>
//         <div className="container">
//           <p className="name">{props.name}</p>
//           <p className="welcome">
//             Create An Account
//             <p style={{ color: '#7f759f', fontSize: '12px',marginBottom: '7px' , }}>
//               Already have an account? <Link to="/login" style={{ backgroundColor : '#2c2638',fontSize: '12px' ,color: '#7f759f', textDecoration: 'underline' , border : '0px',  padding : '0px'}}>Log in</Link>
//             </p>
//             <p style={{ color: '#7f759f', fontSize: '12px' }}>
//                                 Are you an Organiser? <Link to="/ORegister" style={{ fontSize: '12px', color: '#7f759f', textDecoration: 'underline', backgroundColor: 'rgba(44,38,56,255)' , border: 'none', margin : '0px' }}>Create Account</Link>
//                             </p>
//           </p>
          
//         </div>
       

// <div className="container" style={{ marginTop: "35px" }}>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="firstName"
//                 value={formData.firstName}
//                 placeholder="First name"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="middleName"
//                 value={formData.middleName}
//                 placeholder="Middle name (Optional)"
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="lastName"
//                 value={formData.lastName}
//                 placeholder="Last name (Optional)"
//                 onChange={handleChange}
//               />
//             </div>
          
//           <div className="ep">
//             <div className="form-group">
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={formData.email}
//                 placeholder="Enter email"
//                 onChange={handleChange}
//               />
//             </div>
//             </div>
//             <div className="row">
//               <div className="col">
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="usn"
//                   value={formData.usn}
//                   placeholder="USN"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="col">
//                 <input
//                   type="tel"
//                   className="form-control"
//                   name="phone"
//                   value={formData.phone}
//                   placeholder="Phone number"
//                   pattern="[0-9]{10}"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="col">
//                 <select
//                   className="form-select"
//                   name="counsellorEmail"
//                   value={formData.counsellorEmail}
//                   onChange={handleChange}
//                   style={{ height: "35px" }}
//                 >
//                   <option value="" disabled>
//                     Counsellor's Mail ID
//                   </option>
//                   {counsellorEmails.map((email, index) => (
//                     <option key={index} value={email}>
//                       {email}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             <div className="row" style={{ marginTop: "20px" }}>
//               <div className="col">
//                 <select
//                   className="form-select"
//                   name="yearOfStudy"
//                   value={formData.yearOfStudy}
//                   onChange={handleChange}
//                   style={{ height: "35px" }}
//                 >
//                   <option value="" disabled>
//                     Year Of Study
//                   </option>
//                   <option value="1">First year</option>
//                   <option value="2">Second Year</option>
//                   <option value="3">Third Year</option>
//                   <option value="4">Fourth Year</option>
//                 </select>
//               </div>
//               <div className="col">
//                 <select
//                   className="form-select"
//                   name="branch"
//                   value={formData.branch}
//                   onChange={handleChange}
//                   style={{ height: "35px" }}
//                 >
//                   <option value="" disabled>
//                     Branch
//                   </option>
//                   <option value="CSE">CSE</option>
//                   <option value="ISE">ISE</option>
//                   <option value="AIML">AIML</option>
//                   <option value="CD">CD</option>
//                 </select>
//               </div>
//             </div>
//             <div className="col-auto">
//               <input
//                 type="password"
//                 id="inputPassword6"
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 placeholder="Create Password"
//                 style={{ marginTop: "25px" }}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-auto">
//               <input
//                 type="password"
//                 id="inputPassword6"
//                 name="confirmPassword"
//                 className="form-control"
//                 value={formData.confirmPassword}
//                 placeholder="Re-enter Password"
//                 style={{ marginTop: "25px" }}
//                 onChange={handleChange}
//               />
//             </div>
//             {!isMatch && formData.confirmPassword && (
//               <div style={{ color: "#ed131a", marginTop: "2px", fontSize: "10px" }}>
//                 **Passwords do not match
//               </div>
//             )}
//             <div className="submit">
//               <button type="submit" className="submit-button">
//                 Create Account
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }



import React, { useState,useEffect } from 'react'
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccount(props) {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsMatch(value === confirmPassword);
  }

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setIsMatch(value === password);
  }

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    usn: '',
    phone: '',
    yearOfStudy: '',
    branch: '',
    counsellorname: '',
    counsellorEmail: '',
    password: '',
    confirmPassword: '',
  });

  // const counsellorEmails = [
  //   "shantharangaswamy@rvce.edu.in",
  //   "pavithrah@rvce.edu.in",
  //   "prapullasb@rvce.edu.in",
  //   "someshnandi@rvce.edu.in",
  //   "swarnamp@rvce.edu.in",
  //   "shanmukhan@rvce.edu.in"
  // ];

const [counsellorEmails, setCounsellorEmails] = useState([]);

  useEffect(() => {
    async function fetchCounsellorEmails() {
      try {
        console.log("Fetching counsellor emails...");

        const response = await axios.get("http://localhost:4000/user/getCounsellorEmails", {
          withCredentials: true,
        });
        console.log(response)

        if (response.data.success && Array.isArray(response.data.data)) {
          setCounsellorEmails(response.data.data);
          console.log("Counsellor Emails:", response.data.data);
        } else {
          console.error("Failed to fetch counsellor emails:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching counsellor emails:", error);
      }
    }

    fetchCounsellorEmails();
  }, []);







  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);

      const response = await axios.post('http://localhost:4000/user/register', {
        UserId: formData.usn,
        email: formData.email,
        fullName: formData.firstName,
        Mname: formData.middleName,
        Lname: formData.lastName,
        year: formData.yearOfStudy,
        branch: formData.branch,
        Phone_no: formData.phone,
        password: formData.password,
        counsellorMailId:formData.counsellorEmail,
        role: "user"
      });

      console.log("Success:", response.data.message);
      alert("Data submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting the data:", error.response || error.message || error);
      alert(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="inst-name">
        <img src={props.instImg} className="rvLogo" alt={props.instName}></img>
        <p className='instName'>{props.instName}</p>
      </div>
      <div className="container">
        <p className="name">{props.name}</p>
        <p className="welcome">
          Create An Account
          <p style={{ color: '#7f759f', fontSize: '12px', marginBottom: '7px' }}>
            Already have an account? <Link to="/login" style={{ backgroundColor: '#2c2638', fontSize: '12px', color: '#7f759f', textDecoration: 'underline', border: '0px', padding: '0px' }}>Log in</Link>
          </p>
         
          <p style={{ color: '#7f759f', fontSize: '12px', marginBottom: '7px' }}>
            Dean ? <Link to="/DLogin" style={{ backgroundColor: '#2c2638', fontSize: '12px', color: '#7f759f', textDecoration: 'underline', border: '0px', padding: '0px' }}>Login here.</Link>
          </p>
        </p>
      </div>

      <div className="container" style={{ marginTop: "35px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                placeholder="First name"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="middleName"
                value={formData.middleName}
                placeholder="Middle name (Optional)"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                placeholder="Last name (Optional)"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="ep">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="usn"
                  value={formData.usn}
                  placeholder="USN"
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone number"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
             
              <div className="col">
                <select
                  className="form-select"
                  name="counsellorEmail"
                  value={formData.counsellorEmail}
                  onChange={handleChange}
                  style={{ height: "35px" }}
                >
                  <option value="" disabled>
                    Counsellor's Mail ID
                  </option>
                 {counsellorEmails.map((counsellor, index) => (
  <option key={index} value={counsellor.email}>
    {counsellor.email}
  </option>
))}

                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col">
                <select
                  className="form-select"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  style={{ height: "35px" }}
                >
                  <option value="" disabled>
                    Year Of Study
                  </option>
                  <option value="1">First year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  style={{ height: "35px" }}
                >
                  <option value="" disabled>
                    Branch
                  </option>
                  <option value="CSE">CSE</option>
                  <option value="ISE">ISE</option>
                  <option value="AIML">AIML</option>
                  <option value="CD">CD</option>
                  <option value="CY">CY</option>
                  <option value="IEM">IEM</option>
                  <option value="ME">ME</option>
                  <option value="CH">CH</option>
                  <option value="AS">AS</option>
                  <option value="EC">EC</option>
                  <option value="EE">EE</option>
                </select>
              </div>
            </div>
            <div className="col-auto">
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                placeholder="Create Password"
                style={{ marginTop: "25px" }}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                placeholder="Re-enter Password"
                style={{ marginTop: "25px" }}
                onChange={handleChange}
              />
            </div>
            {!isMatch && formData.confirmPassword && (
              <div style={{ color: "#ed131a", marginTop: "2px", fontSize: "10px" }}>
                **Passwords do not match
              </div>
            )}
            <div className="submit">
              <button type="submit" className="submit-button">
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}