
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

export default function DeanCounsellor(props) {
    const location = useLocation();
    const { eventId } = location.state || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    "http://localhost:4000/user/getCounsellorEmails",
                    { withCredentials: true }
                );

                const arr = Array.isArray(res.data.data) ? res.data.data : [];

                const trimmed = arr.map(c => ({
                    clubId: c.Club_id,
                    organiserName: c.Organiser_name || "Still not updated"
                }));

                setData(trimmed);
            } catch (err) {
                console.error("Error fetching clubs:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, [eventId]);

    const renderRow = (club) => (
        <tr key={club.clubId}>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                <Link
                    to="/DEvent"
                    state={{ clubId: club.clubId }}
                    style={{
                        color: 'white',
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                        padding: '0px',
                        border: 'none',
                        display: 'inline-block'
                    }}
                >
                    {club.clubId}
                </Link>
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                <Link
                    to="/counsellorProfile"
                    state={{ organiserName: club.organiserName }}
                    style={{
                        color: 'white',
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                        padding: '0px',
                        border: 'none',
                        display: 'inline-block'
                    }}
                >
                    {club.organiserName}
                </Link>
            </td>
        </tr>
    );

    return (
        <div>
            <div className="default-page">
                <div className="header">
                    <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
                        {props.name}
                    </Link>
                    <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
                        <Link to="/DHOME" className="linkTop">BACK</Link>
                    </div>
                </div>
                <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

                <div className="keyboard">
                    {Array.from("COUNSELLOR OVERVIEW ").map((char, idx) => (
                        <span className="key" key={idx}>
                            {char}
                            {idx === 3 ? '\u00A0' : ''}
                        </span>
                    ))}
                </div>

                <div className="profileBody">
                    <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <td className='table_top' style={{ width: '50%' }}>Counsellor Mail</td>
                                <td className='table_top' style={{ width: '50%' }}>Counsellor Name</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>Loading...</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map(renderRow)
                            ) : (
                                <tr>
                                    <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
