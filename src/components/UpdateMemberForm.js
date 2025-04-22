import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateMemberForm.css'; // Import CSS

function UpdateMemberForm() {
    const { id } = useParams(); // Lấy ID từ URL params
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]); // Chạy lại effect khi ID thay đổi

    const handleSubmit = async (event) => {
        event.preventDefault();
        const memberData = {
            id: parseInt(id), // Gửi ID để server biết member nào cần cập nhật
            name: name,
            email: email,
            phoneNumber: phoneNumber,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/member/update/${id}`, { // Endpoint cập nhật
                method: 'PUT', // Hoặc 'POST' tùy theo API của bạn
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            if (response.ok) {
                console.log('Member updated successfully!');
                navigate('/members'); // Chuyển về trang danh sách sau khi cập nhật
            } else {
                console.error('Failed to update member:', response.status);
                // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('There was an error updating the member:', error);
            // Hiển thị thông báo lỗi
        }
    };

    if (loading) {
        return <div>Loading member details...</div>;
    }

    if (error) {
        return <div>Error loading member details: {error.message}</div>;
    }

    return (
        <div className="update-member-form-container">
            <h1>Update Member</h1>
            <form onSubmit={handleSubmit} className="update-member-form">
                <div>
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Update Member</button>
                <button type="button" onClick={() => navigate('/members')}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateMemberForm;