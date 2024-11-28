import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbarStyle.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Div separato per il navbar-brand */}
        <div className="navbar-brand-container">
          <Link className="navbar-brand" to="/">
            Awesome Pizza
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                Order Pizza
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/queue">
                Chef's Queue
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
