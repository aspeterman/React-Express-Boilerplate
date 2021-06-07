import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Home from './core/Home'
import MenuBar from './core/Menu'
import NotFound from './core/NotFound'
import Cart from './user/Cart'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Signup from './user/Signup'

const MainRouter = () => {
  return (<>
    <MenuBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/cart/:userId" component={Cart} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute path="/user/:userId" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  </>
  )
}

export default MainRouter
