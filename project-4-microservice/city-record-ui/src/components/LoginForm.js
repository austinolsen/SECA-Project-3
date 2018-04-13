import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";


class LoginForm extends Component {

  state = {
    userInfo: {}
  }

  handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const updatedUserInfo = {...this.state.userInfo}
    updatedUserInfo[attributeToChange] = newValue
    this.setState({userInfo: updatedUserInfo})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.findUserAndLogin(this.state.userInfo.userName)
    this.setState({userInfo: {}})
  }

  render() {
    if(this.props.isLoggedIn) {
      return <Redirect to="/profile" />
    }

    return (
      <div id="login">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link to="/" id="home-link" className="navbar-brand">The City Record</Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/new" id="new-user-link" className="nav-link">Sign Up</Link>
                </li>
              </ul>
            </div>
          </nav>

        <div className="container text-center">
          <form className="form-signin" onSubmit={this.handleSubmit} id="login-form">
        <h1 className="h3 mb-3 font-weight-normal">Get Started</h1>
          <div>
            <label className="sr-only" htmlFor="userName">Username </label>
            <input
              className="form-control"
              placeholder="Username"
              id="userName-input"
              type="text"
              name="userName"
              onChange={this.handleChange} />
            </div>
              <div className="space">
                <input
                  className="btn btn-lg btn-primary btn-block"
                  id="login-submit"
                  type="submit"
                  value="Login" />
                </div>
              </form>
            </div>
          </div>
          )
        }
      }

      export default LoginForm
