import React, { Component } from 'react'
import User from './User'
import {Link} from "react-router-dom";

const UsersList = (props) => {
  return (
    <div id="users-wrapper">
      <h2>User Admin Page</h2>
      <button>
        <h4><Link to="/new" id="new-user-link">Create New User</Link></h4>
      </button>
      <button>
        <h4><Link to="/" id="home-link">Home</Link></h4>
      </button>
      <hr/>
      {
        props.users.map((user, index) => {
          return (
            <User
              handleUpdate={props.handleUpdate}
              updateUser={props.updateUser}
              deleteUser={props.deleteUser}
              user={user}
              key={index}
              index={index} />
          )
        })
      }
    </div>
  )
}

export default UsersList
