import React from 'react';
import './Footer.css'; // Import custom CSS file for styling

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer className="footer">
      <span>&copy; {currentYear} Feedback. All rights reserved. Developed by <a href="https://arthurjunior.netlify.app/" className="text-white" target='_blank' rel="noopener noreferrer">Arthur Junior</a>.</span>
    </footer>
  );
};

export default Footer;
