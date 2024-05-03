import React from 'react'

function DashboardContent() {
 // Mock data for the number of users and feedbacks
 const numUsers = 100;
 const numFeedbacks = 50;
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

export default DashboardContent