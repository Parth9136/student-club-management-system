import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import img1 from "../OrganiserImage1.png";
import axios from "axios";

export default function EventOps({ name }) {
  const location = useLocation();
  const { clubId } = location.state || {};

  const [eventFilter, setEventFilter] = useState("Ongoing");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEventFilterChange = (e) => {
    setEventFilter(e.target.value);
  };

  const handleEventOverview = (eventId) => {
    navigate("/eventOverview", { state: { eventId } });
  };

  const handleDelete = async (eventId) => {
    alert(`Delete logic for event ID ${eventId} goes here.`);
    // You can replace this alert with an actual API call to delete the event.
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!clubId) {
        setError("No club ID provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://localhost:4000/user/deanevent",
          { clubId },
          { withCredentials: true }
        );

        console.log("API Response:", response.data);

        const clubData = response.data?.data?.club;

        if (clubData && Array.isArray(clubData)) {
          setEvents(clubData);
        } else {
          setEvents([]);
          setError("No events found for this club");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [clubId]);

  // Filter events based on filter dropdown
  const filteredEvents =
    eventFilter === "All"
      ? events
      : events.filter((event) => new Date(event.Event_EndDate) >= new Date());

  return (
    <div className="default-page">
      <div className="header">
        <Link
          to="/organiserHome"
          className="name-page"
          style={{
            fontSize: "15px",
            padding: "0px",
            backgroundColor: "rgba(44,38,56,255)",
            border: "none",
          }}
        >
          {name}
        </Link>

        <div
          className="userOptions"
          style={{
            padding: 0,
            display: "flex",
            gap: "50px",
            fontSize: "15px",
            fontWeight: 900,
            alignItems: "center",
          }}
        >
          <div
            className="linkTop"
            style={{
              fontWeight: "bold",
              backgroundColor: "#7338A0",
              border: "2px solid white",
              borderRadius: "50px",
              width: "200px",
              textAlign: "center",
              padding: "10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            EVENTS OF THIS CLUB
          </div>
        </div>
      </div>

      <hr style={{ marginTop: 0, border: "1.5px solid white" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <select
          id="eventFilter"
          value={eventFilter}
          onChange={handleEventFilterChange}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "40px",
            cursor: "pointer",
            width: "25%",
            textAlign: "center",
            backgroundColor: "#7338A0",
            color: "white",
          }}
        >
          <option value="Ongoing">Ongoing Events</option>
          <option value="All">All Events</option>
        </select>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredEvents.length === 0 ? (
        <p>No Events Found!</p>
      ) : (
        <div className="userBody">
          {filteredEvents.map((event) => (
            <div key={event.eventId} className="cardPair">
              <div className="card">
                <div className="card-items" style={{ padding: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
                    <div className="card-inner-left">
                      <div className="card-item">Event Id: {event.Event_id}</div>
                      <div className="card-item">Event Name: {event.Title}</div>
                      <div className="card-item">Start Date: {event.Event_StartDate}</div>
                      <div className="card-item">End Date: {event.Event_EndDate}</div>
                      <div className="card-item">Time: {event.Event_Time}</div>
                    </div>

                    <div
                      className="card-inner-right"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={img1}
                        style={{
                          width: "75px",
                          height: "auto",
                          borderRadius: "10px",
                        }}
                        alt="Event"
                      />
                    </div>
                  </div>

                  <div className="card-item" style={{ minHeight: "80px" }}>
                    Summary: {event.Summary}
                  </div>

                  

                  <div
                    className="submit"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "30px",
                      marginTop: "15px",
                    }}
                  >
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
