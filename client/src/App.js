import React, { Component } from 'react';
import {  Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

import LoginPage from './pages/Login/login';
import SignupPage from './pages/Signup/signup';
import EventPage from './pages/Events/event';
import BookingPage from './pages/Booking';
import MainNavigation from './components/Navigation/MainNavigation';

import history from './history';
import authContext from './context/auth-context';

class App extends Component {
  state = {
    userId: null,
    token: null
  }

  login = (userId, token, tokenExpiration) => {
    this.setState({
      userId: userId,
      token: token
    })
  }

  logout = () => {
    this.setState({
      userId: null,
      token: null
    })
  }

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <authContext.Provider value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}>
          {/* <MainNavigation /> */}
          <main className="main-container">
            <Switch>
              <Route path='/events' component = {EventPage} />

              {!this.state.token && <Redirect from ='/' to='/login' exact />}
              {!this.state.token && <Redirect from ='/bookings' to='/login' exact />}
              {!this.state.token && <Route path='/signup' component = {SignupPage} />}
              {!this.state.token && <Route path='/login' component = {LoginPage}/>}

              {this.state.token && <Redirect from ='/' to='/events' exact />}
              {this.state.token && <Redirect from ='/login' to='/events' exact />}
              {this.state.token && <Redirect from ='/signup' to='/events' exact />}
              {this.state.token && <Route path='/bookings' component = {BookingPage} />}
              
              {/* !this.state.token && <Redirect from ='/' to='/login' exact /> */} 
              {/* this.state.token && <Redirect from ='/' to='/events' exact /> */}
              {/* this.state.token && <Redirect from ='/login' to='/events' exact /> */}
              {/* this.state.token && <Redirect from ='/signup' to='/events' exact /> */}
              {/* !this.state.token && <Route path='/signup' component = {SignupPage} /> */}
              {/* !this.state.token && <Route path='/login' component = {LoginPage}/> */}
              {/* this.state.token && <Route path='/bookings' component = {BookingPage} /> */}
            </Switch>
          </main>
          </authContext.Provider>
        </React.Fragment>
        
      </Router>
    );
  }
}

export default App;
