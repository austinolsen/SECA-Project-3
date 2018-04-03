import React from 'react'

const User = (props) => {
  return (
    <div id={`user-${props.user.id}`} data-user-display>
      <div id={`user-${props.user.id}-user-name`}>
        Username: <strong>{props.user.userName}</strong>
      </div>

      <div id={`user-${props.user.id}-password`}>
        Password: <i>{props.user.password}</i>
      </div>

      <div id={`user-${props.user.id}-id`}>
        User Id: <i>{props.user.id}</i>
      </div>

      <button
        id={`delete-user-${props.user.id}`}
        onClick={() => {props.deleteUser(props.user.id, props.index)}}>
        Delete
      </button>
    </div>
  )
}

export default User
