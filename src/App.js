import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { gql, graphql } from 'react-apollo';
// import LoginAuth0 from 'components/LoginAuth0';
import FadeRoute from 'components/FadeRoute';
import FadeIn from 'components/FadeIn';
// import { connect } from 'react-redux';
// import { addAuthListener } from 'actions/authListener';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import Home from 'routes/Home';
import About from 'routes/About';
import CreateUserContainer from 'containers/CreateUserContainer';
import NoMatch from 'routes/NoMatch';
// import CreateStoryContainer from 'containers/CreateStoryContainer';
// import StoriesContainer from 'containers/StoriesContainer';
// import UserAuthContainer from 'containers/UserAuthContainer';
import LoginContainer from 'containers/LoginContainer';
// import ProfileContainer from 'containers/ProfileContainer';
// import CreateProfileContainer from 'containers/CreateProfileContainer';
// import AppHeader from 'components/AppHeader';
import TutsAppHeader from 'components/TutsAppHeader';
import { APP_FADE_DURATION } from 'constants/animation';

// import CreateLink from 'routes/CreateLink';
// import TutsLogin from 'routes/TutsLogin';
import Search from 'routes/Search';
import Callback from 'routes/Callback';
// import Profile from 'routes/Profile';
import UserProfile from 'routes/UserProfile';

class App extends Component {
  render() {
    return (
      <TransitionGroup>
        <Transition in appear enter={false} exit={false} timeout={APP_FADE_DURATION}>
          {status => (
            <FadeIn status={status} duration={APP_FADE_DURATION}>
              <FlexApp>
                <FlexHeader>
                  <TutsAppHeader />
                </FlexHeader>
                <Route
                  children={props => {
                    console.log('route props', props);
                    return (
                      <TransitionGroup component={FlexMain}>
                        <Switch key={props.location.pathname} location={props.location}>
                          <FadeRoute exact path="/" component={Home} />
                          <FadeRoute path="/101" component={About} />
                          <FadeRoute path="/profile" component={UserProfile} />
                          <FadeRoute path="/search" component={Search} />
                          <FadeRoute path="/join" component={CreateUserContainer} />
                          <FadeRoute path="/login" component={LoginContainer} />
                          <FadeRoute path="/callback" component={Callback} />
                          <FadeRoute component={NoMatch} />
                        </Switch>
                      </TransitionGroup>
                    );
                  }}
                />
              </FlexApp>
            </FadeIn>
          )}
        </Transition>
      </TransitionGroup>
    );
  }
}

// const mapStateToProps = state => ({
//   user: state.user
// });

// const mapDispatchToProps = dispatch => ({
//   addAuthListener: () => dispatch(addAuthListener())
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export const USER_QUERY = gql`
// query UserQuery {
//   user {
//     id
//   }
// }
// `;

// export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);

// const USER_QUERY = gql`
//   query {
//     user {
//       id
//     }
//   }
// `;

// export default graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } })(App);
export default App;
