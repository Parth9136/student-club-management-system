// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
// // import img from '../rv-logo.jpg'
// import axios from 'axios';

// export default function ClubOps(props) {
//   const navigate = useNavigate();
  
//   const [add, setAdd] = useState(false); // State to determine if the user can add clubs
//   const [showModal, setShowModal] = useState(false);
//   const [showRegistrationModal, setShowRegistrationModal] = useState(false); // Manage registration modal visibility
//   // Manage modal visibility
//   const today = new Date();
//   const now = today.toISOString().slice(0, 16);
//   const [formDataReg, setFormDataReg] = useState({
//     startDate: '',
//     endData: '',
//     fee:''
//   });
//   const [formData, setFormData] = useState({
//     coverImage: null,
//     clubName: '',
//     description: '', // Text fields for club details
//   });
//   const [clubInfo, setClubInfo] = useState(null); // State to store the club info

//   // useEffect(() => {
//   //   // Fetch board member status and club info when the component loads
//   //   const fetchClubData = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:4000/user/checkIfBoardMember", {
//   //         withCredentials: true,
//   //       });

//   //       console.log(response.data.data.isMember);

//   //       if (response.data.data.isMember=='yes') {
//   //         setAdd(true); // Set the 'add' state to true after submission
//   //         setShowModal(false); // Hide modal

//   //         // Fetch the club data only if the user is a board member
//   //         const clubResponse = await axios.get("http://localhost:4000/user/clubInfoPresident", {
//   //           withCredentials: true,
//   //         });
//   //         console.log("34",clubResponse.data.data[0].image)


//   //         setClubInfo(clubResponse.data.data[0]); 
//   //         console.log(clubInfo.image)// Update the clubInfo state with the response data

//   //       // const response = await axios.get("http://localhost:4000/user/clubInfoPresident", {
//   //       //     withCredentials: true,
//   //       //   });

//   //       } else {
//   //         setAdd(false); // User is not a board member
//   //         setShowModal(false); // Show modal to add a club
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchClubData();
//   // }, []);


//   useEffect(() => {
//   setAdd(true); // Simulate that the user is a board member
//   setClubInfo({
//     Club_id: 123,
//     Club_Name: "Random Club",
//     Club_Description: "A club for random things",
//     Club_StartDate: "2025-01-01",
    
