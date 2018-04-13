import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";


class NewUserForm extends Component {

  state = {
    user: {}
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createUser(this.state.user)
    this.setState({user: {}})
  }

  handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const updatedUser = { ...this.state.user }
    updatedUser[attributeToChange] = newValue
    this.setState({ user: updatedUser })
  }

  render() {

    if(this.props.isLoggedIn) {
      return <Redirect to="/profile" />
    }

    return (


      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link to="/" id="home-link" className="navbar-brand">The City Record</Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/login" id="login-link" className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
        <div className="container text-center">
        <form className="form-signin" onSubmit={this.handleSubmit} id="new-user-form">
          <h1 className="h3 mb-3 font-weight-normal">Get Started</h1>
          <div>
            <label className="sr-only" htmlFor="userName">Username </label>
            <input
              className="form-control"
              placeholder="Username"
              id="new-user-user-name"
              type="text"
              name="userName"
              onChange={this.handleChange} />

            <label htmlFor="password"> </label>
            <input
              className="form-control"
              placeholder="First Name"
              id="new-user-password"
              type="text"
              name="password"
              onChange={this.handleChange} />
            </div>
              <div className="space">
            <input
              className="btn btn-lg btn-primary btn-block"
              id="new-user-submit"
              type="submit"
              value="Create" />
          </div>
        </form>
      </div>
      </div>
      )
    }
}

export default NewUserForm
