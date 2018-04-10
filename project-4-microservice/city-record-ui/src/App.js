import React, { Component } from 'react'
import axios from 'axios'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import UsersList from './components/UsersList'
import NewUserForm from './components/NewUserForm'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  async componentWillMount() {
    const usersResponse = await axios.get('/users')
//    const usersResponse = await axios.get(`${process.env.REACT_APP_HOST}/users`)
    this.setState({
      users: usersResponse.data,
      usersResponse
    })
  }

  updateUser = async (index) => {
    try {
      const userToUpdate = this.state.users[index]
      await axios.patch(`/users/${userToUpdate.id}`, userToUpdate)
//      await axios.patch(`${process.env.REACT_APP_HOST}/users/${userToUpdate.id}`, userToUpdate)
    } catch(error) {
      console.log(`User did not update. UserIndex:${index}`)
      console.log(error)
    }

  }

  handleUpdate = (event, index) => {
    const valueToChange = event.target.name
    const newValue = event.target.value

    const updatedUsersList = [...this.state.users]
    const userToUpdate = updatedUsersList[index]
    userToUpdate[valueToChange] = newValue

    this.setState({users: updatedUsersList})
  }

  deleteUser = async (userId, index) => {
    try {
      await axios.delete(`/users/${userId}`)
//      await axios.delete(`${process.env.REACT_APP_HOST}/users/${userId}`)

      const updatedUsersList = [...this.state.users]
      updatedUsersList.splice(index, 1)

      this.setState({users: updatedUsersList})

    } catch (error) {
      console.log(`Error deleting User with ID: ${userId}`)
    }
  }

  createUser = async (newUser) => {
    try {
      const newUserResponse = await axios.post('/users', newUser)
//      const newUserResponse = await axios.post(`${process.env.REACT_APP_HOST}/users`, newUser)
      console.log(newUserResponse)
      const newUserFromDatabase = newUserResponse.data

      const updatedUsersList = [...this.state.users]
      updatedUsersList.push(newUserFromDatabase)

      this.setState({users: updatedUsersList})

    } catch (error) {
      console.log("Error creating new User")
    }
  }

  render() {
    const UsersListComponent = () => (
      <UsersList
        users={this.state.users}
        deleteUser={this.deleteUser}
        updateUser={this.updateUser}
        handleUpdate={this.handleUpdate}/>
      )
      const NewUserFormComponent = () => (
        <NewUserForm createUser={this.createUser}/>
      )
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">NY  Records Users</h1>
          </header>
          <p className="App-intro">
            <Router>
              <Switch>
                <Route exact path="/" render={UsersListComponent}/>
                <Route exact path="/new" render={NewUserFormComponent}/>
              </Switch>
            </Router>
          </p>
        </div>
      )
    }
  }

  export default App
