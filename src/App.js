import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateMemberForm from './components/CreateMemberForm';
import MemberList from './components/MemberList';
import UpdateMemberForm from './components/UpdateMemberForm'; // Import component
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Create Member</Link>
                        </li>
                        <li>
                            <Link to="/members">Member List</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<CreateMemberForm />} />
                    <Route path="/members" element={<MemberList />} />
                    <Route path="/members/update/:id" element={<UpdateMemberForm />} /> {/* Route mới */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;