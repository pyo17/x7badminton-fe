import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        newMembersThisMonth: 0,
        averageAge: 0
    });

    const [monthlyStats, setMonthlyStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Fetch dashboard statistics
        const fetchStats = async () => {
            try {
                const [statsResponse, monthlyResponse, activitiesResponse] = await Promise.all([
                    fetch(`${process.env.REACT_APP_API_URL}/member/stats`),
                    fetch(`${process.env.REACT_APP_API_URL}/member/monthly-stats`),
                    fetch(`${process.env.REACT_APP_API_URL}/member/recent-activities`)
                ]);

                if (!statsResponse.ok || !monthlyResponse.ok || !activitiesResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [statsData, monthlyData, activitiesData] = await Promise.all([
                    statsResponse.json(),
                    monthlyResponse.json(),
                    activitiesResponse.json()
                ]);

                setStats(statsData);
                setMonthlyStats(monthlyData);
                setRecentActivities(activitiesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="dashboard-actions">
                    <Link to="/add" className="add-member-btn">
                        <i className="fas fa-plus"></i>
                        Add New Member
                    </Link>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Total Members</h3>
                        <p className="stat-value">{stats.totalMembers}</p>
                        <p className="stat-change positive">
                            <i className="fas fa-arrow-up"></i>
                            +12% from last month
                        </p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Active Members</h3>
                        <p className="stat-value">{stats.activeMembers}</p>
                        <p className="stat-change positive">
                            <i className="fas fa-arrow-up"></i>
                            +8% from last month
                        </p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="stat-info">
                        <h3>New This Month</h3>
                        <p className="stat-value">{stats.newMembersThisMonth}</p>
                        <p className="stat-change positive">
                            <i className="fas fa-arrow-up"></i>
                            +5 new members
                        </p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Average Age</h3>
                        <p className="stat-value">{stats.averageAge}</p>
                        <p className="stat-change neutral">
                            <i className="fas fa-minus"></i>
                            Stable
                        </p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="main-content">
                    <div className="chart-container">
                        <h2>Monthly Member Growth</h2>
                        <div className="chart">
                            {monthlyStats.map((stat, index) => (
                                <div key={index} className="chart-bar">
                                    <div 
                                        className="bar-fill" 
                                        style={{ height: `${(stat.count / Math.max(...monthlyStats.map(s => s.count))) * 100}%` }}
                                    ></div>
                                    <span className="bar-label">{stat.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="recent-activity">
                        <h2>Recent Activity</h2>
                        <div className="activity-list">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon">
                                        <i className={`fas fa-${activity.icon}`}></i>
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-text">{activity.description}</p>
                                        <span className="activity-time">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <Link to="/members" className="action-btn">
                                <i className="fas fa-list"></i>
                                View All Members
                            </Link>
                            <Link to="/reports" className="action-btn">
                                <i className="fas fa-chart-bar"></i>
                                View Reports
                            </Link>
                            <Link to="/settings" className="action-btn">
                                <i className="fas fa-cog"></i>
                                Settings
                            </Link>
                        </div>
                    </div>

                    <div className="member-stats">
                        <h2>Member Statistics</h2>
                        <div className="stats-table">
                            <div className="stats-row">
                                <span>Total Members</span>
                                <span>{stats.totalMembers}</span>
                            </div>
                            <div className="stats-row">
                                <span>Active Members</span>
                                <span>{stats.activeMembers}</span>
                            </div>
                            <div className="stats-row">
                                <span>New Members (30 days)</span>
                                <span>{stats.newMembersThisMonth}</span>
                            </div>
                            <div className="stats-row">
                                <span>Average Age</span>
                                <span>{stats.averageAge}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 