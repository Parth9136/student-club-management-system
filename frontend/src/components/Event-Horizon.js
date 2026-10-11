// import React,{ useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import placeholderImg from '../rv-logo.jpg'; // Make sure this image exists

// import img from '../rv-logo.jpg'
// import axios from "axios";

// export default function EventHorizon(props) {
//   const [events, setEvents] = useState([]);
//   const [registerStates, setRegisterStates] = useState({}); // Track registration for each event
//     const [uploadedReceipts, setUploadedReceipts] = useState({});
//   const [uploadedPhotos, setUploadedPhotos] = useState({});
//   const [uploadedPDFs, setUploadedPDFs] = useState({});
//   const [totalactivity,setTotalactivity]=useState("")// Store the generated report URL

  
  
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         console.log("anusha")
//         axios.get("http://localhost:4000/user/activityPointView",{ withCredentials: true })
//         .then((response)=>{
//           console.log(response.data.totalPoints)
//           setTotalactivity(response.data.totalPoints)
//         })

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
    
//     fetchData();
//   }, []);


//   useEffect(() => {
//     // Using axios to fetch event data from the API
//     axios.get("http://localhost:4000/user/eventOverview", {
//       withCredentials: true,  // Make sure credentials are included with the request
//     })
//     .then((response) => {
//       const data = response.data;
//       console.log("Fetched Events:", data);

//       // Set events state (ensure events is an array)
//       setEvents(Array.isArray(data.events) ? data.events : []);

//       const initialRegisterStates = {};
//       data.events.forEach(event => {
//         initialRegisterStates[event.id] = event.isRegistered || false;
//       });

//       // Set register states
//       setRegisterStates(initialRegisterStates);
//     })
//     .catch((error) => console.error("Error fetching events:", error));

//   }, []);
// //   useEffect(() => {
// //     /*****Fetch from api******/
// //     // http://localhost:4000/user/eventOverview
// //   //   fetch("http://localhost:4000/user/eventOverview") // Replace with your actual API endpoint
// //   //     .then((response) => response.json())
// //   //     .then((data) => setEvents(data))
// //   //     .catch((error) => console.error("Error fetching events:", error));
// //   // }, 
  
// //   fetch("http://localhost:4000/user/eventOverview", {
// //     // method: "GET",
// //     credentials: "include",
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log("Fetched Events:", data);
// //       setEvents(Array.isArray(data.events) ? data.events : []);
// //       console.log(setEvents)
// //       console.log(events[0])
// //       // console.log(events[0].Event_id)
// //       const initialRegisterStates = {};
// //           data.forEach(event => {
// //             initialRegisterStates[event.id] = event.isRegistered || false;
// //           });
// //           setRegisterStates(initialRegisterStates);

// //     })
// //     .catch((error) => console.error("Error fetching events:", error));
  
// // },
  
// //   []);

//   /*****Extract the state from the database******/
//   // const [registerStates, setRegisterStates] = useState({}); // Track registration for each event

//   const handleRegister =async (eventId) => {
//     setRegisterStates(prevState => ({
//       ...prevState,
//       [eventId]: true // Assume successful registration
//     }));
//     console.log("Event Registered:", eventId);
//     const response = await axios.post('http://localhost:4000/user/eventregister', 
//       {
//         eventId:eventId
//       },
//       {
//           withCredentials: true // This should be in the config object
//       }
      
//   );
//   console.log(response)
//   // console.log(cookies)


  
//   window.location.reload(); 
//   };

  
//   const handleUpload = (e, type, eventId) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fileURL = URL.createObjectURL(file);
//     console.log(fileURL)
//     const imageTypes = ['image/jpeg', 'image/png'];
//     const pdfType = 'application/pdf';

//     if (type === 'receipt' && imageTypes.includes(file.type)) {
//       setUploadedReceipts(prev => ({ ...prev, [eventId]: fileURL }));
//       alert("Payment receipt uploaded: " + file.name);
//     // } else if (type === 'photo' && imageTypes.includes(file.type)) {
//     //   setUploadedPhotos(prev => ({ ...prev, [eventId]: fileURL }));
//     //   console.log(uploadedPhotos)
//     //   alert("Event photo uploaded: " + file.name);
//     //   axios.post("http://localhost:4000/user/addEventImage",{//send the event name}, {
//     //   withCredentials: true,  // Make sure credentials are included with the request
//     // })
    
