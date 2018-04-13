import React, { Component } from 'react'
import axios from 'axios'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/Home'
import UsersList from './components/UsersList'
import NewUserForm from './components/NewUserForm'
import LoginForm from './components/LoginForm'
import ProfileView from './components/ProfileView'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    users: [],
    currentUser: {userName: "Start",
                  password: "Pass"},
    isLoggedIn: false
  }

  async componentWillMount() {
    const usersResponse = await axios.get(`${process.env.REACT_APP_HOST}/users`)
    this.setState({
      users: usersResponse.data,
      usersResponse
    })
  }

  findUserAndLogin = async (userNameToFind) => {
    try {
      const findUserResponse = await axios.get(`${process.env.REACT_APP_HOST}/users/search?userName=${userNameToFind}`)
      this.setState({ currentUser: findUserResponse.data, isLoggedIn: true})
    } catch(error) {
      console.log("Could not log in")
      console.log(error)
    }
  }

  logUserIn = (userInfo) => {
    this.setState({currentUser: {userInfo}, isLoggedIn: true})
  }

  logUserOut = () => {
    this.setState({currentUser: {}, isLoggedIn: false})
  }

  updateUser = async (index) => {
    try {
      const userToUpdate = this.state.users[index]
      await axios.patch(`${process.env.REACT_APP_HOST}/users/${userToUpdate.id}`, userToUpdate)
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
      await axios.delete(`${process.env.REACT_APP_HOST}/users/${userId}`)

      const updatedUsersList = [...this.state.users]
      updatedUsersList.splice(index, 1)

      this.setState({users: updatedUsersList})

    } catch (error) {
      console.log(`Error deleting User with ID: ${userId}`)
    }
  }

  createUser = async (newUser) => {
    try {
      const newUserResponse = await axios.post(`${process.env.REACT_APP_HOST}/users`, newUser)
      const newUserFromDatabase = newUserResponse.data
      this.setState({currentUser: newUserFromDatabase, isLoggedIn: true})
      const updatedUsersList = [...this.state.users]
      updatedUsersList.push(newUserFromDatabase)

      this.setState({users: updatedUsersList})
    } catch (error) {
      console.log("Error creating new User")
      console.log(error)
    }
  }


  render() {
    const HomeComponent = () => (
      <Home />
    )

    const LoginFormComponent = () => (
      <LoginForm
        findUserAndLogin={this.findUserAndLogin}
        logUserIn={this.logUserIn}
        isLoggedIn={this.state.isLoggedIn}
        currentUser={this.state.currentUser} />
    )

    const NewUserFormComponent = () => (
      <NewUserForm
        createUser={this.createUser}
        findUserAndLogin={this.findUserAndLogin}
        isLoggedIn={this.state.isLoggedIn}
        currentUser={this.state.currentUser} />
    )

    const ProfileViewComponent = () => (
      <ProfileView
        logUserOut={this.logUserOut}
        deleteUser={this.deleteUser}
        isLoggedIn={this.state.isLoggedIn}
        currentUser={this.state.currentUser} />
    )

    const UsersListComponent = () => (
      <UsersList
        users={this.state.users}
        deleteUser={this.deleteUser}
        updateUser={this.updateUser}
        handleUpdate={this.handleUpdate} />
    )


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The City Records Online</h1>
        </header>
          <Router>
            <Switch>
              <Route exact path="/" render={HomeComponent}/>
              <Route exact path="/admin" render={UsersListComponent}/>
              <Route exact path="/new" render={NewUserFormComponent}/>
              <Route exact path="/login" render={LoginFormComponent}/>
              <Route exact path="/profile" render={ProfileViewComponent}/>
            </Switch>
          </Router>
      </div>
    )
  }
}

export default App
