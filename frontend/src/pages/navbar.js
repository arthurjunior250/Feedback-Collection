// import React from 'react';
// import './Navbar.css'; // Import custom CSS file for styling
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         {/* <img src="/logo.png" alt="Logo" /> */}
//         <Link to="/"><button className='logo'>Feedback</button></Link>
//       </div>
//       <div className="navbar-signin">
//       <Link to="/login">
//         <button>Sign In</button>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React from 'react';
// import './Navbar.css'; // Import custom CSS file for styling
// import { Link, useHistory } from 'react-router-dom';

// const Navbar = () => {
//   const history = useHistory();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleFeedbackClick = () => {
//     if (isLoggedIn) {
//       history.push('/feedback');
//     } else {
//       history.push('/');
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <button onClick={handleFeedbackClick} className='logo'>Feedback</button>
//       </div>
//       <div className="navbar-signin">
//         <Link to="/login">
//           <button>Sign In</button>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import './Navbar.css'; // Import custom CSS file for styling
import { Link, useHistory } from 'react-router-dom';
import icon from '../../assets/users.png';
const Navbar = () => {
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.username : ''; // Assuming username is stored in local storage
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleFeedbackClick = () => {
    if (isLoggedIn) {
      history.push('/feedback');
    } else {
      history.push('/');
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login'; // Use window.location.href to force a full page reload
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <button onClick={handleFeedbackClick} className='logo'>Feedback</button>
      </div>
      {isLoggedIn ? (
        <div className="navbar-user" onMouseEnter={() => setShowLogoutPopup(true)} onMouseLeave={() => setShowLogoutPopup(false)}>
          <Link to="/dashboard">
          <button className='button-info'>
          <img src={icon} alt="My Image"  className='icons'/>
          {username}
          </button>
          </Link>
          {showLogoutPopup && (
            <div className="logout-popup" onClick={ handleLogout}>
              <button >Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-signin">
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

