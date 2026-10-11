// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import img from '../rv-logo.jpg';
// import coin from '../apCoin.png';

// export default function ActivityPoints(props) {
//   const [events, setEvents] = useState([]);
//   const [participatedEventIds, setParticipatedEventIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [points,setPoints]=useState([])

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [registeredRes, participatedRes] = await Promise.all([
//           axios.get("http://localhost:4000/user/eventRegisteredByYou", { withCredentials: true }),
//           axios.get("http://localhost:4000/user/eventParticipatedByYou", { withCredentials: true })
//         ]);
//         // console.log(events)
//         console.log(registeredRes)
//         setEvents(registeredRes.data.events || []);
//         // console.log(registeredRes)

//         // setParticipatedEventIds(
//         //   participatedRes.data.attendedEvents?.[0]?.Event_id 
//         //     ? [participatedRes.data.attendedEvents[0].Event_id] 
//         //     : []
//         // );
//         // const response = await axios.get('http://localhost:4000/user/eventParticipatedByYou', 
//         //   {
//         //     // eventId:eventId
//         //   },
//         //   {
//         //       withCredentials: true // This should be in the config object
//         //   }
//         // )



//         console.log("41",participatedRes)

        
//       // console.log("35",getEventPoints)

//       const participatedEventMap = new Map(
//         participatedRes.data.attendedEvents?.map(event => [event.Event_id, event.Points]) || []
//       );
//       console.log(participatedEventMap)


     

//         const participatedEventIdss = participatedRes.data.attendedEvents?.map(event => event.Event_id) || [];

//         setParticipatedEventIds(participatedEventIdss);

//         setPoints(participatedEventMap);

        
        
//         setLoading(false);
//         console.log("24",participatedRes.data.attendedEvents[0].Points)
//         console.log("29",participatedEventIdss)
//         console.log("53",points)

//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     }
    
//     fetchData();
//   }, []);


//   useEffect(() => {
//     console.log("Updated Points Map:", points);
//     // points.get(E)
//   }, [points]); 




//   const generateReport=async ()=>{
//     console.log("genrate")
//     axios.get("http://localhost:4000/user/report", {
//       withCredentials: true,  // Make sure credentials are included with the request
//     })
//     .then((response) => {
//       const data = response.data;
//       console.log("Fetched Events:", data);
//     console.log("Report URL:", data.data.url);
//     console.log(data[0])
     

    
//     })
//     .catch((error) => console.error("Error fetching events:", error));

//   }
 
//   return (
//     <div>
//       <div className="default-page">
//         <div className="header">
//           <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
//             {props.name}
//           </Link>
//           <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
//             <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
//             <Link to="/eventHorizon" className="linkTop">CLUB CONNECT</Link>
//             <Link to="/profile" className="linkTop">PROFILE</Link>
//             <Link to="/activityPoints" className="linkTop" style={{ border: '1px white solid', borderRadius: '20px', paddingRight: '15px', backgroundColor: '#7338A0' }}>
//               ACTIVITY POINTS🪙: {}
//             </Link>
//           </div>
//         </div>
//         <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

//         <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', marginBottom: '30px', fontSize: '16px' }}>
//           {loading ? (
//             <p>Loading events...</p>
//           ) : events.length === 0 ? (
//             <p style={{ textAlign: 'center', fontSize: '24px', marginTop: '20px' }}>NO HISTORY AVAILABLE</p>
//           ) : (
//             events.map(event => {
//               const isParticipated = participatedEventIds.includes(event.Event_id);
//               const eventPoints = points.get(event.Event_id) || 0;

//               return (
//                 <div key={event.Event_id} className="card mb-3">
//                   <div className="row g-0">
//                     <div className="col-md-4">
//                       <img src={img} className="img-fluid rounded-start" alt="Event" style={{ width: '300px', marginTop: '50px', marginLeft: '50px', borderRadius: '30px', overflow: 'hidden' }} />
//                     </div>
//                     <div className="col-md-8">
//                       <div className="card-body" style={{ paddingLeft: '0px', marginLeft: '-70px', display: 'grid', gridTemplateColumns: '4fr 1fr' }}>
//                         <div className="card-body-left">
//                           <h5 className="card-title" style={{ marginBottom: '30px' }}>{event.Title}</h5>
//                           <p className="card-text">Event Id: {event.Event_id}</p>
//                           <p className="card-text">{event.Summary}</p>
//                           <p className="card-text">Event start date: {event.Event_StartDate}</p>
//                           <p className="card-text">Event end date: {event.Event_EndDate}</p>
//                           <p className="card-status">✅ Registered 
//                             {isParticipated ? (
//                               <span style={{ marginLeft: '30px' }}>✅ Participated</span>
//                             ) : (
//                               <span style={{ marginLeft: '30px' }}>❌ Participated</span>
//                             )}
//                           </p>
//                           {/* <div className="mb-3">
//                             <label htmlFor="formFile" className="form-label" style={{ marginTop: '10px' }}>Upload Images</label>
//                             <input className="form-control" type="file" id="formFile" style={{ width: '400px' }} />
//                           </div> */}
//                           <button type="submit" className="submit-button" style={{ marginLeft: '200px' }} onClick={generateReport}>Generate AI Report</button>
//                         </div>
//                         <div className="card-body-right" style={{ alignContent: 'center' }}>
//                           <img src={coin} style={{ width: '150px' }} alt="coin" />
//                           <p style={{ paddingLeft: '60px', fontWeight: 'bold' }}>+{eventPoints}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import img from '../rv-logo.jpg';
import coin from '../apCoin.png';

export default function ActivityPoints(props) {
  const navigate = useNavigate();
  // const [eventTitle, setEventTitle] = useState("Sample Event");


  const [events, setEvents] = useState([]);
  const [participatedEventIds, setParticipatedEventIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState([]);
  const [reportUrl, setReportUrl] = useState(null);  
  const [totalactivity,setTotalactivity]=useState("")// Store the generated report URL

  useEffect(() => {
    async function fetchData() {
      try {
        const [registeredRes, participatedRes] = await Promise.all([
          axios.get("http://localhost:4000/user/eventRegisteredByYou", { withCredentials: true }),
          axios.get("http://localhost:4000/user/activityPointView", { withCredentials: true })
        ]);

        setEvents(registeredRes.data.events || []);
        
        const participatedEventMap = new Map(
          participatedRes.data.attendedEvents?.map(event => [event.Event_id, event.Points]) || []
        );
        const participatedEventIdss = participatedRes.data.attendedEvents?.map(event => event.Event_id) || [];
        setTotalactivity(participatedRes.data.totalPoints)
        console.log(participatedRes.data.totalPoints)
        setParticipatedEventIds(participatedEventIdss);
        setPoints(participatedEventMap);
        setLoading(false);
        console.log(participatedEventMap)

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);



  const generateReport = async () => {
    console.log("Generate Report Started");

    try {
      const response = await axios.get("http://localhost:4000/user/report", {
        withCredentials: true,
      });
      
      const data = response.data;
      console.log("Fetched Report Data:", data);

      // Store the report URL for displaying the link
      setReportUrl(data.data.url || null);

    } catch (error) {
      console.error("Error generating report:", error);
    }
  };


  const handleUpload = async (event,eventTitle) => {
    console.log(eventTitle)
    // navigate('/uploadImage');
    navigate('/uploadImage', { state: {eventTitle } });

    console.log("upload")
  };

  return (
    <div className="default-page">
    <div className="header">
      <Link
        to="/userHome"
        className="name-page"
        style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}
      >
        {props.name}
      </Link>
      <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
        <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
        <Link to="/eventHorizon" className="linkTop">CLUB CONNECT</Link>
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
  
    <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', marginBottom: '30px', fontSize: '16px' }}>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '24px', marginTop: '20px' }}>NO HISTORY AVAILABLE</p>
      ) : (
        events.map(event => {
          const isParticipated = participatedEventIds.includes(event.Event_id);
          const eventPoints = points.get(event.Event_id) || 0;
          // setEventTitle(event.Title);
          const evenTitlee=event.Title
          console.log(eventPoints)

  
          return (
            <div key={event.Event_id} className="card mb-3">
                 <div className="row g-0">
                   <div className="col-md-4">
                      <img src={img} className="img-fluid rounded-start" alt="Event" style={{ width: '300px', marginTop: '0px', marginLeft: '0px', borderRadius: '0px', overflow: 'hidden' }} />
                     </div>
                     <div className="col-md-8">
                       <div className="card-body" style={{ paddingLeft: '0px', marginLeft: '-70px', display: 'grid', gridTemplateColumns: '4fr 1fr' }}>
                         <div className="card-body-left">
                           <h5 className="card-title" style={{ marginBottom: '30px' }}>{event.Title}</h5>
                           <p className="card-text">Event Id: {event.Event_id}</p>
                           <p className="card-text">{event.Summary}</p>
                           <p className="card-text">Event start date: {event.Event_StartDate}</p>
                           <p className="card-text">Event end date: {event.Event_EndDate}</p>

                          <div style={{ display: 'flex', gap: '30px', marginBottom : '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', backgroundColor: '#d4edda', borderRadius: '30px', color: 'green', fontWeight: 'bold', paddingLeft: '38px', paddingRight: '38px' }}>✅Registered
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '30px', paddingRight : '30px', height: '40px', backgroundColor:  isParticipated ? '#d4edda' : 'rgba(239, 57, 57, 0.8)', borderRadius: '30px', color: isParticipated ? 'green' : 'white', fontWeight: 'bold' }}>
                          {(isParticipated ? '✅Participated' : '❌Participated')}
                        </div>
                      </div>
                      {isParticipated && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '10px' }}>
                        <button type="submit" className="submit-button" style={{ paddingLeft: '110px', paddingRight: '110px', textAlign: 'center', marginRight: '50px' }}    onClick={(event) => handleUpload(event, evenTitlee)}  >Upload Images</button>
                      </div>
                      )}
                      {/* {isParticipated && (
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label" style={{ marginTop: '10px' }}>Upload Images</label>
                  <input className="form-control" type="file" id="formFile" style={{ width: '400px' }} />
                </div>
              )} */}



                    </div>

                    {/* Right Column */}
                    <div style={{ marginLeft: '550px' }}>
                      <div className="col-md-4">
                        <img src={img} alt="Club Image" style={{ width: '70px' }} />
                      </div>
                      <div className="card-body-right" style={{ alignContent: 'center' }}>
                        <img src={coin} style={{ marginLeft: '-60px', width: '150px', marginTop: '50px' }} />
                        <p style={{ fontWeight: 'bold', marginTop: '-20px' }}>+{eventPoints}</p>
                      </div>
                    </div>

                           {/* <p className="card-status">✅ Registered  */}
                             {/* {isParticipated ? (
                              <span style={{ marginLeft: '30px' }}>✅ Participated</span>
                            ) : (
                              <span style={{ marginLeft: '30px' }}>❌ Participated</span>
                            )} */}
                          {/* </p> */}
                    {/* </div> */}
                    {/* <div className="card-body-right" style={{ alignContent: 'center' }}>
                    <div className="col-md-4">
                        <img src={img} alt="Club Image" style={{ width: '70px' ,marginright:'10px'}} />
                      </div>
                      
                      <img src={coin} style={{ width: '150px' }} alt="coin" />
                      <p style={{ paddingLeft: '60px', fontWeight: 'bold' }}>+{eventPoints}</p>
                    
                    </div> */}
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
  
      {/* Only show the "Generate AI Report" button after all events are rendered */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="button" className="submit-button" onClick={generateReport}>
          Generate AI Report
        </button>
      </div>
  
      {/* If report is generated, display the link */}
      {reportUrl && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a className="genrate" href={reportUrl} target="_blank" style={{ textDecoration: 'none', border: 'none' , backgroundColor: 'rgba(44,38,56,255)' }}>
            <button type="button" className="submit-button">
              Click here to view the report
            </button>
          </a>
        </div>
      )}
    </div>
  </div>
  
  );
}