//   });
// }, []);
//   // Handle text input change (club name, description)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value, // Update form data for text fields
//     });
//   };





  
//   // Handle file input change (image upload)
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFormData({
//       ...formData,
//       coverImage: selectedFile, // Store the actual file
//     });
//   };

//   const handleModalClose = () => setShowModal(false); // Close modal
//   const handleModalOpen = () => setShowModal(true); // Open modal
//   const handleRegClose=()=>setShowRegistrationModal(false);

//   const deleteClub=async ()=>{
//     console.log(clubInfo.Club_Name)
//     const cname=clubInfo.Club_Name
//     const response = await axios.post("http://localhost:4000/user/clubdelete", {clubName:cname},
//     {
//         withCredentials: true,
//       });
//     window.location.reload(); 


//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (!formData.clubName.trim() || !formData.description.trim() || !formData.coverImage) {
//       alert("Please fill in all fields and upload an image before submitting.");
//       return;
//     }

//     // Create FormData instance to handle both text and file data
//     const data = new FormData();
//     data.append("clubName", formData.clubName);
//     data.append("description", formData.description);
   
//     try {
//       const response = await axios.post("http://localhost:4000/user/addclub", data, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data", // Important for file uploads
//         },
//       });

//       console.log(response.data);
//       setAdd(true); // Set the 'add' state to true after submission
//       setShowModal(false); // Close the modal after adding the club
//       window.location.reload(); 

//     } catch (error) {
//       console.error("Error adding club:", error);
//     }
//   };
//   const handleViewMembers = () => {
//     navigate('/viewMembers')
//   };

//   const handleOpenRegistrations = () => {
//     setShowRegistrationModal(true);
//     console.log("yes 134") // This correctly sets the modal visibility
//   };

//   const handleSubmitReg=async ()=>{
//     console.log("hi")
//     console.log("143",formDataReg)

//     // const data = new FormData();
//     // console.log(clubInfo.Club_Name)
//     // data.append("clubName", clubInfo.Club_Name);

//     // data.append("startDate", formDataReg.startDate);
//     // data.append("endDate", formDataReg.endData);
//     // data.append("fee", formDataReg.fee);

//     // console.log("154",data)


//     const response = await axios.post("http://localhost:4000/user/clubregdetails", {
//     clubName:clubInfo.Club_Name,
//     startDate:formDataReg.startDate,
//     endDate:formDataReg.endData,
//     fee:formDataReg.fee
  
  
//   }, {
//       withCredentials: true,
      
//     });
//     console.log(response.data.success)
//     if(response.data.success==true){
//       alert("registered succesfully")
//       handleRegClose()
//     }




//   }

//   const handleInputChangeReg = (e) => {
//     console.log("146",formDataReg)

//     const { name, value } = e.target;
//     console.log(name,value,"149")
//     setFormDataReg({
//       ...formDataReg,
//       [name]: value, // Update form data for text fields
//     });
//     console.log(formDataReg)

    
//   };

//   return (
//     <div>
//       <div className="default-page">
//         <div className="header">
//           <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
//             {props.name}
//           </Link>
//           <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
//           </div>
//         </div>
//         <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

//         {add ? (
//           <>
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <Link to="/login" style={{ color: 'white', backgroundColor: '#7338A0', fontSize: '16px', width: '100px', textAlign: 'center', borderRadius: '20px', marginRight: '20px' }}>
//                 <span className="glyphicon glyphicon-log-out"></span> Log out↪
//               </Link>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//               {/* <img src={clubInfo.image} style={{ width: '200px', borderRadius: '30px' }} /> */}
              
//               {/* Display club information */}
//               {clubInfo ? (
//                 <>
                

//                 <table border="1" style={{ width: '60%', marginTop: '20px', textAlign: 'left', marginTop: '30px', marginBottom: '40px' }}>
//                   <tbody>
//                     <tr>
//                       <td className="heading">Organiser Name</td>
//                       <td className="data">{clubInfo.Club_id}</td>
//                     </tr>
//                     <tr>
//                       <td className="heading">Club Name</td>
//                       <td className="data">{clubInfo.Club_Name}</td>
//                     </tr>
//                     <tr>
//                       <td className="heading">User id</td>
//                       <td className="data">{clubInfo.Club_Description}</td>
//                     </tr>
//                     <tr>
//                       <td className="heading">Phone no.</td>
//                     <td className="data">{clubInfo.Club_Description}</td>
//                     </tr>
//                   </tbody>
//                 </table></>
//               ) : (
//                 <p>Loading club information...</p>
//               )}
              
              
//             </div>
//             <div className="submit" style={{ display: 'flex', justifyContent: 'right' }}>
//               <button type="submit" className="delete-button" style={{ padding: '0px', marginTop: '20px', marginBottom: '20px', marginRight: '20px', padding: '10px', paddingRight: '20px', paddingLeft: '20px' }} onClick={deleteClub}>Delete Account🗑</button>
//             </div>  
//           </>
//         ) : (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//             <div style={{ textAlign: 'center' }}>
//               <button
//                 type="submit"
//                 className="submit-button"
//                 style={{
//                   marginBottom: '25px',
//                   padding: '30px',
//                   paddingLeft: '160px',
//                   paddingRight: '160px',
//                   fontSize: '24px',
//                   cursor: 'pointer',
//                 }}
//                 onClick={handleModalOpen}
//               >
//                 +Add Profile
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Modal */}
//         {showModal && (
//           <div
//             className="modal show"
//             style={{
//               display: 'block',
//               position: 'fixed',
//               top: '0',
//               left: '0',
//               right: '0',
//               bottom: '0',
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               zIndex: '9999',
//             }}
//             onClick={handleModalClose}
//           >
//             <div
//               className="modal-dialog"
//               role="document"
//               style={{ position: 'relative', margin: '10% auto' }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="modal-content" style={{ border: '1px solid white', borderRadius: '20px', overflow: 'hidden', fontSize: '16px' }}>
//                 <div className="modal-header">
//                   <h5 className="modal-title">Enter Organiser Details</h5>
//                 </div>
//                 <div className="modal-body" style={{ display: 'grid', gap: '30px' }}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="Organiser Name"
//                     placeholder="Enter Organiser Name"
//                     value={formData.clubName}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className="form-control"
//                     name="Club name"
//                     placeholder="Enter Club name"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className="form-control"
//                     name="Email"
//                     placeholder="Enter Email"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     className="form-control"
//                     name="Phone no."
//                     placeholder="Enter Phone no."
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
                  
//                 </div>
//                 <div className="modal-footer">
//                 <button
//                 type="submit"
//                 style={{
//                     backgroundColor: '#6E5485',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '50px', // Makes it round
//                     padding: '8px 16px', // Small size
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                 }}
//                 onClick={handleModalClose}
//                 >
//                 Cancel
//                 </button>


                  
//                   <button type="submit" className="submit-button" onClick={handleSubmit}>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}




