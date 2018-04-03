import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {isVisible: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }))
  }

  render() {
    return (
      <div id={`user-${this.props.user.id}`} data-user-display>
        <div id={`user-${this.props.user.id}-id`}>
          User Id:
          <i>{this.props.user.id}</i>
        </div>

        <div id={`user-${this.props.user.id}-user-name`}>
          Username:
          <strong>{this.props.user.userName}</strong>
        </div>

        <div id={`user-${this.props.user.id}-password`}>
          Password:
          {
            this.state.isVisible ?
            <input
              name="password"
              value={this.props.user.password}
              onChange={(event) => this.props.handleUpdate(event, this.props.index)}/>
              :
              ''
            }

            <button
              onClick={this.handleClick}>
              Update
            </button>

          </div>

          <button
            id={`delete-user-${this.props.user.id}`}
            onClick={() => {this.props.deleteUser(this.props.user.id, this.props.index)}}>
            Delete
          </button>

        </div>
      )
    }
  }


export default User
