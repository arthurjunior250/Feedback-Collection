// import React from 'react'

// function UsersContent() {
//     const users = [
//         { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin' },
//         { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User' },
//         // Add more mock user data as needed
//       ];
//       return (
//         <div className="users-content">
//           <h2>Users</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id}>
//                   <td>{index + 1}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     {/* Action buttons (e.g., Edit, Delete) */}
//                     <button>Edit</button>
//                     <button>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
// }

// export default UsersContent

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersContent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/');
        setUsers(response.data.data); // Set the fetched users to the state
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users'); // Set error state if there's an error
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/auth/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from the state
      console.log('User deleted successfully');
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user:', error);
      
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/auth/${id}`, { role: newRole });
      const updatedUsers = users.map(user =>
        user._id === id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers); // Update the role of the user in the state
      console.log('User role updated successfully');
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error updating user role:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');

  return (
    <div className="users-content">
      <ToastContainer />
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
            <tr key={user._id} className={user.email === loggedInUserEmail ? 'highlighted-email' : ''}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td key={user._id} className={user.email === loggedInUserEmail ? 'highlighted-button' : ''}>
                <button onClick={() => handleUpdateRole(user._id, user.role === 'admin' ? 'standard-user' : 'admin')}>Toggle Role</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersContent;