//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ClubOps(props) {
  const navigate = useNavigate();

  const [add, setAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [formDataReg, setFormDataReg] = useState({
    startDate: '',
    endData: '',
    fee: ''
  });

  const [formData, setFormData] = useState({
    coverImage: null,
    clubName: '',
    description: '',
  });

  const [clubInfo, setClubInfo] = useState(null);

  // Simulated useEffect: Set dummy club info
  useEffect(() => {
  // Fetch board member status and club info when the component loads
  const fetchClubData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/checkIfBoardMember", {
        withCredentials: true,
      });

      console.log("Board member status:", response.data.data.isMember);

      if (response.data.data.isMember === 'yes') {
        setAdd(true); // User is a board member

        // Fetch the club data
        const clubResponse = await axios.get("http://localhost:4000/user/clubInfoPresident", {
          withCredentials: true,
        });

        if (clubResponse.data.data && clubResponse.data.data.length > 0) {
          setClubInfo(clubResponse.data.data[0]);
          console.log("Club Info:", clubResponse.data.data[0]);
        }

      } else {
        setAdd(false); // User is not a board member
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchClubData();
}, []);


  // Handle text input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // File input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      coverImage: selectedFile
    }));
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);
  const handleRegClose = () => setShowRegistrationModal(false);

  const deleteClub = async () => {
    try {
      const cname = clubInfo.Club_Name;
      await axios.post("http://localhost:4000/user/clubdelete", { clubName: cname }, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clubName.trim() || !formData.description.trim() || !formData.coverImage) {
      alert("Please fill in all fields and upload an image before submitting.");
      return;
    }

    const data = new FormData();
    data.append("clubName", formData.clubName);
    data.append("description", formData.description);

    try {
      const response = await axios.post("http://localhost:4000/user/addclub", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setAdd(true);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding club:", error);
    }
  };

  const handleOpenRegistrations = () => {
    setShowRegistrationModal(true);
  };

  const handleSubmitReg = async () => {
    try {
      const response = await axios.post("http://localhost:4000/user/clubregdetails", {
        clubName: clubInfo.Club_Name,
        startDate: formDataReg.startDate,
        endDate: formDataReg.endData,
        fee: formDataReg.fee
      }, {
        withCredentials: true,
      });

      if (response.data.success === true) {
        alert("Registered successfully");
        handleRegClose();
      }
    } catch (error) {
      console.error("Error registering club:", error);
    }
  };

  const handleInputChangeReg = (e) => {
    const { name, value } = e.target;
    setFormDataReg((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="default-page">
        <div className="header">
          <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
            {props.name}
          </Link>
        </div>
        <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

        {add ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/login" style={{ color: 'white', backgroundColor: '#7338A0', fontSize: '16px', width: '100px', textAlign: 'center', borderRadius: '20px', marginRight: '20px' }}>
                Log out↪
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              {clubInfo ? (
                <table border="1" style={{ width: '60%', marginTop: '30px', marginBottom: '40px', textAlign: 'left' }}>
                  <tbody>
                    <tr><td className="heading">Organiser Name</td><td className="data">{clubInfo.Club_id}</td></tr>
                    <tr><td className="heading">Club Name</td><td className="data">{clubInfo.Club_Name}</td></tr>
                    <tr><td className="heading">User id</td><td className="data">{clubInfo.Club_Description}</td></tr>
                    <tr><td className="heading">Phone no.</td><td className="data">{clubInfo.Club_StartDate}</td></tr>
                  </tbody>
                </table>
              ) : (
                <p>Loading club information...</p>
              )}
            </div>
            <div className="submit" style={{ display: 'flex', justifyContent: 'right' }}>
              <button type="submit" className="delete-button" style={{ margin: '20px' }} onClick={deleteClub}>
                Delete Account🗑
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button
              className="submit-button"
              style={{ marginBottom: '25px', padding: '30px 160px', fontSize: '24px', cursor: 'pointer' }}
              onClick={handleModalOpen}
            >
              +Add Profile
            </button>
          </div>
        )}

        {showModal && (
          <div className="modal show" style={{ display: 'block', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={handleModalClose}>
            <div className="modal-dialog" role="document" style={{ position: 'relative', margin: '10% auto' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-content" style={{ border: '1px solid white', borderRadius: '20px', fontSize: '16px' }}>
                <div className="modal-header"><h5 className="modal-title">Enter Organiser Details</h5></div>
                <div className="modal-body" style={{ display: 'grid', gap: '30px' }}>
                  <input className="form-control" name="Organiser Name" placeholder="Enter Organiser Name" value={formData.clubName} onChange={handleInputChange} />
                  <input className="form-control" name="Club name" placeholder="Enter Club name" value={formData.description} onChange={handleInputChange} />
                  <input className="form-control" name="Email" placeholder="Enter Email" value={formData.description} onChange={handleInputChange} />
                  <input className="form-control" name="Phone no." placeholder="Enter Phone no." value={formData.description} onChange={handleInputChange} />
                </div>
                <div className="modal-footer">
                  <button onClick={handleModalClose} style={{ backgroundColor: '#6E5485', color: 'white', border: 'none', borderRadius: '50px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
