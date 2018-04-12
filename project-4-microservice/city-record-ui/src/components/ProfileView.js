import React from 'react'
import {Link} from "react-router-dom";

const ProfileView = (props) => {
  return (
    <div id="home">
      <h2>Profile Page</h2>
      <button>
        <h4><Link to="/" id="home-link">Logout</Link></h4>
      </button>
      <button>
        <h4><Link to="/admin" id="admin-link">User admin</Link></h4>
      </button>
      <hr/>
    </div>
  )
}

export default ProfileView
