// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function EventOverview(props) {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [updating, setUpdating] = useState(null); // keeps track of which row is being toggled

//     useEffect(() => {
//         const fetchEventsForDean = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get("http://localhost:4000/user/EventForapproval", {
//                     withCredentials: true
//                 });

//                 const arr = Array.isArray(res.data.data) ? res.data.data : [res.data.data];

//                 const formatted = arr.map((ev) => ({
//                     clubName: ev.clubName ?? "Unknown Club",
//                     eventName: ev.eventName ?? "Untitled Event",
//                     eventId: ev.eventId ?? "UNKNOWN",
//                     isApproved: Boolean(ev.approved),
//                     pdfUrl: ev.deanApprovalPdf || null
//                 }));

//                 setData(formatted);
//             } catch (err) {
//                 console.error("Error fetching events:", err);
//                 setData([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEventsForDean();
//     }, []);

//     /**
//      * Toggle the approval status for a given event
//      * Replace the endpoint below with the one that matches your backend API
//      */
//     const toggleApproval = async (eventId, currentStatus) => {
//         try {
//             setUpdating(eventId);
//             await axios.patch(`http://localhost:4000/user/event/${eventId}/approval`,
//                 { approved: !currentStatus },
//                 { withCredentials: true }
//             );

//             // Optimistically update UI after success
//             setData(prev => prev.map(ev =>
//                 ev.eventId === eventId ? { ...ev, isApproved: !currentStatus } : ev
//             ));
//         } catch (err) {
//             console.error("Error updating approval:", err);
//             alert("Could not update status. Please try again.");
//         } finally {
//             setUpdating(null);
//         }
//     };

//     const renderRow = (club) => (
//         <tr key={club.eventId}>
//             <td className='data' style={{ border: '1px solid white' }}>{club.clubName}</td>
//             <td className='data' style={{ border: '1px solid white' }}>{club.eventName}</td>
//             <td className='data' style={{ border: '1px solid white', textAlign: 'center' }}>
//                 {club.pdfUrl ? (
//                     <a
//                         href={club.pdfUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ color: 'lightblue', textDecoration: 'underline' }}>
//                         View PDF
//                     </a>
//                 ) : 'N/A'}
//             </td>
//             <td
//                 className='data'
//                 style={{
//                     border: '1px solid white',
//                     textAlign: 'center',
//                     cursor: 'pointer',
//                     userSelect: 'none'
//                 }}
//                 onClick={() => toggleApproval(club.eventId, club.isApproved)}>
//                 {/* Show ellipsis while the particular row is updating */}
//                 {updating === club.eventId ? '…' : club.isApproved ? '✔' : '❌'}
//             </td>
//         </tr>
//     );

//     return (
//         <div>
//             <div className="default-page">
//                 <div className="header">
//                     <Link to="/organiserHome" className="name-page">
//                         {props.name}
//                     </Link>
//                     <div className="userOptions">
//                         <Link to="/DHome" className="linkTop">BACK</Link>
//                     </div>
//                 </div>

//                 <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
//                 <div className="keyboard">
//                     {Array.from("APPROVE EVENT").map((char, idx) => (
//                         <span className="key" key={idx}>
//                             {char}
//                             {idx === 6 ? '\u00A0' : ''}
//                         </span>
//                     ))}
//                 </div>

//                 <div className="profileBody">
//                     <table border="1" style={{ width: '100%', marginTop: '30px', tableLayout: 'fixed' }}>
//                         <thead>
//                             <tr>
//                                 <th className='table_top'>Club Name</th>
//                                 <th className='table_top'>Event Name</th>
//                                 <th className='table_top'>View PDF</th>
//                                 <th className='table_top'>Approved</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="4" style={{ textAlign: 'center' }}>Loading...</td>
//                                 </tr>
//                             ) : data.length > 0 ? (
//                                 data.map(renderRow)
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4" style={{ textAlign: 'center' }}>No data found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default function EventOverview(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null); // currently updating eventId

    useEffect(() => {
        const fetchEventsForDean = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:4000/user/EventForapproval", {
                    withCredentials: true
                });

                const arr = Array.isArray(res.data.data) ? res.data.data : [res.data.data];

                const formatted = arr.map((ev) => ({
                    clubName: ev.clubName ?? "Unknown Club",
                    eventName: ev.eventName ?? "Untitled Event",
                    eventId: ev.eventId || ev._id || ev.id || "UNKNOWN",  // fallback to actual ID field
                    isApproved: Boolean(ev.approved),
                    pdfUrl: ev.deanApprovalPdf || null
                }));

                setData(formatted);
            } catch (err) {
                console.error("Error fetching events:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsForDean();
    }, []);

    const toggleApproval = async (eventId, currentStatus) => {
        if (eventId === "UNKNOWN") {
            alert("Invalid event ID");
            return;
        }

        try {
            setUpdating(eventId);
            console.log(`Toggling approval for ${eventId}, current: ${currentStatus}`);

            await axios.patch(
                `http://localhost:4000/user/event/${eventId}/approval`,
                { approved: !currentStatus }, // adjust this key if needed
                { withCredentials: true }
            );

            setData(prev =>
                prev.map(ev =>
                    ev.eventId === eventId ? { ...ev, isApproved: !currentStatus } : ev
                )
            );
        } catch (err) {
            console.error("Error updating approval:", err);
            alert("Could not update approval status. Check console for details.");
        } finally {
            setUpdating(null);
        }
    };

    const renderRow = (club) => (
        <tr key={club.eventId}>
            <td className='data' style={{ border: '1px solid white' }}>{club.clubName}</td>
            <td className='data' style={{ border: '1px solid white' }}>{club.eventName}</td>
            <td className='data' style={{ border: '1px solid white', textAlign: 'center' }}>
                {club.pdfUrl ? (
                    <a
                        href={club.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'lightblue', textDecoration: 'underline' }}>
                        View PDF
                    </a>
                ) : 'N/A'}
            </td>
            <td
                className='data'
                style={{
                    border: '1px solid white',
                    textAlign: 'center',
                    cursor: club.eventId === 'UNKNOWN' ? 'not-allowed' : 'pointer',
                    userSelect: 'none'
                }}
                onClick={() =>
                    club.eventId !== 'UNKNOWN' && toggleApproval(club.eventId, club.isApproved)
                }
            >
                {updating === club.eventId ? '…' : club.isApproved ? '✔' : '❌'}
            </td>
        </tr>
    );

    return (
        <div>
            <div className="default-page">
                <div className="header">
                    <Link to="/organiserHome" className="name-page">
                        {props.name}
                    </Link>
                    <div className="userOptions">
                        <Link to="/DHome" className="linkTop">BACK</Link>
                    </div>
                </div>

                <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
                <div className="keyboard">
                    {Array.from("APPROVE EVENT").map((char, idx) => (
                        <span className="key" key={idx}>
                            {char}
                            {idx === 6 ? '\u00A0' : ''}
                        </span>
                    ))}
                </div>

                <div className="profileBody">
                    <table border="1" style={{ width: '100%', marginTop: '30px', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th className='table_top'>Club Name</th>
                                <th className='table_top'>Event Name</th>
                                <th className='table_top'>View PDF</th>
                                <th className='table_top'>Approved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>Loading...</td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map(renderRow)
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
