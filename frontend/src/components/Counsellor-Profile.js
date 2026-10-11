import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CounsellorProfile(props) {
  const navigate = useNavigate();
  const [counsellorData, setCounsellorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellorData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/getCounsellorDetails", {
          withCredentials: true, // Include credentials if needed
        });
        console.log(response)
        if (response.data.success) {
          setCounsellorData(response.data.data);
        } else {
          console.error("Failed to fetch counsellor data");
        }
      } catch (error) {
        console.error("Error fetching counsellor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellorData();
  }, []);

  const logout=async ()=>{
    const response = await axios.get('http://localhost:4000/user/logout', {withCredentials: true });
  navigate("/")
  }

  if (loading) return <div>Loading...</div>;
  if (!counsellorData) return <div>No data available</div>;

  return (
    <div>
      <div className="default-page">
        <div className="header">
          <Link to="/counsellorHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
            {props.name}
          </Link>
          <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
            <Link to="/counsellorProfile" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>
              PROFILE
            </Link>
          </div>
        </div>
        <hr style={{ marginTop: '0px', border: '1.5px solid white'}} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link style={{ color: 'white', backgroundColor: '#7338A0', fontSize: '16px', width: '100px', textAlign: 'center', borderRadius: '20px', marginRight: '20px' }} onClick={logout}>
            <span className="glyphicon glyphicon-log-out"></span> Log out↪
          </Link>
        </div>
        <div className="keyboard">
          <span className="key">P</span>
          <span className="key">R</span>
          <span className="key">O</span>
          <span className="key">F</span>
          <span className="key">I</span>
          <span className="key">L</span>
          <span className="key">E</span>
        </div>
        <div className="profileBody">
          <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px', textAlign: 'left' }}>
            <tbody>
              <tr>
                <td className="heading">Name</td>
                <td className="data">{counsellorData.Name || 'N/A'}</td>
              </tr>
              <tr>
                <td className="heading">Email</td>
                <td className="data">{counsellorData.Email || 'N/A'}</td>
              </tr>
              <tr>
                <td className="heading">Branch</td>
                <td className="data">{counsellorData.Department || 'N/A'}</td>
              </tr>
              <tr>
                <td className="heading">Phone No.</td>
                <td className="data">{counsellorData.Phone_no || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
