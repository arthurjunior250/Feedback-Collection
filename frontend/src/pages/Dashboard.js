import React, { useState } from 'react';
import './Dashboard.css'; // Import custom CSS file for styling

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

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
          <li className={selectedMenu === 'Logout' ? 'active' : ''} onClick={() => handleMenuClick('Logout')}>
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedMenu === 'Dashboard' && <DashboardContent />}
        {selectedMenu === 'Users' && <UsersContent />}
        {selectedMenu === 'Feedbacks' && <FeedbacksContent />}
        {selectedMenu === 'Logout' && <LogoutContent />}
      </div>
    </div>
  );
};

const DashboardContent = () => {
      // Mock data for the number of users and feedbacks
  const numUsers = 100;
  const numFeedbacks = 50;
  return (
    <>
    <h2>Dashboard</h2>
    <div className="dashboard-content">
      <div className="card">
        <h3>Users</h3>
        <p>Total Users: {numUsers}</p>
      </div>
      <div className="card">
        <h3>Feedbacks</h3>
        <p>Total Feedbacks: {numFeedbacks}</p>
      </div>
      {/* Add more cards for other statistics */}
    </div>
    </>
  );
};

const UsersContent = () => {
     // Mock user data
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User' },
    // Add more mock user data as needed
  ];
  return (
    <div className="users-content">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Action buttons (e.g., Edit, Delete) */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FeedbacksContent = () => {
     // Mock user data
     const users = [
        { id: 1, username: 'john_doe', email: 'john@example.com', rate: '2', message: 'message here' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', rate: '2', message: 'message here' },
        // Add more mock user data as needed
      ];
      return (
        <div className="users-content">
          <h2>Feedbacks</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Rate</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.rate}</td>
                  <td>{user.message}</td>
                  <td>
                    {/* Action buttons (e.g., Edit, Delete) */}
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

const LogoutContent = () => {
  return <div>Logout Content</div>;
};

export default Dashboard;
