import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";

class ProfileView extends Component {
  state = {
    currentUser: {},
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.logUserOut()
  }

  render(){
    if(!this.props.isLoggedIn){
      return <Redirect to="/" />
    }
    if (!this.props.currentUser.username === "admin") {
      console.log("sucsess")
      return <button><h4><Link to="/admin" id="admin-link">User admin</Link></h4></button>
    }
  return (
    <div id="home">

      <h2>{this.props.currentUser.password}'s Profile Page</h2>
      <button>
        <h4><Link to="/" id="home-link" onClick={this.handleLogout}>Logout</Link></h4>
      </button>
      <hr/>
    </div>
  )
}
}

export default ProfileView
