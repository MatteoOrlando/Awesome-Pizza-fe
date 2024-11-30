import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import '../styles/navbarStyle.css';

function Navbar({ orderCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand-container">
          <Link className="navbar-brand" to="/">
            <AiFillHome className="home-icon" />
            Awesome Pizza
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                Your Order
                {orderCount > 0 && (
                  <span className="order-badge">{orderCount}</span>
                )}
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
