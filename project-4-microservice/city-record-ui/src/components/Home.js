import React from 'react'
import {Link} from "react-router-dom";

const Home = (props) => {
  return (
    <div id="home">
      <h2>Home Page</h2>
      <button>
        <h4><Link to="/new" id="new-user-link">Sign Up</Link></h4>
      </button>
      <button>
        <h4><Link to="/login" id="login-link">Login</Link></h4>
      </button>
      <hr/>
    </div>
  )
}

export default Home
