import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import UpdateMemberForm from './components/UpdateMemberForm';
import Background from './components/Background';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Background />
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MemberList />} />
                        <Route path="/add" element={<AddMember />} />
                        <Route path="/members/update/:id" element={<UpdateMemberForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;