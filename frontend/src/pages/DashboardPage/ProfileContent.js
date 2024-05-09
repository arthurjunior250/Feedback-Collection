import React, { useState} from 'react';
import icon from '../../../assets/users.png';

function ProfileContent() {

    const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');
    const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.username : '');
    const [loggedInRole, setLoggedInRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.role : '');


  return (
    <div className="profiles-content">
      <h2>Profiles</h2>
      <div className="profiles-grid">
          <div className="profile-card">
            <div className="profile-image">
              <img src={icon} alt="Profile" />
            </div>
            <div className="profile-info">
              <h3>{loggedInUsername}</h3>
              <p>Email: {loggedInUserEmail}</p>
              <p>Role: {loggedInRole}</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProfileContent;

