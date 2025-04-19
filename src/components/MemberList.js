import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MemberList.css'; // Import file CSS cho component này

function MemberList() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:8080/member'); // Endpoint lấy danh sách member
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMembers(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []); // [] có nghĩa là useEffect chỉ chạy một lần sau lần render đầu tiên

    if (loading) {
        return <div>Loading members...</div>;
    }

    if (error) {
        return <div>Error loading members: {error.message}</div>;
    }

    return (
        <div className="member-list-container">
            <h1>Member List</h1>
            {members.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th> {/* Thêm cột Actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phoneNumber}</td>
                                <td>
                                    <Link to={`/members/update/${member.id}`}>Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No members found.</div>
            )}
        </div>
    );
}

export default MemberList;