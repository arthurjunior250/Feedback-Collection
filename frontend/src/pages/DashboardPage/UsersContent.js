import React from 'react'

function UsersContent() {
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
}

export default UsersContent