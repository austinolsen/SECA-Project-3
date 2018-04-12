import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";


class LoginForm extends Component {

  state = {
    currentUser: {},
    redirectToProfilePage: false
  }

  checkForUser = (userName, passWord) => {

  }

  render() {
    if(this.state.redirectToProfilePage) {
      return <Redirect to="/profile" />
    }

    return (
      <div id="login">
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
        <form onSubmit={this.handleSubmit} id="new-user-form">
          <div>
            <label htmlFor="userName">Username </label>
            <input
              id="new-user-user-name"
              type="text"
              name="userName"
              onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <input
                id="new-user-password"
                type="text"
                name="password"
                onChange={this.handleChange} />
              </div>
              <div>
                <input
                  id="new-user-submit"
                  type="submit"
                  value="Create" />
                </div>
              </form>
            </div>
          )
        }
      }

      export default LoginForm
