// import React from 'react'

// function DashboardContent() {
//  // Mock data for the number of users and feedbacks
//  const numUsers = 100;
//  const numFeedbacks = 50;
//  return (
//    <>
//    <h2>Dashboard</h2>
//    <div className="dashboard-content">
//      <div className="card">
//        <h3>Users</h3>
//        <p>{numUsers}</p>
//      </div>
//      <div className="card">
//        <h3>Feedbacks</h3>
//        <p>{numFeedbacks}</p>
//      </div>
//      {/* Add more cards for other statistics */}
//    </div>
//    </>
//  );
// }

// export default DashboardContent

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardContent() {
  // State to store the number of feedbacks
  const [numFeedbacks, setNumFeedbacks] = useState(0);
  const [numUsers, setNumUsers] = useState(0);

  // Fetch the number of feedbacks from the backend when the component mounts
  useEffect(() => {
    fetchNumFeedbacks();
    fetchNumUsers();
  }, []);

  const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');
  // Function to fetch the number of feedbacks from the backend
  const fetchNumFeedbacks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userRole = user ? user.data.role : null;
  
      let numFeedbacks = 0;
      if (userRole === 'admin') {
        const response = await axios.get('http://localhost:5000/api/feedback');
        numFeedbacks = response.data.length;
      } else {
        const response = await axios.get('http://localhost:5000/api/feedback');
        const filteredFeedbacks = response.data.filter(feedback => feedback.email === loggedInUserEmail);
        numFeedbacks = filteredFeedbacks.length;
      }
  
      setNumFeedbacks(numFeedbacks);
    } catch (error) {
      console.error('Error fetching number of feedbacks:', error);
    }
  };
  
  
  // const fetchNumFeedbacks = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/feedback');
  //     setNumFeedbacks(response.data.length);
  //   } catch (error) {
  //     console.error('Error fetching number of feedbacks:', error);
  //   }
  // };

  const fetchNumUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth');
      setNumUsers(response.data.data.length);
    } catch (error) {
      console.error('Error fetching number of users:', error);
    }
  };

    // Get user role from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user ? user.data.role : null;


  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard-content">
      {userRole === 'admin' && (
        <div className="card">
          <h3>Users</h3>
          <h4>{numUsers}</h4>
        </div>
      )}
        <div className="card">
          <h3>Feedbacks</h3>
          <h4>{numFeedbacks}</h4>
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
