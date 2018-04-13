import React from 'react'
import {Link} from "react-router-dom";
import '../App.css';


const Home = (props) => {
  return (
    <div className="homepage">
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/" id="home-link" className="navbar-brand">The City Record</Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/new" id="new-user-link" className="nav-link">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" id="login-link" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
  </div>
  )
}

export default Home
