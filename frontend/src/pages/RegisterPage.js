// import React, { useState } from 'react';
// import axios from 'axios';
// import './RegisterPage.css'; // Import custom CSS file for styling
// import { useEffect } from 'react';
// import login from '../../assets/log.jpg'
// function RegisterPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post('/api/auth/register', { email, password });
//       console.log(response.data.message);
//       // Redirect to login page after successful registration
//     } catch (err) {
//       console.error(err);
//       setErrorMessage('Registration failed. Please try again.');
//     }
//   };

//   useEffect(() => {
//     document.title = 'Register | Feedback';
//   }, []);

//   return (
//     <>
//     <div className='login-containers'>
//     <div className='login-image login-container-div'>
//     <img src={login} alt="My Image" />
//     </div>
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//         </div>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <button type="submit" className="register-button">Register</button>
//       </form>
//     </div>
//     </div>
//     </>
//   );
// }

// export default RegisterPage;
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';
import { useEffect } from 'react';
import login from '../../assets/log.jpg';
import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.title = 'Register | Feedback';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {username, email, password });
      toast.success(response.data.message);
      history.push('/login'); 
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data); // Log detailed error response from the server
        toast.error(error.response.status); // Log status code
        toast.error(error.response.headers); // Log response headers
        toast.error(error.response.data.message); // Set error message received from the server
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(error.request); // Log XMLHttpRequest object
        toast.error('Registration request failed. Please try again.'); // Set generic error message
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Error', error.message); // Log error message
        toast.error('Registration failed. Please try again.'); // Set generic error message
      }
    }
  };

  const history = useHistory();
  return (
    <>
      <ToastContainer />
      <div className='login-containers'>
        <div className='login-image login-container-div'>
          <img src={login} alt="My Image" />
        </div>
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <p className="register-link">have an account? <Link to="/login" className="register-links">Login here</Link></p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
