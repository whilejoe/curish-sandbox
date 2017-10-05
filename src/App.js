import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import AppHeader from 'components/AppHeader';
import SubHeader from 'components/SubHeader';
import LoginContainer from 'containers/LoginContainer';
import VerifyContainer from 'containers/VerifyContainer';
import CreateUserContainer from 'containers/CreateUserContainer';
import CreateStoryContainer from 'containers/CreateStoryContainer';
import ProfileContainer from 'containers/ProfileContainer';
import Home from 'routes/Home';
import About from 'routes/About';
import StorySearch from 'routes/StorySearch';
import Callback from 'routes/Callback';
import UserProfile from 'routes/UserProfile';
import UserStories from 'routes/UserStories';
import Messages from 'routes/Messages';
import Notifications from 'routes/Notifications';
import NoMatch from 'routes/NoMatch';
import AppFade from 'components/AppFade';
import FadeRoute from 'components/FadeRoute';
// import SlideRoute from 'components/SlideRoute';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const App = ({ userData: user }) => {
  return (
    <AppFade>
      <FlexApp>
        <FlexHeader>
          <AppHeader userResult={user} />
          <SubHeader userResult={user} />
        </FlexHeader>
        <Route
          children={props => {
            return (
              <TransitionGroup component={FlexMain}>
                <Switch key={props.location.pathname} location={props.location}>
                  <FadeRoute exact path="/" userResult={user} component={Home} />
                  <FadeRoute path="/101" component={About} />
                  <FadeRoute path="/search" component={StorySearch} />
                  <FadeRoute path="/profile" userResult={user} component={UserProfile} />
                  <FadeRoute path="/stories" userResult={user} component={UserStories} />
                  <FadeRoute path="/messages" userResult={user} component={Messages} />
                  <FadeRoute path="/notifications" userResult={user} component={Notifications} />
                  <FadeRoute
                    path="/write/:id?"
                    userResult={user}
                    component={CreateStoryContainer}
                  />
                  <FadeRoute path="/join" userResult={user} component={CreateUserContainer} />
                  <FadeRoute path="/login" component={LoginContainer} />
                  <FadeRoute path="/verify" component={VerifyContainer} />
                  <FadeRoute path="/callback" userResult={user} component={Callback} />
                  <FadeRoute path="/:userName?" component={ProfileContainer} />
                  <FadeRoute component={NoMatch} />
                </Switch>
              </TransitionGroup>
            );
          }}
        />
      </FlexApp>
    </AppFade>
  );
};

const USER_PROFILE_QUERY = gql`
  query {
    user {
      id
      fullName
      userName
      email
      photoURL
      createdAt
    }
  }
`;

export default graphql(USER_PROFILE_QUERY, {
  name: 'userData',
  options: { fetchPolicy: 'network-only' } // Do we need this fetchPolicy?
})(App);
