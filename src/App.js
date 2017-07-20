import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAuthListener } from 'actions/authListener';
import Home from 'routes/Home';
import About from 'routes/About/About';
import CreateStoryContainer from 'containers/CreateStoryContainer';
import StoriesContainer from 'containers/StoriesContainer';
import UserAuthContainer from 'containers/UserAuthContainer';
import ProfileContainer from 'containers/ProfileContainer';
import CreateProfileContainer from 'containers/CreateProfileContainer';
import AppHeader from 'components/AppHeader/AppHeader';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.addAuthListener();
  }

  render() {
    return (
      <div>
        <AppHeader user={this.props.user} />
        <div className="container page-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/create-story" component={CreateStoryContainer} />
            <Route path="/stories" component={StoriesContainer} />
            <Route path="/authenticate" component={UserAuthContainer} />
            <Route path="/create-profile" component={CreateProfileContainer} />
            <Route path="/profile" component={ProfileContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addAuthListener: () => addAuthListener(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
