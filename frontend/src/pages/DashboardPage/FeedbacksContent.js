// import React from 'react'

// function FeedbacksContent() {
//   // Mock user data
//   const users = [
//     { id: 1, username: 'john_doe', email: 'john@example.com', name: 'eric', rate: '2', message: 'message here' },
//     { id: 2, username: 'jane_smith', email: 'jane@example.com', name: 'eric', rate: '2', message: 'message here' },
//     // Add more mock user data as needed
//   ];
//   return (
//     <div className="users-content">
//       <h2>Feedbacks</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Name</th>
//             <th>Rate</th>
//             <th>Message</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.id}>
//               <td>{index + 1}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.name}</td>
//               <td>{user.rate}</td>
//               <td>{user.message}</td>
//               <td>
//                 {/* Action buttons (e.g., Edit, Delete) */}
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FeedbacksContent

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeedbacksContent() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      // Handle error
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting feedback with ID:', id); // Log deletion attempt
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      console.log('Feedback deleted successfully'); // Log successful deletion
      toast.success('Feedback deleted successfully');
      fetchFeedbacks();
      // You may need to update the users state after successful deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Error deleting feedback');
    }
  };

  const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');

   // Get user role from local storage
   const user = JSON.parse(localStorage.getItem('user'));
   const userRole = user ? user.data.role : null;


  return (
    <div className="users-content">
        <ToastContainer />
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
        {userRole === 'standard-user' && (
        <tbody>
            {feedbacks.filter(feedback => feedback.email === loggedInUserEmail).length === 0  && (
              <p>No feedback available.</p>
            )}
          {/* {feedbacks.map((feedback, index) => (
              feedback.email === loggedInUserEmail && ( */}
                    {feedbacks
                  .filter(feedback => feedback.email === loggedInUserEmail)
                  .map((feedback, index) => (

            <tr key={feedback._id}>
              <td>{index + 1}</td>
              <td>{feedback.name || 'Unknown'}</td>
              <td>{feedback.email || 'Unknown'}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.message}</td>
              <td>
                <button onClick={() => handleDelete(feedback._id)}>Delete</button>
              </td>
            </tr>
              // )
          ))}
        </tbody>
        )}
          {userRole === 'admin' && (
        <tbody>
            {feedbacks.length === 0 && (
                <p>No feedback available.</p>
              )}

          {feedbacks.map((feedback, index) => (
              // feedback.email === loggedInUserEmail && (
            <tr key={feedback._id} className={feedback.email === loggedInUserEmail ? 'highlighted-email' : ''}>
              <td>{index + 1}</td>
              <td>{feedback.name || 'Unknown'}</td>
              <td>{feedback.email || 'Unknown'}</td>
              <td>{feedback.rating}</td>
              <td className='dash-message'>{feedback.message}</td>
              <td>
                <button onClick={() => handleDelete(feedback._id)}>Delete</button>
              </td>
            </tr>
              // )
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
}

export default FeedbacksContent;
