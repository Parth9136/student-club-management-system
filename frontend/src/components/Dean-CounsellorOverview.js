

// // import React, { useState, useEffect } from 'react';
// // import { Link, useLocation } from "react-router-dom";

// // export default function EventOverview(props) {
// //     const location = useLocation();
// //     const { eventId } = location.state || {};
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [isSaving, setIsSaving] = useState(false);

// //     // Dummy mock data (replace with real data as needed)
// //     const mockUsers = [
// //         { USN: '1RV22CS001', name: 'Alice', activitypoints: '9'},
// //         { USN: '1RV22CS002', name: 'Bob', activitypoints: '87'},
// //         { USN: '1RV22CS003', name: 'Charlie', activitypoints: '90' },
// //     ];

// //     useEffect(() => {
// //         // Simulate fetch delay
// //         setLoading(true);
// //         setTimeout(() => {
// //             setData(mockUsers);
// //             setLoading(false);
// //         }, 1000);
// //     }, [eventId]);

// //     const handleCheckboxChange = (e, userId) => {
        
// //     };

// //     const handleSaveChanges = () => {
        
// //     };

// //     const renderRow = (user) => {
// //     return (
// //         <tr key={user.USN}>
// //             <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
// //                 <Link to="/CTrackActivity" state={{ usn: user.USN }} style={{
// //     color: 'white',
// //     textDecoration: 'underline',
// //     backgroundColor: 'transparent',
// //     padding: '0px',
// //     border: 'none',
// //     display: 'inline-block'
// // }}>
// //     {user.USN}
// // </Link>

// //             </td>
// //             <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>{user.name}</td>
// //             <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>{user.activitypoints}</td>
// //         </tr>
// //     );
// // };

    

// //     return (
// //         <div>
// //             <div className="default-page">
// //                 <div className="header">
// //                     <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
// //                         {props.name}
// //                     </Link>
// //                     <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
// //                         <Link to="/ORegister" className="linkTop">ADD CLUB</Link>
// //                     </div>
// //                 </div>
// //                 <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
// //                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    
// //                 </div>

// //                 <div className="keyboard">
// //                     {Array.from('STUDENT LIST').map((char, idx) => (
// //                         <span className="key" key={idx}>{char}</span>
// //                     ))}
// //                 </div>

// //                 <div className="profileBody">
// //                     <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left', marginTop: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
// //                         <thead>
// //                             <tr>
// //                                 <td className='table_top' style={{ width: '30%' }}>USN</td>
// //                                 <td className='table_top' style={{ width: '30%' }}>Name</td>
// //                                 <td className='table_top' style={{ width: '30%' }}>Activity points</td>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {loading ? (
// //                                 <tr>
// //                                     <td colSpan="4" className="no-data" style={{ textAlign: 'center' }}>Loading...</td>
// //                                 </tr>
// //                             ) : data.length > 0 ? (
// //                                 data.map(renderRow)
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="4" className="no-data" style={{ textAlign: 'center' }}>No data found</td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>
                
// //             </div>
// //         </div>
// //     );
// // }



// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import axios from 'axios';

// export default function EventOverview(props) {
//     // const location = useLocation();
//     // const { eventId } = location.state || {};
//     // const [data, setData] = useState([]);
//     // const [loading, setLoading] = useState(true);

//     // useEffect(() => {
//     //     const fetchClubs = async () => {
//     //         try {
//     //             setLoading(true);

//     //             const res = await axios.get(
//     //                 "http://localhost:4000/user/getCounsellorEmails",
//     //                 { withCredentials: true }
//     //             );
//     //             console.log(res.data.data)
//     //             const arr = Array.isArray(res.data.data) ? res.data.data : [];

//     //             const trimmed = arr.map(c => ({
//     //                 clubId: c.name,
//     //                 organiserName: c.email
//     //             }));
//     //             console.log(trimmed)
//     //             setData(trimmed);
//     //         } catch (err) {
//     //             console.error("Error fetching clubs:", err);
//     //             setData([]);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchClubs();
//     // }, [eventId]);

//     // const renderRow = (club) => (
//     //     <tr key={club.clubId}>
//     //         <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
//     //             <Link
//     //                 to="/DEvent"
//     //                 state={{ clubId: club.clubId }}
//     //                 style={{
//     //                     color: 'white',
//     //                     textDecoration: 'underline',
//     //                     backgroundColor: 'transparent',
//     //                     padding: '0px',
//     //                     border: 'none',
//     //                     display: 'inline-block'
//     //                 }}
//     //             >
//     //                 {club.clubId}
//     //             </Link>
//     //         </td>
//     //         <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
//     //             <Link
//     //                 to="/counsellorProfile"
//     //                 state={{ organiserName: club.organiserName }}
//     //                 style={{
//     //                     color: 'white',
//     //                     textDecoration: 'underline',
//     //                     backgroundColor: 'transparent',
//     //                     padding: '0px',
//     //                     border: 'none',
//     //                     display: 'inline-block'
//     //                 }}
//     //             >
//     //                 {club.organiserName}
//     //             </Link>
//     //         </td>
//     //     </tr>
//     // );