//     // }
//     }
//      else if (type === 'photo' && imageTypes.includes(file.type)) {
//       setUploadedPhotos(prev => ({ ...prev, [eventId]: fileURL }));
//       console.log(uploadedPhotos)
//       alert("Event photo uploaded: " + file.name);
//       const formData = new FormData();
//       console.log("hjdgchsl")
//       console.log(events[0])
//       formData.append('eventName', eventId);
//       formData.append('files', file);
//       axios.post("http://localhost:4000/user/addEventImage", formData, {
//         withCredentials: true,  
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }).then(console.log("sucefully uploaded"))
//     }
//      else {
//       alert("Invalid file type.");
//     }
//   };

//   return (
//     <div>
//       <div className="default-page">
//               <div className="header">
//                  <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
//                             {props.name}
//                   </Link>
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholderImg from '../rv-logo.jpg'; // Make sure this image exists
import img from '../rv-logo.jpg';
import axios from "axios";

export default function EventHorizon(props) {
  const [events, setEvents] = useState([]);
  const [registerStates, setRegisterStates] = useState({}); // Track registration for each event
  const [uploadedReceipts, setUploadedReceipts] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [uploadStatus, setUploadStatus] = useState({}); // Track upload status for each event
  const [totalactivity, setTotalactivity] = useState(""); // Store the generated report URL

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("anusha");
        const response = await axios.get("http://localhost:4000/user/activityPointView", { withCredentials: true });
        console.log(response.data.totalPoints);
        setTotalactivity(response.data.totalPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/user/eventOverview", {
      withCredentials: true,  // Make sure credentials are included with the request
    })
    .then((response) => {
      const data = response.data;
      console.log("Fetched Events:", data);

      setEvents(Array.isArray(data.events) ? data.events : []);

      const initialRegisterStates = {};
      data.events.forEach(event => {
        initialRegisterStates[event.id] = event.isRegistered || false;
      });

      setRegisterStates(initialRegisterStates);
    })
    .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleRegister = async (eventId) => {
    setRegisterStates(prevState => ({
      ...prevState,
      [eventId]: true // Assume successful registration
    }));
    console.log("Event Registered:", eventId);
    const response = await axios.post('http://localhost:4000/user/eventregister', 
      {
        eventId: eventId
      },
      {
        withCredentials: true // This should be in the config object
      }
    );
    console.log(response);
    window.location.reload(); 
  };

  const handleUpload = (e, type, eventId) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    console.log(fileURL);
    const imageTypes = ['image/jpeg', 'image/png'];

    if (type === 'receipt' && imageTypes.includes(file.type)) {
      setUploadedReceipts(prev => ({ ...prev, [eventId]: fileURL }));
      alert("Payment receipt uploaded: " + file.name);
    } else if (type === 'photo' && imageTypes.includes(file.type)) {
      setUploadedPhotos(prev => ({ ...prev, [eventId]: fileURL }));
      alert("Event photo uploaded: " + file.name);
      const formData = new FormData();
      console.log("edgf")
      console.log(eventId)
      formData.append('coverImage', file);
      formData.append('eventId', eventId);
      
      axios.post("http://localhost:4000/user/addEventImageProof", formData, {
        withCredentials: true,  
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        // Update upload status to "Uploaded"
        setUploadStatus(prev => ({ ...prev, [eventId]: true }));
        console.log("Successfully uploaded");
      })
      .catch(err => {
        console.error("Upload failed:", err);
      });
    } else {
      alert("Invalid file type.");
    }
  };

  return (
    <div>
      <div className="default-page">
        <div className="header">
          <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
            {props.name}
          </Link>

                <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
                    
                    <Link to="/eventHorizon" className="linkTop" style={{fontWeight:'bold',backgroundColor : '#7338A0', border: '2px' , borderColor:'white', borderRadius: '50px', width : '200px' ,textAlign :'center'}}>EVENT HORIZON</Link>
                    
                  
                  <Link to="/clubConnect" className="linkTop">CLUB CONNECT</Link>
                  <Link to="/profile" className="linkTop">PROFILE</Link>
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
              <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
              <div className="userBody">
                {events.length === 0 ? (
                  <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>
                    NO EVENTS LINED UP!
                  </div>
                ) : (
                  events.map((event) => (
                    // <div className="cardPair" key={event.id}>
                    <div className="cardPair" key={event.Event_id}>

                      <div className="card">
                        <div className="card-items" style={{ padding: "20px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
                            <div className="card-inner-left">
                              <div className="card-item">Event Id: {event.Event_id}</div>
                              <div className="card-item">Event Name: {event.Title}</div>
                              <div className="card-item">Activity points: {event.Points}</div>
                            </div>
                            <div className="card-inner-right" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                              <img src={img} style={{ width: "75px", height: "auto", borderRadius: "10px" }} alt="Event" />
                              {registerStates[event.Event_id] && (
                        <>
                          {uploadedReceipts[event.Event_id] && (
                            <img
                              src={uploadedReceipts[event.Event_id]}
                              alt="Receipt"
                              style={{ width: "150px", height: "auto", borderRadius: "12px", border: "2px solid gray" }}
                            />
                          )}
                          {parseFloat(event.Fee) > 500 && (
                            <img
                              src={placeholderImg}
                              alt="R Stamp"
                              style={{ width: "150px", height: "auto", borderRadius: "12px", border: "2px solid gray" }}
                            />
                          )}
                        </>
                      )}
                            </div>
                          </div>
                          <div className="card-item" style={{ height: "100px" }}>Summary: {event.Summary}</div>
                          <div className="card-item">Event Start Date: {event.Event_StartDate}</div>
                          <div className="card-item">Event End Date: {event.Event_EndDate}</div>
                          <div className="card-item">Participation fee: {event.Fee}</div>
                          <div className="submit">
                            {/* {register ? (
                              <button type="submit" className="submitted-button" onClick={handleRegister}>Registered</button>
                            ) : (
                              <button type="submit" className="submit-button" onClick={handleRegister}>Register</button>
                            )} */}
                             <div style={{ marginTop: "-9px", display: "flex", justifyContent: "center" }}>
                       
                      </div>
                      <div style={{ marginTop: "0px", display: "flex", gap: "20px", justifyContent: "center" }}>
                        {/* <label className="submit-button" style={{ flex: 1, maxWidth: "200px", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "150px" }}>
                          Upload Event Photo
                          <input type="file" accept=".jpg,.jpeg,.png" hidden onChange={(e) => handleUpload(e, 'photo', event.id)} />
                        </label> */}
                       <div>
                        </div>

                        <label className="submit-button" style={{ flex: 1, maxWidth: "200px", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "150px" }}>
                          Upload Event Proof 
                          <input type="file" accept=".jpg,.jpeg,.png" hidden onChange={(e) =>handleUpload(e, 'photo', event.Event_id)} />
                        </label>
                        {/* <label className="submit-button" style={{ flex: 1, maxWidth: "200px", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "150px" }}>Middle</label> */}

                         <label className="submit-button" style={{ flex: 1, maxWidth: "200px", textAlign: "center", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", height: "40px", width: "150px" }}>
                          Upload Payment Receipt
                          <input type="file" accept=".jpg,.jpeg,.png" hidden onChange={(e) => handleUpload(e, 'receipt', event.Event_id)} />
                        </label>
                      </div>
                            
                           {event.isRegistered ? (
              // If already registered, show the "Registered" button
              <button className="submitted-button" style={{ margin: "12px", border: "2px solid #000" }} disabled>
                Registered
              </button>
            ) : (
              <div>
                <button
  className="submit-button"
  style={{ margin: "12px", border: "2px solid #000" }}
  onClick={() => handleRegister(event.Event_id)}
>
  Register
</button>

                </div>
              // If not registered, show the "Register" button
             
            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
        </div>
    </div>
  )
}
