import React, { useState } from 'react';

function CreateMemberForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const memberData = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
        };

        try {
            console.log(`${process.env.REACT_APP_API_URL}`)
            console.log("here you are")
            const response = await fetch(`${process.env.REACT_APP_API_URL}/member/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData),
            });

            if (response.ok) {
                console.log('Member created successfully!');
                // Có thể reset form hoặc hiển thị thông báo thành công
                setName('');
                setEmail('');
                setPhoneNumber('');
            } else {
                console.error('Failed to create member:', response.status);
                // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('There was an error creating the member:', error);
            // Hiển thị thông báo lỗi
        }
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '3px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Member</button>
        </form>
    );
}

export default CreateMemberForm;