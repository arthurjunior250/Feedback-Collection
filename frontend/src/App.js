import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/home';
import './App.css'; // Import custom CSS file for styling
import FeedbackForm from './pages/FeedbackForm';
import Navbar from './pages/navbar';
import Footer from './pages/footer';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
        <Navbar />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/feedback" component={FeedbackForm} />
        </Switch>
      </div>
      <Route path="/dashboard" component={Dashboard}></Route>    
      <Footer />
    </Router>
  );
}

export default App;
