import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import FadeRoute from 'components/FadeRoute';
import FadeIn from 'components/FadeIn';
// import { connect } from 'react-redux';
// import { addAuthListener } from 'actions/authListener';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import Home from 'routes/Home';
import About from 'routes/About';
import NoMatch from 'routes/NoMatch';
// import CreateStoryContainer from 'containers/CreateStoryContainer';
// import StoriesContainer from 'containers/StoriesContainer';
// import UserAuthContainer from 'containers/UserAuthContainer';
import ProfileContainer from 'containers/ProfileContainer';
import CreateProfileContainer from 'containers/CreateProfileContainer';
// import AppHeader from 'components/AppHeader';
import TutsAppHeader from 'components/TutsAppHeader';
import { FADE_DURATION } from 'constants/animation';

// import CreateLink from 'routes/CreateLink';
import TutsLogin from 'routes/TutsLogin';
import Search from 'routes/Search';

class App extends Component {
  // componentWillMount() {
  //   this.props.addAuthListener();
  // }

  render() {
    return (
      <TransitionGroup>
        <Transition in appear enter={false} exit={false} timeout={FADE_DURATION}>
          {status =>
            <FadeIn status={status} duration={FADE_DURATION}>
              <FlexApp>
                <FlexHeader>
                  <TutsAppHeader />
                </FlexHeader>
                <Route
                  children={props =>
                    <TransitionGroup component={FlexMain}>
                      <Switch key={props.location.pathname} location={props.location}>
                        <FadeRoute exact path="/" component={Home} />
                        <FadeRoute path="/101" component={About} />
                        <FadeRoute path="/create-profile" component={CreateProfileContainer} />
                        <FadeRoute path="/profile" component={ProfileContainer} />
                        <FadeRoute path="/search" component={Search} />
                        <FadeRoute path="/login-tuts" component={TutsLogin} />
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

  _isLoggedIn = () => {
    return this.props.data.user;
  };
}

// const mapStateToProps = state => ({
//   user: state.user
// });

// const mapDispatchToProps = dispatch => ({
//   addAuthListener: () => dispatch(addAuthListener())
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(App));
