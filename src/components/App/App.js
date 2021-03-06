import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Clothes from '../Clothes/Clothes'
import CreateClothing from '../CreateClothing/CreateClothing'
import Home from '../Home/Home'
import UpdateClothing from '../UpdateClothing/UpdateClothing'
import WornClothes from '../Clothes/WornClothes'
import AllClothes from '../Clothes/AllClothes'
import SellClothes from '../Clothes/SellClothes'
import ExpiredClothes from '../Clothes/ExpiredClothes'
import DonateClothes from '../Clothes/DonateClothes'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' component={Home} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes' render={() => (
            <Clothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes-all' render={() => (
            <AllClothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes-worn' render={() => (
            <WornClothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes-sell' render={() => (
            <SellClothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes-donate' render={() => (
            <DonateClothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/clothes-expired' render={() => (
            <ExpiredClothes msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/new-clothing' render={() => (
            <CreateClothing msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-clothing/:id' render={() => (
            <UpdateClothing msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
