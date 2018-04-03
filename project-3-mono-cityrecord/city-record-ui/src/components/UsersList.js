import React, { Component } from 'react'
import User from './User'
import {Link} from "react-router-dom";

const UsersList = (props) => {
  return (
    <div id="users-wrapper">
      <h1>User Admin Page</h1>
      <button>
        <Link to="/new" id="new-user-link">Create New User</Link>
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
