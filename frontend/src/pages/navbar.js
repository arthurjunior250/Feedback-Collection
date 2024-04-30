import React from 'react';
import './Navbar.css'; // Import custom CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src="/logo.png" alt="Logo" /> */}
        <Link to="/"><strong className='logo'>Feedback</strong></Link>
      </div>
      <div className="navbar-signin">
      <Link to="/login">
        <button>Sign In</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
