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
        <h2>Create New User</h2>
        <button>
          <h4><Link to="/login" id="login-link">Login</Link></h4>
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
            <label htmlFor="password">First Name </label>
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

export default NewUserForm
