// import React, { useState} from 'react';
// import icon from '../../../assets/users.png';

// function ProfileContent() {

//     const [loggedInUserEmail, setLoggedInUserEmail] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.email : '');
//     const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.username : '');
//     const [loggedInRole, setLoggedInRole] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.role : '');


//   return (
//     <div className="profiles-content">
//       <h2>Profiles</h2>
//       <div className="profiles-grid">
//           <div className="profile-card">
//             <div className="profile-image">
//               <img src={icon} alt="Profile" />
//             </div>
//             <div className="profile-info">
//               <h3>{loggedInUsername}</h3>
//               <p>Email: {loggedInUserEmail}</p>
//               <p>Role: {loggedInRole}</p>
//             </div>
//           </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileContent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import icon from '../../../assets/users.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileContent() {
    const [user, setUser] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newRole, setNewRole] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data._id : '');

    useEffect(() => {
        // Fetch user information from the backend API when the component mounts
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/${loggedInUserId}`);
                setUser(response.data.data); // Assuming user data is stored under the 'data' property
                setNewUsername(response.data.data.username);
                setNewEmail(response.data.data.email);
                setNewRole(response.data.data.role);
            } catch (error) {
              toast.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

  

    const handleUpdateProfile = async () => {
        try {
            await axios.put(`http://localhost:5000/auth/${loggedInUserId}`, {
                username: newUsername,
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile. Please try again later.');
        }
        window.location.reload();
    };

console.log(user);
    if (!user) {
        return <div>Loading...</div>; // Display loading indicator while fetching user data
    }

    return (
        <div className="profiles-content">
            <ToastContainer />
            <h2>Profiles</h2>
            <div className="profiles-grid">
                <div className="profile-card">
                    <div className="profile-image">
                        <img src={icon} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <p>Username:<input className='use-input' type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} /></p>
                        <p>Email: {newEmail}</p>
                        <p>Role: {newRole}</p>
                       
                        <button onClick={handleUpdateProfile}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileContent;
