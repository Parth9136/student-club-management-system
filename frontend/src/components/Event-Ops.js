import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import img1 from '../OrganiserImage1.png';
import axios from 'axios';


export default function EventOps(props) {
  

  const [eventFilter, setEventFilter] = useState("Ongoing");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    activityPoints: "",
    participationFee: "",
    eventTime: "",
    URLProof: ""
  });
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // Store fetched events
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);


  const handleEventOverview = (event,eventId) => {
    console.log(eventId)
    navigate('/eventOverview', {
      state: { eventId } // Pass the event name as state
    });
  };


  
   const handleEventverify = (event,eventId) => {
    console.log(eventId)
    navigate('/VerifyByDean', {
      state: { eventId } // Pass the event name as state
    });

    
  };
   const handlefileChange = (e) => {
        console.log("file changing")
        console.log(e.target.files[0])

    setFormData((prev) => ({ ...prev, URLProof: e.target.files[0] })); // Assuming URLProof is for the PDF file
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // console.log("rhbgfndnd")
    e.preventDefault();
    console.log(formData);

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.startDate.trim() ||
      !formData.endDate.trim() ||
      !formData.activityPoints.trim() ||
      !formData.participationFee.trim()
      
   
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    try {
      
      const response = await axios.post("http://localhost:4000/user/eventAdd", {
        title: formData.name,
        summary: formData.description,
        fee: formData.participationFee,
        points: formData.activityPoints,
        startDate: formData.startDate,
        endDate: formData.endDate,
        eventTime: formData.eventTime,
        
        
      }, {
        withCredentials: true,
      });
      console.log(response);
      handleModalClose();
    //    const data = new FormData();

    //    console.log(formData.clubName);
    // data.append("eventId", "HB817");
    // console.log("HB817")
    // data.append("coverImage", formData.URLProof);
    //   const res = await axios.post("http://localhost:4000/user/eventAddPdf", data, {
    //           withCredentials: true,
    //           headers: {
    //             "Content-Type": "multipart/form-data", // Important for file uploads
    //           },
    //   });
    //   console.log(res)


      // window.location.reload(); 
      
      console.log()

    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleEventFilterChange = (e) => {
    console.log("file changing")
    setEventFilter(e.target.value);
    
  };

  const handleDelete = () => {
    // To be filled by backend data
  };


  const today = new Date();
  const now = today.toISOString().slice(0, 16);

  // Fetch events based on filter
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get('http://localhost:4000/user/eventOverviewOfPresident', {
          withCredentials: true, // Make sure this is enabled for sessions or authentication
        });
        console.log(response)
        if (response.status===200) {
          // Handle the response as needed
          console.log(response.data.message);
        }
        console.log("hgfdsjkal")
        console.log(response.data.events)
  
        if (response.data.events) {
          setEvents(response.data.events); // Update state with the fetched events
        } else {
          setError('Failed to load events');
        }
      } catch (err) {
        setError('An error occurred while fetching events');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, [eventFilter]); // Fetch events whenever eventFilter changes
  // Fetch events whenever eventFilter changes

  return (
    <div>
      <div className="default-page">
        <div className="header">
          <Link
            to="/organiserHome"
            className="name-page"
            style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}
          >
            {props.name}
          </Link>
          <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
            <Link to="/eventHorizon" className="linkTop"
              style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px solid white', borderRadius: '50px', width: '200px', textAlign: 'center' }}
            >
              EVENT OPS
            </Link>
            <Link to="/clubOps" className="linkTop">CLUB OPS</Link>
          </div>
        </div>
        <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

        {/* Select dropdown and Add Event button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
          <select
            id="eventFilter"
            onChange={handleEventFilterChange}
            style={{ padding: "8px", fontSize: "16px", borderRadius: "40px", cursor: "pointer", width: "25%", textAlign: "center", backgroundColor: '#7338A0' }}
          >
            <option value="Ongoing">Ongoing Events</option>
            <option value="All">All Events</option>
          </select>

          <button
            style={{ color: 'white', backgroundColor: '#7338A0', fontSize: '16px', width: '200px', textAlign: 'center', borderRadius: '20px', padding: '10px', textDecoration: 'none', border: 'none' }}
            onClick={handleModalOpen}
          >
            + Add Event
          </button>
        </div>

        {/* Display events or "No Events Found!" */}
        {/* {loading ? (
  <p>Loading events...</p>
) : error ? (
  <p>{error}</p>
) : events.length === 0 ? (
  <p>No Events Found!</p>
) : (
  <div className="userBody">
    {events.map((event) => (
      <div key={event.eventId} className="cardPair">
        <div className="card">
          <div className="card-items" style={{ padding: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
              <div className="card-inner-left">
                <div className="card-item">Event Id: {event.eventId}</div>
                <div className="card-item">Event Name: {event.title}</div>
                <div className="card-item">Summary: {event.summary}</div>
              </div>
              <button className="event-button" onClick={handleEventOverview}>
                        Event Overview
                      </button>
                      <button className="event-button" onClick={handleDelete}>
                        Event Delete
                      </button>
              <div className="card-inner-right" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                <img src={img1} style={{ width: "75px", height: "auto", borderRadius: "10px" }} alt="Event" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)} */}

        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>{error}</p>
        ) : events.length === 0 ? (
          <p>No Events Found!</p>
        ) : (
          <div className="userBody">
            {events.map((event) => (

              <div key={event.id} className="cardPair">
                <div className="card">
                  <div className="card-items" style={{ padding: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
                      <div className="card-inner-left">
                        <div className="card-item">Event Id: {event.eventId}</div>
                        <div className="card-item">Event Name: {event.title}</div>
                      </div>
                      <div className="card-inner-right" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                        <img src={img1} style={{ width: "75px", height: "auto", borderRadius: "10px" }} alt="Event" />
                      </div>
                    </div>
                    <div className="card-item" style={{ height: "100px" }}>Summary: {event.description}</div>
                    <div className="card-item" style={{ height: "100px" }}>
  Verified: {event.dean_approval ? '✅ Yes' : '❌ No'}
</div>


                    <div className="submit" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', objectFit: 'contain', gap: '30px' }}>
                      <button className="event-button" onClick={(e) => handleEventOverview(e, (event.eventId))} >
                        Event Overview
                      </button>
                      <button className="event-button" onClick={handleDelete}>
                        Event Delete
                      </button>
                      <button className="event-button" onClick={(e) => handleEventverify(e, (event.eventId))} >
                        Verify the Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for adding events */}
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
              backgroundColor: 'rgba(44,38,56,255);',
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
                  <h5 className="modal-title">Enter Event Details</h5>
                </div>
                <div className="modal-body" style={{ display: 'grid', gap: '30px' }}>
                  {/* Modal content */}
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Event Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Event Description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="participationFee"
                    placeholder="Participation Fee"
                    value={formData.participationFee}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="activityPoints"
                    placeholder="Activity Points"
                    value={formData.activityPoints}
                    onChange={handleInputChange}
                  />

                  <input
                    type="time"
                    className="form-control"
                    name="eventTime"
                    placeholder="Time"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                  />
                  <div>
                    <p>Registration Start Time:</p>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={now}
                    />
                  </div>
                  <div>
                    <p>Registration End Time:</p>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      min={now}
                    />
{/*                     
                     <div>
        <p>Upload Event PDF</p>
        <input
          type='file'
          className="form-control"
          name="url"
          accept=".docx"
          onChange={handlefileChange}
        />
      </div> */}
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
