import React from 'react';
import '../styles/footerStyle.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaYoutube />
          </span>
        </div>
        <div className="footer-text-container">
          <span>&copy; {currentYear}</span>
          <span>Awesome Pizza. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
