import React, { useState } from 'react';
import './Dashboard.css'; // Import custom CSS file for styling
import DashboardContent from './DashboardPage/DashboardContent';
import UsersContent from './DashboardPage/UsersContent';
import FeedbacksContent from './DashboardPage/FeedbacksContent';
import { useEffect } from 'react';
const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    document.title = 'Dashboard | Feedback';
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className={selectedMenu === 'Dashboard' ? 'active' : ''} onClick={() => handleMenuClick('Dashboard')}>
            Dashboard
          </li>
          <li className={selectedMenu === 'Users' ? 'active' : ''} onClick={() => handleMenuClick('Users')}>
            Users
          </li>
          <li className={selectedMenu === 'Feedbacks' ? 'active' : ''} onClick={() => handleMenuClick('Feedbacks')}>
            Feedbacks
          </li>
          <li className={selectedMenu === 'Logout' ? 'active' : ''}>
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedMenu === 'Dashboard' && <DashboardContent />}
        {selectedMenu === 'Users' && <UsersContent />}
        {selectedMenu === 'Feedbacks' && <FeedbacksContent />}
      </div>
    </div>
  );
};
<DashboardContent />;
<UsersContent />;
<FeedbacksContent />

export default Dashboard;
