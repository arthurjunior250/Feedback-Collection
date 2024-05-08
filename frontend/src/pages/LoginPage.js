import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import axios from 'axios';
import './LoginPage.css';
import login from '../../assets/log.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data.token);
        // Redirect to dashboard
        window.location.href = "/feedback"; // Redirect to dashboard page
      } else {
        toast.error(data.message); // Show error message using toast
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Render the toast container */}
      <div className='login-containers'>
        <div className='login-image login-container-div'>
          <img src={login} alt="My Image" />
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="register-link">Don't have an account? <Link to="/register" className="register-links">Register here</Link></p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
