import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import './MemberList.css';

function MemberList() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 10;

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/member`);
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
    }, []);

    // Filter and search members
    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.phoneNumber.includes(searchTerm);
        
        if (filter === 'all') return matchesSearch;
        if (filter === 'active') return matchesSearch && member.isActive;
        if (filter === 'inactive') return matchesSearch && !member.isActive;
        return matchesSearch;
    });

    // Pagination
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-message">Error loading members: {error.message}</div>;
    }

    return (
        <div className="member-list-container">
            <h1>Member List</h1>

            <div className="member-filters">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    className="filter-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Members</option>
                    <option value="active">Active Members</option>
                    <option value="inactive">Inactive Members</option>
                </select>
            </div>

            {currentMembers.length > 0 ? (
                <>
                    <table className="member-table">
                        <thead>
                            <tr>
                                <th className="stt-column">STT</th>
                                <th className="name-column">Name</th>
                                <th className="email-column">Email</th>
                                <th className="phone-column">Phone Number</th>
                                <th className="actions-column">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.map((member, index) => (
                                <tr key={member.id}>
                                    <td className="stt-column">{indexOfFirstMember + index + 1}</td>
                                    <td className="name-column">{member.name}</td>
                                    <td className="email-column">{member.email}</td>
                                    <td className="phone-column">{member.phoneNumber}</td>
                                    <td className="actions-column">
                                        <Link 
                                            to={`/members/update/${member.id}`} 
                                            className="update-link"
                                        >
                                            <i className="fas fa-edit"></i>
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={currentPage === number ? 'active' : ''}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="no-members">
                    <i className="fas fa-users-slash"></i>
                    <p>No members found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

export default MemberList;