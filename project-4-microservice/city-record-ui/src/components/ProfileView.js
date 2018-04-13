import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"
import axios from 'axios'
import HearingsList from './HearingsList'


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
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link to="/" id="home-link" className="navbar-brand" onClick={this.handleLogout}>The City Record</Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" id="logout-link" className="nav-link" onClick={this.handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="results">
          <h1 className="h3 mb-3 font-weight-normal">{this.props.currentUser.password}'s Profile Page</h1>
      <button onClick={this.props.findPublicHearings}>Find Upcoming Public Hearings</button>
        <HearingsList
          hearings={this.props.hearingsResponse} />
      </div>
    </div>
  )
}
}

export default ProfileView
