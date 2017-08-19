import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import FadeRoute from 'components/FadeRoute';
import FadeIn from 'components/FadeIn';
import { connect } from 'react-redux';
import { addAuthListener } from 'actions/authListener';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import Home from 'routes/Home';
import About from 'routes/About';
import NoMatch from 'routes/NoMatch';
import CreateStoryContainer from 'containers/CreateStoryContainer';
import StoriesContainer from 'containers/StoriesContainer';
import UserAuthContainer from 'containers/UserAuthContainer';
import ProfileContainer from 'containers/ProfileContainer';
import CreateProfileContainer from 'containers/CreateProfileContainer';
import AppHeader from 'components/AppHeader';
import { FADE_DURATION } from 'constants/animation';

class App extends Component {
  componentWillMount() {
    this.props.addAuthListener();
  }

  render() {
    return (
      <TransitionGroup>
        <Transition in appear enter={false} exit={false} timeout={FADE_DURATION}>
          {status =>
            <FadeIn status={status} duration={FADE_DURATION}>
              <FlexApp>
                <FlexHeader>
                  <AppHeader user={this.props.user} />
                </FlexHeader>
                <Route
                  children={props =>
                    <TransitionGroup component={FlexMain}>
                      <Switch key={props.location.pathname} location={props.location}>
                        <FadeRoute exact path="/" component={Home} />
                        <FadeRoute path="/101" component={About} />
                        <FadeRoute path="/create-story" component={CreateStoryContainer} />
                        <FadeRoute path="/stories" component={StoriesContainer} />
                        <FadeRoute path="/authenticate" component={UserAuthContainer} />
                        <FadeRoute path="/create-profile" component={CreateProfileContainer} />
                        <FadeRoute path="/profile" component={ProfileContainer} />
                        <FadeRoute component={NoMatch} />
                      </Switch>
                    </TransitionGroup>}
                />
              </FlexApp>
            </FadeIn>}
        </Transition>
      </TransitionGroup>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addAuthListener: () => dispatch(addAuthListener())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
