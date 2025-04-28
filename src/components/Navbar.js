import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Member List</Link>
        </li>
        <li>
          <Link to="/add">Add Member</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 