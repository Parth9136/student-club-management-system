import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function EventOverview(props) {
    const location = useLocation();
    const { eventId } = location.state || {};

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:4000/user/counsellorStudentList", {
                    withCredentials: true,
                });

                const arr = Array.isArray(res.data.data) ? res.data.data : [];

                const trimmed = arr.map((student) => ({
                    userId: student.User_id || 'Unknown User',
                    name: student.FName || 'Unnamed',
                    email: student.Email || 'No Email',
                    phone: student.Phone_no || 'No Phone',
                    activityPoints: student.ActivityPoint || 0,
                }));

                setData(trimmed);
            } catch (error) {
                console.error("Error fetching students:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [eventId]);

    const renderRow = (student) => (
        <tr key={student.userId}>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {student.userId}
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {student.name}
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {student.email}
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {student.phone}
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {student.activityPoints}
            </td>
        </tr>
    );

    return (
        <div>
            <div className="default-page">
                <div className="header">
                    <Link
                        to="/organiserHome"
                        className="name-page"
                        style={{
                            fontSize: '15px',
                            padding: '0px',
                            backgroundColor: 'rgba(44,38,56,255)',
                            border: 'none'
                        }}
                    >
                        {props.name}
                    </Link>
                    <div
                        className="userOptions"
                        style={{
                            padding: '0px',
                            display: 'flex',
                            gap: '50px',
                            fontSize: '15px',
                            fontWeight: '900',
                            alignItems: 'center'
                        }}
                    >
                        <Link to="/counsellorHome" className="linkTop">BACK</Link>
                    </div>
                </div>
                <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
                <div className="keyboard">
                    {Array.from("STUDENT LIST").map((char, idx) => (
                        <span className="key" key={idx}>
                            {char}
                            {idx === 6 ? '\u00A0' : ''}
                        </span>
                    ))}
                </div>
                <div className="profileBody">
                    <table
                        border="1"
                        style={{
                            width: '100%',
                            marginTop: '30px',
                            marginBottom: '40px',
                            tableLayout: 'fixed'
                        }}
                    >
                        <thead>
                            <tr>
                                <td className='table_top' style={{ width: '20%' }}>User  ID</td>
                                <td className='table_top' style={{ width: '20%' }}>Name</td>
                                <td className='table_top' style={{ width: '20%' }}>Email</td>
                                <td className='table_top' style={{ width: '20%' }}>Phone Number</td>
                                <td className='table_top' style={{ width: '20%' }}>Activity Points</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="no-data" style={{ textAlign: 'center' }}>Loading                                    ...</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map(renderRow)
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data" style={{ textAlign: 'center' }}>
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
