import React, { useState } from 'react';
import './Dashboard.css'; // Import custom CSS file for styling
import DashboardContent from './DashboardPage/DashboardContent';
import UsersContent from './DashboardPage/UsersContent';
import FeedbacksContent from './DashboardPage/FeedbacksContent';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ProfileContent from './DashboardPage/ProfileContent';
const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    document.title = 'Dashboard | Feedback';
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login'; // Use window.location.href to force a full page reload
  };

  // Check if token exists in local storage
  const token = localStorage.getItem('token');

  if (!token) {
    // If token doesn't exist, redirect to login page
    return <Redirect to="/login" />;
  }


    // Get user role from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user ? user.data.role : null;



  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className={selectedMenu === 'Dashboard' ? 'active' : ''} onClick={() => handleMenuClick('Dashboard')}>
            Dashboard
          </li>
          <li className={selectedMenu === 'Profile' ? 'active' : ''} onClick={() => handleMenuClick('Profile')}>
            My Profile
          </li>
           {userRole === 'admin' && (
          <li className={selectedMenu === 'Users' ? 'active' : ''} onClick={() => handleMenuClick('Users')}>
            Users
          </li>
            )}
          <li className={selectedMenu === 'Feedbacks' ? 'active' : ''} onClick={() => handleMenuClick('Feedbacks')}>
            Feedbacks
          </li>
          <li className='logout' onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      {userRole === 'admin' && (
      <div className="content">
        {selectedMenu === 'Dashboard' && <DashboardContent />}
        {selectedMenu === 'Profile' && <ProfileContent />}
        {selectedMenu === 'Users' && <UsersContent />}
        {selectedMenu === 'Feedbacks' && <FeedbacksContent />}
      </div>
      )}
      {userRole === 'standard-user' && (
      <div className="content">
         {selectedMenu === 'Dashboard' && <DashboardContent />}
         {selectedMenu === 'Profile' && <ProfileContent />}
        {selectedMenu === 'Feedbacks' && <FeedbacksContent />}
      </div>
      )}
    </div>
  );
};

<DashboardContent />;
<ProfileContent />;
<UsersContent />;
<FeedbacksContent />

export default Dashboard;
