import React, { Component } from 'react'
import User from './User'
import {Link} from "react-router-dom";

const Login = (props) => {
  return (
    <div id="home">
      <h2>Login Page</h2>
      <button>
        <h4><Link to="/new" id="new-user-link">Sign Up</Link></h4>
      </button>
      <button>
        <h4><Link to="/admin" id="admin-link">User admin</Link></h4>
      </button>
      <button>
        <h4><Link to="/" id="home-link">Home</Link></h4>
      </button>
      <hr/>
    </div>
  )
}

export default Login
