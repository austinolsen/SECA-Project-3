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
        <h2>Login Page</h2>
        <button>
          <h4><Link to="/new" id="new-user-link">Sign Up</Link></h4>
        </button>
        <button>
          <h4><Link to="/" id="home-link">Home</Link></h4>
        </button>
        <hr/>
        <form onSubmit={this.handleSubmit} id="login-form">
          <div>
            <label htmlFor="userName">Username </label>
            <input
              id="userName-input"
              type="text"
              name="userName"
              onChange={this.handleChange} />
            </div>
            {/* <div>
              <label htmlFor="password">Password </label>
              <input
                id="new-user-password"
                type="text"
                name="password"
                onChange={this.handleChange} />
              </div> */}
              <div>
                <input
                  id="login-submit"
                  type="submit"
                  value="Login" />
                </div>
              </form>
            </div>
          )
        }
      }

      export default LoginForm
