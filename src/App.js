import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About/About';
import InviteContainer from 'containers/InviteContainer/InviteContainer';
import CreateStoryContainer from 'containers/CreateStoryContainer/CreateStoryContainer';
import StoriesContainer from 'containers/StoriesContainer/StoriesContainer';
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
          <NavLink to="/create-story">Create Story</NavLink>
          <NavLink to="/stories">Stories</NavLink>
        </div>
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/invite' component={InviteContainer} />
          <Route path='/create-story' component={CreateStoryContainer} />
          <Route path='/stories' component={StoriesContainer} />
        </div>
      </div>
    );
  }
}

export default App;