//     // return (
//     //     <div>
//     //         <div className="default-page">
//     //             <div className="header">
//     //                 <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
//     //                     {props.name}
//     //                 </Link>
//     //                 <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
//     //                     <Link to="/DHOME" className="linkTop">BACK</Link>
//     //                 </div>
//     //             </div>
//     //             <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

//     //             <div className="keyboard">
//     //                 {Array.from("COUNSELLOR OVERVIEW").map((char, idx) => (
//     //                     <span className="key" key={idx}>
//     //                         {char}
//     //                         {idx === 3 ? '\u00A0' : ''}
//     //                     </span>
//     //                 ))}
//     //             </div>

//     //             <div className="profileBody">
//     //                 <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
//     //                     <thead>
//     //                         <tr>
//     //                             <td className='table_top' style={{ width: '50%' }}>Counsellor Name</td>
//     //                             <td className='table_top' style={{ width: '50%' }}>Counsellor Email</td>
//     //                         </tr>
//     //                     </thead>
//     //                     <tbody>
//     //                         {loading ? (
//     //                             <tr>
//     //                                 <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>Loading...</td>
//     //                             </tr>
//     //                         ) : data.length > 0 ? (
//     //                             data.map(renderRow)
//     //                         ) : (
//     //                             <tr>
//     //                                 <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>No data found</td>
//     //                             </tr>
//     //                         )}
//     //                     </tbody>
//     //                 </table>
//     //             </div>
//     //         </div>
//     //     </div>
//     // );
//    const location = useLocation();
//     const { eventId } = location.state || {};
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCounsellors = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get(
//                     "http://localhost:4000/user/getCounsellorEmails",
//                     { withCredentials: true }
//                 );

//                 const arr = Array.isArray(res.data.data) ? res.data.data : [];

//                 const formatted = arr.map(c => ({
//                     name: c.Name || c.name,
//                     email: c.Email || c.email
//                 }));

//                 setData(formatted);
//             } catch (err) {
//                 console.error("Error fetching counsellors:", err);
//                 setData([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCounsellors();
//     }, [eventId]);

//     const renderRow = (counsellor, index) => (
//         <tr key={index}>
//             <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
//                 <Link
//                     to="/counsellorProfile"
//                     state={{ name: counsellor.name }}
//                     style={{
//                         color: 'white',
//                         textDecoration: 'underline',
//                         backgroundColor: 'transparent',
//                         padding: '0px',
//                         border: 'none',
//                         display: 'inline-block'
//                     }}
//                 >
//                     {counsellor.name}
//                 </Link>
//             </td>
//             <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
//                 {counsellor.email}
//             </td>
//         </tr>
//     );

//     return (
//         <div>
//             <div className="default-page">
//                 <div className="header">
//                     <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
//                         {props.name}
//                     </Link>
//                     <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
//                         <Link to="/DHOME" className="linkTop">BACK</Link>
//                     </div>
//                 </div>
//                 <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />

//                 <div className="keyboard">
//                     {Array.from("COUNSELLOR OVERVIEW").map((char, idx) => (
//                         <span className="key" key={idx}>
//                             {char}
//                             {idx === 3 ? '\u00A0' : ''}
//                         </span>
//                     ))}
//                 </div>

//                 <div className="profileBody">
//                     <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
//                         <thead>
//                             <tr>
//                                 <td className='table_top' style={{ width: '50%' }}>Counsellor Name</td>
//                                 <td className='table_top' style={{ width: '50%' }}>Counsellor Email</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>Loading...</td>
//                                 </tr>
//                             ) : data.length > 0 ? (
//                                 data.map(renderRow)
//                             ) : (
//                                 <tr>
//                                     <td colSpan="2" className="no-data" style={{ textAlign: 'center' }}>No data found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }









import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DeanCounsellorOverview = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounsellors = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "http://localhost:4000/user/getCounsellorEmails",
                    { withCredentials: true }
                );

                const arr = Array.isArray(res.data.data) ? res.data.data : [];

                const formatted = arr.map(c => ({
                    name: c.Name || c.name,
                    email: c.Email || c.email
                }));

                setData(formatted);
            } catch (err) {
                console.error("Error fetching counsellors:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCounsellors();
    }, []);

    const renderRow = (counsellor, index) => (
        <tr key={index}>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                <Link
                    to="/counsellorProfile"
                    state={{ name: counsellor.name }}
                    style={{
                        color: 'white',
                        textDecoration: 'underline',
                        backgroundColor: 'transparent',
                        padding: '0px',
                        border: 'none',
                        display: 'inline-block'
                    }}
                >
                    {counsellor.name} {/* Ensure this is a string */}
                </Link>
            </td>
            <td className='data' style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
                {counsellor.email} {/* Ensure this is a string */}
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
                    {Array.from("COUNSELLOR OVERVIEW").map((char, idx) => (
                        <span className="key" key={idx}>
                            {char}
                            {idx === 9 ? '\u00A0' : ''}
                        </span>
                    ))}
                </div>

                <div className="profileBody">
                    <table border="1" style={{ width: '100%', marginTop: '30px', marginBottom: '40px', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <td className='table_top' style={{ width: '50%' }}>Counsellor Name</td>
                                <td className='table_top' style={{ width: '50%' }}>Counsellor Email</td>
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
};

export default DeanCounsellorOverview;
