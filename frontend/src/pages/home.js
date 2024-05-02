import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../App.css'; // Import custom CSS file for styling
import { useEffect } from 'react';

function App() {
    useEffect(() => {
    document.title = 'Homepage | Feedback';
  }, []);
  return (
    <div className="app-container">
      <div className="welcome-message">
        <h1>Welcome to Feedback Collection System</h1>
        <p>We value your feedback. Please login to submit your feedback.</p>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
