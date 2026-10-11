import React, { useEffect, useState } from "react";

function CounsellorStudentList({ instImg, instName, name }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("http://localhost:4000/api/students", {
          credentials: "include",  // if your backend requires cookies/auth
        });
        if (!response.ok) {
          throw new Error("error");
        }
        const data = await response.json();
        setStudents(data.students || []); // adjust based on your API response shape
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return (
    <div>
      <header>
        <img src={instImg} alt={instName} style={{ width: "150px" }} />
        <h1>{instName}</h1>
        <h2>{name} - Student List</h2>
      </header>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CounsellorStudentList;