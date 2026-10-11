import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function ViewMembers(props) {
    const TableComponent = () => {
        const [data, setData] = useState({
          usn: null,
          name: null,
          phone: null,
        });

        useEffect(() => {
            // Replace with your actual API call
            fetch('/api/user-details')
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => console.error('Error fetching data:', error));
        }, []);

        // This function renders the rows
        const renderRow = (data) => {
            return (
                <tr>
                    <td className='data'>{data.usn}</td>
                    <td className='data'>{data.name}</td>
                    <td className='data'>{data.phone}</td>
                </tr>
            );
        };

        return (
            <div>
                  <div className="default-page">
                    <div className="header">
                      <Link to="/organiserHome" className="name-page" style={{ fontSize: '15px', padding: '0px', backgroundColor: 'rgba(44,38,56,255)', border: 'none' }}>
                                  {props.name}
                                </Link>
                                <div className="userOptions" style={{ padding: '0px', display: 'flex', gap: '50px', fontSize: '15px', fontWeight: '900', alignItems: 'center' }}>
                                  <Link to="/eventOps" className="linkTop">EVENT OPS</Link>
                                  <Link to="/clubOps" className="linkTop" style={{ fontWeight: 'bold', backgroundColor: '#7338A0', border: '2px', borderColor: 'white', borderRadius: '50px', width: '200px', textAlign: 'center' }}>CLUB OPS</Link>
                      </div>
                    </div>
                    <hr style={{ marginTop: '0px', border: '1.5px solid white' }} />
                    <div className="keyboard">
                        <span className="key">M</span>
                        <span className="key">E</span>
                        <span className="key">M</span>
                        <span className="key">B</span>
                        <span className="key">E</span>
                        <span className="key">R</span>
                        <span className="key">S</span>
                        
                    </div>
                    <div className="profileBody">
                        <table border="1" style={{ 
                            width: '100%', 
                            marginTop: '20px', 
                            textAlign: 'left', 
                            marginTop: '30px', 
                            marginBottom: '40px', 
                            tableLayout: 'fixed' 
                        }}>
                            <thead>
                                <tr>
                                    <td className='table_top' style={{ width: '33.33%' }}>USN</td>
                                    <td className='table_top' style={{ width: '33.33%' }}>Name</td>
                                    <td className='table_top' style={{ width: '33.33%' }}>Phone number</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Check if there is any data */}
                                {data.usn || data.name || data.phone ? (
                                    renderRow(data)
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="no-data" style={{textAlign :'center'}}>No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return <TableComponent />;
}
