import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

export default function UploadImage(props) {
    const [totalActivity, setTotalActivity] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventImages, setEventImages] = useState([]);  // Store fetched event images

    const location = useLocation();
    const { eventTitle } = location.state || {};  // Access the eventTitle passed from navigate

    useEffect(() => {
        console.log("Received event title:", eventTitle); // Log to verify if the eventTitle is correctly passed

        if (eventTitle) {
            setEventName(eventTitle);
            fetchEventImages(eventTitle);  // Fetch images for the event
        } else {
            setEventName("Default Event Name");
        }

        // Fetch activity points
        async function fetchActivityPoints() {
            try {
                const response = await axios.get("http://localhost:4000/user/activityPointView", { withCredentials: true });
                setTotalActivity(response.data.totalPoints);
            } catch (error) {
                console.error("Error fetching activity points:", error);
            }
        }
        fetchActivityPoints();
    }, [eventTitle]);  // Runs when eventTitle changes

    // Fetch images for the event
    const fetchEventImages = async (eventTitle) => {
        try {
          console.log(eventTitle)
          const response = await axios.post('http://localhost:4000/user/eventImagesView', 
            {
              eventName:eventTitle
            },
            {
                withCredentials: "true" // This should be in the config object
            }
        );

            console.log("Fetched event images:", response.data);

            if (response.data.images) {
                setEventImages(response.data.images);
            }
        } catch (error) {
            console.error("Error fetching event images:", error);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select at least one image.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("coverImage", file);
        });
        formData.append("eventName", eventName);

        try {
            const response = await axios.post("http://localhost:4000/user/addEventImage", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(response.data);
            alert("Images uploaded successfully!");
            window.location.reload(); 

            
            // Fetch updated images after uploading
            fetchEventImages(eventName);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div className="default-page">
            <div className="header">
                <Link to="/userHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
                    {props.name}
                </Link>
                <div className="userOptions" style={{ display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
                  

                   
                </div>
            </div>
            <hr style={{ border: '1.5px solid white' }} />

            <div className="keyboard">
                {[...'MEMORIES'].map((char, index) => (
                    <span key={index} className="key">{char}</span>
                ))}
            </div>

            {/* File Upload */}
            <div className="mb-3" style={{ textAlign: 'center', width: '300px', margin: '50px auto' }}>
                <input className="form-control" type="file" id="formFileMultiple" multiple onChange={handleFileChange} />
            </div>

            {/* Upload Button */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button className="submit-button" style={{ width: '170px', textAlign: 'center', padding: '20px' }} onClick={handleUpload}>
                    Upload Images
                </button>
            </div>

            {/* Gallery Preview */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>GALLERY</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {/* Display uploaded files (preview before upload) */}
                    {selectedFiles.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
                    ))}
                    
                    {/* Display fetched images from the server */}
                    {eventImages.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Event Image ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
