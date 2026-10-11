import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function UploadDocxOnly(props) {
  const location = useLocation();
  const [eventName, setEventName] = useState("Default Event Name");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Check if location.state and eventId are available
    if (location.state && location.state.eventId) {
      setEventName(location.state.eventId || "Default Event Name");
    }
  }, [location.state]);

  // Handles file selection
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Safely access file

    if (file) {
      // Check for valid .docx MIME type
      if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setSelectedFile(file);
      } else {
        alert("Please select a valid Word document (.docx).");
        setSelectedFile(null);
      }
    } else {
      alert("No file selected.");
      setSelectedFile(null);
    }
  };

  // Handles file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No valid file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", selectedFile); // Use same field name expected by backend
    formData.append("eventId", eventName);

    console.log("Event Name:", eventName);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post("http://localhost:4000/user/eventAddPdf", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Document uploaded successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading document.");
    }
  };

  return (
    <div className="default-page">
      <div className="header">
        <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
          {props.name}
        </Link>
        <div className="userOptions" style={{ display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
          <Link to="/eventHorizon" className="linkTop">EVENT HORIZON</Link>
          <Link to="/eventHorizon" className="linkTop">CLUB CONNECT</Link>
          <Link to="/profile" className="linkTop">PROFILE</Link>
          <Link to="/activityPoints" className="linkTop" style={{ border: '1px white solid', borderRadius: '20px', paddingRight: '15px', backgroundColor: '#7338A0' }}>
            ACTIVITY POINTS🪙: {/* Add totalActivity here if needed */}
          </Link>
        </div>
      </div>
      <hr style={{ border: '1.5px solid white' }} />

      <div className="keyboard">
        {[...'UPLOAD'].map((char, index) => (
          <span key={index} className="key">{char}</span>
        ))}
      </div>

      {/* File Upload */}
      <div className="mb-3" style={{ textAlign: 'center', width: '300px', margin: '50px auto' }}>
        <input
          className="form-control"
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          style={{ marginBottom: '20px' }}
        />
      </div>

      {/* Upload Button */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button className="submit-button" style={{ width: '170px', textAlign: 'center', padding: '20px' }} onClick={handleUpload}>
          Upload Document
        </button>
      </div>
    </div>
  );
}
