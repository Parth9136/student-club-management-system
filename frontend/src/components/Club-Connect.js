// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function ClubConnect(props) {
//   const [clubs, setClubs] = useState([]); // To store clubs data
//   const [register, setRegister] = useState({}); // Object to store register status for each club



//   // useEffect to fetch clubs from the API
//   useEffect(() => {
//     // Using axios to fetch event data from the API
//     axios.get("http://localhost:4000/user/clubpage", {
//       withCredentials: true,  // Make sure credentials are included with the request
//     })
//     .then((response) => {
//       const data = response.data;
//       console.log("Fetched Events:", data);
//       console.log(response)


//       // Set events state (ensure events is an array)
//       setClubs(Array.isArray(data.clubs) ? data.clubs : []);

//       const initialRegisterStates = {};
//       data.clubs.forEach(club => {
//         initialRegisterStates[club.Club_id] = club.isUserMember || false;
//       });

//       // Set register states
//       setRegister(initialRegisterStates);
//     })
//     .catch((error) => console.error("Error fetching events:", error));

//   }, []);


//     // Function to handle registration
//     const handleRegister = (clubId) => {
//       setRegister((prevState) => ({
//         ...prevState,
//         [clubId]: true, // Mark this specific club as registered
//       }));
//     };
//   return (
//     <div className="default-page" style={{ height: '100vh', overflowY: 'auto' }}>
//       <div className="header">
//         <div className="name-page" style={{ fontSize: '15px', padding: '0px' }}>
//           {props.name}
//         </div>
//         <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
//           <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
//           <Link to="/eventHorizon" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>CLUB CONNECT</Link>
//           <Link to="/profile" className="linkTop">PROFILE</Link>
//           {/******Add activity points here*******/}
//           <Link to="/activityPoints" className="linkTop" style={{ border: '1px white solid', borderRadius: '20px', paddingRight: '15px' }}>ACTIVITY POINTS🪙: {}</Link>
//         </div>
//       </div>
//       <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
      
//       {/* Cards Container - Make this scrollable */}
//       <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', marginBottom: '30px' }}>
//                 {/* Dynamically render cards for each club */}
//                 {
//           clubs.length === 0 ? (
//             <p style= {{margin : '30px' , textAlign : 'center' , fontSize : '30px'}}>OOPS! No clubs are recruiting😞</p>
//           ) : (
//             clubs.map((club) => (
//               <div key={club.id} className="card mb-3">
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img src={img} className="img-fluid rounded-start" alt="Club Image" style={{ width: '320px' }} />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body" style={{ paddingLeft: '0px', marginLeft: '-70px' }}>
//                       <h5 className="card-title" style={{ marginBottom: '30px' }}>{club.name}</h5>
//                       <p className="card-text">Club id: {club.id}</p>
//                       <p className="card-text" style={{ height: '50px' }}>{club.description}</p>
//                       <p className="card-text">Sign Up fee: {club.fee}</p>
//                       <p className="card-text">Club start date: {club.startDate}</p>
//                       {club.isRegistered ? (
//               // If already registered, show the "Registered" button
//               <button className="submitted-button" disabled>
//                 Registered
//               </button>
//             ) : (
//               // If not registered, show the "Register" button
//               <button className="submit-button" onClick={() => handleRegister(club.Event_id)}>
//                 Register
//               </button>
//             )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )
//         }

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import img from '../rv-logo.jpg';

export default function ClubConnect(props) {
  const [clubs, setClubs] = useState([]); // To store clubs data
  const [register, setRegister] = useState({}); // Object to store register status for each club
  const [activityPoints, setActivityPoints] = useState(0); // For activity points


  const [totalactivity,setTotalactivity]=useState("")// Store the generated report URL

  
  
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("anusha")
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

  // useEffect to fetch clubs from the API
  useEffect(() => {
    // Using axios to fetch club data from the API
    axios.get("http://localhost:4000/user/clubpage", {
      withCredentials: true,  // Make sure credentials are included with the request
    })
    .then((response) => {
      const data = response.data;
      console.log("Fetched Clubs:", data);

      // Set clubs state (ensure clubs is an array)
      setClubs(Array.isArray(data.data) ? data.data : []);

      const initialRegisterStates = {};
      data.data.forEach(club => {
        initialRegisterStates[club.Club_id] = club.isUserMember || false;
      });

      // Set register states
      setRegister(initialRegisterStates);

      console.log(clubs[0].isUserMember)

      // Set activity points (if available)
      setActivityPoints(data.activityPoints || 0);
    })
    .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  // Function to handle registration
  const handleRegister = (Club_Name) => {
    setRegister((prevState) => ({
      ...prevState,
      [Club_Name]: true, // Mark this specific club as registered
    }));
    console.log(Club_Name)

    // Optionally, update the backend about the registration status
    axios.post("http://localhost:4000/user/clubregister", { clubName:Club_Name }, { withCredentials: true })
      .then((response) => {
        console.log('Registered to club:', response);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
      window.location.reload(); 

  };


  return (
    <div className="default-page" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="header">
         <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
                    {props.name}
          </Link>
        <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
          <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
          <Link to="/eventHorizon" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>CLUB CONNECT</Link>
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
      
      {/* Cards Container - Make this scrollable */}
      <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', marginBottom: '30px' }}>
        {/* Dynamically render cards for each club */}
        {clubs.length === 0 ? (
          <p style={{ margin: '30px', textAlign: 'center', fontSize: '30px' }}>OOPS! No clubs are recruiting😞</p>
        ) : (
          clubs.map((club) => (
            <div key={club.Club_id} className="card mb-3" style={{ display: 'flex', margin: '20px' }}>
              <div className="row g-0">
                <div className="col-md-4">
                {/* <img src={img} className="img-fluid rounded-start" alt="Club Image" style={{ width: '',height:"20%" }} />

                  <img src={club.image} className="img-fluid rounded-start" alt="Club Image" style={{ width: '320px' ,height:'100%'}} /> */}
                   <img 
        src={club.image} 
        className="img-fluid rounded-start" 
        alt="Club Image" 
        style={{ width: '480px', height: '100%' }} 
      />
      
      <img 
  src={img} 
  className="img-fluid rounded-start" 
  alt="Overlay Image" 
  style={{ 
    position: 'absolute', 
    top: '10px',  // Add some space from the top
    right: '10px',  // Add some space from the right
    width: '80px',  // Adjust width as needed
    height: '80px',
    borderRadius: "8px" // Adjust height as needed
  }} 
/>

   
                </div>
                <div className="col-md-8">
                  <div className="card-body" style={{ paddingLeft: '0px', marginLeft: '-70px',paddingLeft: '100px' }}>
                    <h5 className="card-title" style={{ marginBottom: '30px' }}>{club.Club_Name}</h5>
                    <p className="card-text">Club ID: {club.Club_id}</p>
                    <p className="card-text" style={{ height: '50px' }}>{club.Club_Description}</p>
                    <p className="card-text">Sign Up fee: {club.Fee ? club.Fee : "Free"}</p>
                    <p className="card-text">Club start date: {club.Club_StartDate ? new Date(club.Club_StartDate).toLocaleDateString() : "Not given"}</p>
                    {club.isUserMember ? (
                      // If already registered, show the "Registered" button
                      <button className="submitted-button" disabled>
                        Registered
                      </button>
                    ) : (
                      // If not registered, show the "Register" button
                      <button className="submit-button" onClick={() => handleRegister(club.Club_Name)}>
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

