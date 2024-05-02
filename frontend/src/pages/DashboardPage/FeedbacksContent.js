import React from 'react'

function FeedbacksContent() {
  // Mock user data
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', name: 'eric', rate: '2', message: 'message here' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', name: 'eric', rate: '2', message: 'message here' },
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
            <th>Name</th>
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
              <td>{user.name}</td>
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
}

export default FeedbacksContent