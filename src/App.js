import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About/About';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Curish</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    );
  }
}

export default App;
