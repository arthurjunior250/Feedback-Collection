import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../App.css'; // Import custom CSS file for styling
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function App() {
    useEffect(() => {
    document.title = 'Homepage | Feedback';
  }, []);


  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLoginClick = () => {
    if (isLoggedIn) {
      history.push('/feedback');
    } else {
      history.push('/login');
    }
  };



  return (
    <div className="app-container">
      <div className="welcome-message">
        <h1>Welcome to Feedback Collection System</h1>
        <p>We value your feedback. Please login to submit your feedback.</p>
        {/* <Link to="/login"> */}
          <button className="login-button" onClick={handleLoginClick}>Login</button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default App;
