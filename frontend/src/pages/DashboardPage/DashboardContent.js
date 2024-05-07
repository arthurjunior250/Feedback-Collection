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

  // Fetch the number of feedbacks from the backend when the component mounts
  useEffect(() => {
    fetchNumFeedbacks();
  }, []);

  // Function to fetch the number of feedbacks from the backend
  const fetchNumFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setNumFeedbacks(response.data.length);
    } catch (error) {
      console.error('Error fetching number of feedbacks:', error);
      // Handle error if necessary
    }
  };

  // Mock data for the number of users
  const numUsers = 100;

  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <div className="card">
          <h3>Users</h3>
          <p>{numUsers}</p>
        </div>
        <div className="card">
          <h3>Feedbacks</h3>
          <p>{numFeedbacks}</p>
        </div>
        {/* Add more cards for other statistics */}
      </div>
    </>
  );
}

export default DashboardContent;
