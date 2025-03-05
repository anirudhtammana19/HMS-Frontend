import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>Amaze Care</h3>
          <p>Your trusted healthcare partner.</p>
        </div>

        <div className="footer-links" style={{ marginTop: '20px' }}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-hours" style={{ marginTop: '20px' }}>
          <h4>Hours</h4>
          <ul>
            <li>Monday: 9:00 - 18:00</li>
            <li>Tuesday: 9:00 - 18:00</li>
            <li>Wednesday: 9:00 - 18:00</li>
            <li>Thursday: 9:00 - 18:00</li>
            <li>Friday: 9:00 - 18:00</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li>📞 000-000-000</li>
            <li>✉️ info@email.com</li>
            <li>📍 Kalutara South</li>
          </ul>
          <div className="social-icons">
            <a href="#Facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#Twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#Instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#LinkedIn" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Amaze Care. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
