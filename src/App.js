import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About/About';
import InviteContainer from 'containers/InviteContainer/InviteContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Curish</h2>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/invite">Invite</NavLink>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/invite' component={InviteContainer} />
      </div>
    );
  }
}

export default App;
