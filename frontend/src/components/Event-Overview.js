import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

export default function EventOverview(props) {
    const location = useLocation();
    const { eventId } = location.state || { eventId: 'test-event-123' };
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const userId = 'dummy-user-id'; // Replace with actual user ID

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    'http://localhost:4000/user/eventOverviewOfPresidentOfEvent',
                    { eventId },
                    { withCredentials: true }
                );
                console.log("udygvc")
                console.log(response)
                const arr = Array.isArray(response.data.users) ? response.data.users : [];
                const transformed = arr.map(u => ({
                    USN: u.USN,
                    name: u.name,
                    phone_number: u.phone_number || 'N/A',
                    payment_confirmation_url: u.payment_confirmation_url || '',
                    payment_verified: u.payment_verified || 'no',
                    event_proof_pdf_url: u.event_proof_pdf_url || '',
                    event_proof_image_url: u.proof_url || '',
                    attendance: u.attendance || 'no'
                }));

                setData(transformed);
            } catch (error) {
                console.error('Error fetching event data:', error);
            } finally {
                setLoading(false);
            }

            try {
                await axios.post('http://localhost:4000/user/showAttendance', {
                    eventid: eventId,
                    userid: userId,
                }, { withCredentials: true });
            } catch (error) {
                console.error('Error fetching attendance:', error);
            }
        };

        fetchEventData();
    }, [eventId]);

    const handleCheckboxChange = async (e, userId, field) => {
        const value = e.target.checked ? 'yes' : 'no';
        setData(prevData => prevData.map(user =>
            user.USN === userId ? { ...user, [field]: value } : user
        ));

        try {
            setIsSaving(true);
            const endpoint = field === 'attendance' ? 'markAttendenceByPresident' : 'markPaymentVerified';
            await axios.post(`http://localhost:4000/user/${endpoint}`, {
                eventid: eventId,
                userid: userId,
                [field]: value
            }, { withCredentials: true });
        } catch (error) {
            console.error(`Error marking ${field}:`, error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            console.log(data)
            setIsSaving(true);
            await axios.post('http://localhost:4000/user/markAttendenceByPresident', {
                eventid: eventId,
                updatedAttendance: data
            }, { withCredentials: true });

            console.log('Changes saved');
        } catch (error) {
            console.error('Error saving changes:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const isImage = (url) => {
        return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'));
    };

    const isPDF = (url) => {
        return url && url.endsWith('.pdf');
    };

    const renderRow = (user) => (
        <tr key={user.USN}>
            <td className='data'>{user.USN}</td>
            <td className='data'>{user.name}</td>
            <td className='data'>{user.phone_number}</td>
            <td className='data'>
                {user.payment_confirmation_url && isImage(user.payment_confirmation_url) ? (
                    <a href={user.payment_confirmation_url} target="_blank" rel="noopener noreferrer">
                        View Image
                    </a>
                ) : 'N/A'}
            </td>
            <td className='data'>
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={user.payment_verified === 'yes'}
                    onChange={(e) => handleCheckboxChange(e, user.USN, 'payment_verified')}
                    disabled={isSaving}
                />
            </td>
            <td className='data'>
                {user.event_proof_pdf_url && isPDF(user.event_proof_pdf_url) && (
                    <a href={user.event_proof_pdf_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                        View PDF
                    </a>
                )}
                {user.event_proof_image_url && isImage(user.event_proof_image_url) && (
                    <a href={user.event_proof_image_url} target="_blank" rel="noopener noreferrer">
                        View Image
                    </a>
                )}
                {!user.event_proof_pdf_url && !user.event_proof_image_url && 'N/A'}
            </td>
            <td className='data'>
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={user.attendance === 'yes'}
                    onChange={(e) => handleCheckboxChange(e, user.USN, 'attendance')}
                    disabled={isSaving}
                />
            </td>
        </tr>
    );

    return (
        <div className="default-page">
            <div className="header">
                <Link to="/organiserHome" className="name-page" style={{
                    fontSize: '15px', padding: '0px',
                    backgroundColor: 'rgba(44,38,56,255)', border: 'none'
                }}>
                    {props.name || 'Organizer'}
                </Link>
                <div className="userOptions" style={{
                    padding: '0px', display: 'flex', gap: '50px',
                    fontSize: '15px', fontWeight: '900', alignItems: 'center'
                }}>
                    <Link to="/eventOps" className="linkTop" style={{
                        fontWeight: 'bold', backgroundColor: '#7338A0',
                        border: '2px solid white', borderRadius: '50px',
                        width: '200px', textAlign: 'center'
                    }}>EVENT OPS</Link>
                    <Link to="/clubOps" className="linkTop">CLUB OPS</Link>
                </div>
            </div>

            <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginRight: '20px' }}>
                <Link to="/uploadImage" style={{
                    color: 'white', backgroundColor: '#6e54b5',
                    fontSize: '16px', width: '300px', textAlign: 'center',
                    borderRadius: '20px', padding: '10px'
                }}>
                    View Event Images
                </Link>

                <button
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    style={{
                        color: 'white', backgroundColor: '#6e54b5',
                        fontSize: '16px', width: '300px', textAlign: 'center',
                        borderRadius: '20px', padding: '10px', border: 'none'
                    }}
                >
                    Save Changes
                </button>
            </div>

            <div className="keyboard">
                {'PARTICIPANTS'.split('').map(letter => (
                    <span className="key" key={letter}>{letter}</span>
                ))}
            </div>

            <div className="profileBody">
                <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px' }}>
                    <thead>
                        <tr>
                            <td className='table_top'>USN</td>
                            <td className='table_top'>Name</td>
                            <td className='table_top'>Phone Number</td>
                            <td className='table_top'>Payment Confirmation</td>
                            <td className='table_top'>Payment Verified</td>
                            <td className='table_top'>Event Proof</td>
                            <td className='table_top'>Attendance</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td></tr>
                        ) : data.length > 0 ? (
                            data.map(renderRow)
                        ) : (
                            <tr><td colSpan="7" style={{ textAlign: 'center' }}>No data found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

