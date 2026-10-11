import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
// import img from '../rv-logo.jpg'
import axios from 'axios';

export default function ClubOps(props) {
  const navigate = useNavigate();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(null); // null means loading state

  // useEffect(() => {
  //   console.log("shahasdjhfdwuhfr")
  //   const checkRegistrationStatus = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/user/checkClubRegStatus');
  //       console.log(response)
  //       if (response.data.message === 'true') {
  //         setIsRegistrationOpen(true);
  //         console.log("yepppp hurAUUYYAYA"+isRegistrationOpen)
  //       } else {
  //         setIsRegistrationOpen(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching registration status:', error);
  //       setIsRegistrationOpen(false); // default to false if error
  //     }
  //   };

  //   checkRegistrationStatus();
  // }, []);

  // if (isRegistrationOpen === null) {
  //   return <button disabled>Checking status...</button>;
  // }

  const [add, setAdd] = useState(false); // State to determine if the user can add clubs
  const [showModal, setShowModal] = useState(false);
  
  const [showModall, setShowModall] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false); // Manage registration modal visibility
  // Manage modal visibility
  const today = new Date();
  const now = today.toISOString().slice(0, 16);
  const [formDataReg, setFormDataReg] = useState({
    startDate: '',
    endDate: '',
    fee:''
  });
  const [formData, setFormData] = useState({
    coverImage: null,
    clubName: '',
    description: '', // Text fields for club details
  });
  const [clubInfo, setClubInfo] = useState(null); // State to store the club info

  useEffect(() => {
    console.log("shahasdjhfdwuhfr")
    const checkRegistrationStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/checkClubRegStatus", {
          withCredentials: true,
        });
        console.log("reeeepomsseeer"+response.data.data)
        if (response.data.message === 'true') {
          setIsRegistrationOpen(true);
          console.log("yepppp hurAUUYYAYA"+isRegistrationOpen)
        } else {
          setIsRegistrationOpen(false);
        }
        console.log(setIsRegistrationOpen)
      } catch (error) {
        console.error('Error fetching registration status:', error);
        setIsRegistrationOpen(false); // default to false if error
      }
    };

    
    // Fetch board member status and club info when the component loads
    const fetchClubData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/checkIfBoardMember", {
          withCredentials: true,
        });

        console.log(response.data.data.isMember);

        if (response.data.data.isMember=='yes') {
          setAdd(true); // Set the 'add' state to true after submission
          setShowModal(false); // Hide modal

          // Fetch the club data only if the user is a board member
          const clubResponse = await axios.get("http://localhost:4000/user/clubInfoPresident", {
            withCredentials: true,
          });
          console.log("34",clubResponse.data.data[0].image)


          setClubInfo(clubResponse.data.data[0]); 
          console.log(clubInfo.image)// Update the clubInfo state with the response data

        // const response = await axios.get("http://localhost:4000/user/clubInfoPresident", {
        //     withCredentials: true,
        //   });

        } else {
          setAdd(false); // User is not a board member
          setShowModal(false); // Show modal to add a club
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClubData();
    checkRegistrationStatus();
  }, []);

  // Handle text input change (club name, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update form data for text fields
    });
  };

  // Handle file input change (image upload)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      coverImage: selectedFile, // Store the actual file
    });
  };

  const handleModalClose = () => setShowModal(false); // Close modal
  const handleModalOpen = () => setShowModal(true); // Open modal


  
  const handleRegClose=()=>setShowRegistrationModal(false);

  const deleteClub=async ()=>{
    console.log(clubInfo.Club_Name)
    const cname=clubInfo.Club_Name
    const response = await axios.post("http://localhost:4000/user/clubdelete", {clubName:cname},
    {
        withCredentials: true,
      });
    window.location.reload(); 


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.clubName.trim() || !formData.description.trim() || !formData.coverImage) {
      alert("Please fill in all fields and upload an image before submitting.");
      return;
    }

    // Create FormData instance to handle both text and file data
    const data = new FormData();
    data.append("clubName", formData.clubName);
    data.append("description", formData.description);
    data.append("coverImage", formData.coverImage); // Append the image file

    try {
      const response = await axios.post("http://localhost:4000/user/addclub", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      console.log(response.data);
      setAdd(true); // Set the 'add' state to true after submission
      setShowModal(false); // Close the modal after adding the club
      window.location.reload(); 

    } catch (error) {
      console.error("Error adding club:", error);
    }
  };
  const handleViewMembers = () => {
    navigate('/viewMembers')
  };

  const handleOpenRegistrations = () => {
    setShowRegistrationModal(true);
    console.log("yes 134") // This correctly sets the modal visibility
    
  };
  const openRegisterForm=()=>{

  }

  const handleSubmitReg=async ()=>{
    console.log("hi")
    console.log("143",formDataReg)
try {
  const response = await axios.post("http://localhost:4000/user/clubregdetails", {
    clubName: clubInfo.Club_Name,
    startDate: formDataReg.startDate,
    endDate: formDataReg.endDate,
    fee: formDataReg.fee
  }, {
    withCredentials: true,
  });

  console.log(response.data.success);

  if (response.data.success === true) {
    alert("Registered successfully");
    handleRegClose();
  }

} catch (error) {
  console.error("Registration failed:", error.response);
  alert("An error occurred while registering. Please try again.");
}



  }



  const updateorganizer=()=>{
    navigate('/ONameUpdate');

  }
  const handleInputChangeReg = (e) => {
    console.log("146",formDataReg)

    const { name, value } = e.target;
    console.log(name,value,"149")
    setFormDataReg({
      ...formDataReg,
      [name]: value, // Update form data for text fields
    });
    console.log(formDataReg)

    
  };

  return (
    <div>
      <div className="default-page">
        <div className="header">
          <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
            {props.name}
          </Link>
          <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
            <Link to="/eventOps" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>EVENT OPS</Link>
            <Link to="/eventHorizon" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>CLUB OPS</Link>
          </div>
        </div>
        <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

        {add ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/login" style={{ color: 'white', backgroundColor: '#7338A0', fontSize: '16px', width: '100px', textAlign: 'center', borderRadius: '20px', marginRight: '20px' }}>
                <span className="glyphicon glyphicon-log-out"></span> Log out↪
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              {/* <img src={clubInfo.image} style={{ width: '200px', borderRadius: '30px' }} /> */}
              
              {/* Display club information */}
              {clubInfo ? (
                <>
                <img src={clubInfo.image} style={{ width: '200px', borderRadius: '30px' }} />

                <table border="1" style={{ width: '60%', marginTop: '20px', textAlign: 'left', marginTop: '30px', marginBottom: '40px' }}>
                  <tbody>
                    <tr>
                      <td className="heading">Club ID</td>
                      <td className="data">{clubInfo.Club_id}</td>
                    </tr>
                    <tr>
                      <td className="heading">Name</td>
                      <td className="data">{clubInfo.Club_Name}</td>
                    </tr>
                    <tr>
                      <td className="heading">Description</td>
                      <td className="data">{clubInfo.Club_Description}</td>
                    </tr>
                    <tr>
                      <td className="heading">Club Start Date</td>
                      <td className="data">{clubInfo.Club_StartDate ? clubInfo.Club_StartDate : "Not Available"}</td>
                    </tr>
                  </tbody>
                </table></>
              ) : (
                <p>Loading club information...</p>
              )}
              <button type="submit" className="submit-button" onClick={updateorganizer}>Update ORGANIZER USN</button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div className="submit">
                  <button type="submit" className="submit-button" onClick={handleViewMembers}>View Members</button>
                </div>
                <div className="submit">
      {isRegistrationOpen ? (
         <button type="submit" className="submit-button" onclick={openRegisterForm}>
          Registration is Open
        </button>
      ) : (
        <button type="submit" className="submit-button" onClick={handleOpenRegistrations}>
          Open Registrations
        </button>
      )}
    </div>
                
              </div>
            </div>
            <div className="submit" style={{ display: 'flex', justifyContent: 'right' }}>
              <button type="submit" className="delete-button" style={{ padding: '0px', marginTop: '20px', marginBottom: '20px', marginRight: '20px', padding: '10px', paddingRight: '20px', paddingLeft: '20px' }} onClick={deleteClub}>Delete club🗑</button>
            </div>  
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                className="submit-button"
                style={{
                  marginBottom: '25px',
                  padding: '30px',
                  paddingLeft: '160px',
                  paddingRight: '160px',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={handleModalOpen}
              >
                +Add Club
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div
            className="modal show"
            style={{
              display: 'block',
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '9999',
            }}
            onClick={handleModalClose}
          >
            <div
              className="modal-dialog"
              role="document"
              style={{ position: 'relative', margin: '10% auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content" style={{ border: '1px solid white', borderRadius: '20px', overflow: 'hidden', fontSize: '16px' }}>
                <div className="modal-header">
                  <h5 className="modal-title">Enter Club Details</h5>
                </div>
                <div className="modal-body" style={{ display: 'grid', gap: '30px' }}>
                  <input
                    type="text"
                    className="form-control"
                    name="clubName"
                    placeholder="Enter Club Name"
                    value={formData.clubName}
                    onChange={handleInputChange}
                  />
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Enter Club Description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="modal-footer">
                <button
                type="submit"
                style={{
                    backgroundColor: '#6E5485',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px', // Makes it round
                    padding: '8px 16px', // Small size
                    fontSize: '14px',
                    cursor: 'pointer'
                }}
                onClick={handleModalClose}
                >
                Cancel
                </button>


                  
                  <button type="submit" className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



{showRegistrationModal && (
          <div className="modal show" style={{ display: 'block', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(44,38,56,255);', zIndex: '9999' }} onClick={handleModalClose}>
            <div className="modal-dialog" role="document" style={{ position: 'relative', margin: '10% auto' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-content" style={{ border: '1px solid white', borderRadius: '20px', overflow: 'hidden', fontSize: '16px' }}>
                <div className="modal-header">
                  <h5 className="modal-title">Enter Registration Details</h5>
                </div>
                <div className="modal-body" style={{ display: 'grid', gap: '20px' }}>
                  <p>Registration Start Time:</p>
                  <input type="datetime-local" min={now} value={formDataReg.startDate} onChange={handleInputChangeReg} name="startDate" style={{ width: '50%', marginLeft: '10px' }} />
                  <p>Registration End Time:</p>
                  <input type="datetime-local" min={now} value={formDataReg.endDate} onChange={handleInputChangeReg} name="endDate" style={{ width: '50%', marginLeft: '10px' }} />
                  <p>Fee:</p>
                  <input type="text"  value={formDataReg.fee} onChange={handleInputChangeReg} name="fee" style={{ width: '50%', marginLeft: '10px' }} />
                </div>
                <div className="modal-footer" style={{ backgroundColor: 'rgba(44,38,56,255)' }}>
                  
                  <button type="button" className="btn btn-secondary" onClick={handleRegClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmitReg}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}



        {showModall && (
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
