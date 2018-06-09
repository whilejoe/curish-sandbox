import React from 'react';
import { Switch } from 'react-router-dom';
import EnhancedRoute from 'components/EnhancedRoute';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import { graphql } from 'react-apollo';
import UserProfileQuery from 'graphql/UserProfileQuery.graphql';
import AppHeader from 'components/AppHeader';
import SubHeader from 'components/SubHeader';
import LoginContainer from 'containers/LoginContainer';
import VerifyContainer from 'containers/VerifyContainer';
import JoinContainer from 'containers/JoinContainer';
import StoryNewContainer from 'containers/StoryNewContainer';
import StoryEditContainer from 'containers/StoryEditContainer';
import StoryPublishedContainer from 'containers/StoryPublishedContainer';
import ProfileContainer from 'containers/ProfileContainer';
import UserStoriesContainer from 'containers/UserStoriesContainer';
import SearchContainer from 'containers/SearchContainer';
import TagsContainer from 'containers/TagsContainer';
import Home from 'routes/Home';
import About from 'routes/About';
import Callback from 'routes/Callback';
import UserProfile from 'routes/UserProfile';
import Messages from 'routes/Messages';
import Message from 'routes/Message';
import NewMessage from 'routes/NewMessage';
import Notifications from 'routes/Notifications';
import NoMatch from 'routes/NoMatch';
import AppFade from 'components/AppFade';
import RouteAnalytics from 'components/RouteAnalytics';
import { isEnvLocalhost } from 'utils/env';

const TRACK_ANALYTICS = !isEnvLocalhost;

const App = ({ userData: user }) => {
  const analyticsOptions = user.user ? { userId: user.user.id } : {};
  return (
    <AppFade>
      <FlexApp>
        <FlexHeader>
          <AppHeader userResult={user} />
          <SubHeader userResult={user} />
        </FlexHeader>
        <FlexMain>
          <Switch>
            <EnhancedRoute exact path="/" component={Home} userResult={user} />
            <EnhancedRoute path="/101" component={About} />
            <EnhancedRoute path="/search" component={SearchContainer} />
            <EnhancedRoute
              path="/profile"
              component={UserProfile}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <EnhancedRoute
              path="/stories"
              component={UserStoriesContainer}
              userResult={user}
              requireAuth
            />
            <EnhancedRoute
              path="/messages"
              component={Messages}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <EnhancedRoute
              path="/new-message"
              component={NewMessage}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <EnhancedRoute path="/message/:id" component={Message} userResult={user} requireAuth />
            <EnhancedRoute path="/notifications" component={Notifications} userResult={user} requireAuth />
            <EnhancedRoute
              path="/write"
              component={StoryNewContainer}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <EnhancedRoute
              path="/edit/:id"
              component={StoryEditContainer}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <EnhancedRoute
              path="/tags/:key?"
              component={TagsContainer}
              userResult={user}
              scrollToTop
            />
            <EnhancedRoute path="/story/:id" component={StoryPublishedContainer} scrollToTop />
            <EnhancedRoute path="/join" component={JoinContainer} userResult={user} requireAuth />
            <EnhancedRoute path="/login" component={LoginContainer} />
            <EnhancedRoute path="/verify" component={VerifyContainer} />
            <EnhancedRoute path="/callback" component={Callback} userResult={user} />
            <EnhancedRoute path="/:userName?" component={ProfileContainer} />
            <EnhancedRoute component={NoMatch} />
          </Switch>
        </FlexMain>
      </FlexApp>
      {TRACK_ANALYTICS && !user.loading && <RouteAnalytics options={analyticsOptions} />}
    </AppFade>
  );
};

export default graphql(UserProfileQuery, {
  name: 'userData'
  // options: { fetchPolicy: 'network-only' } // Do we need this fetchPolicy?
})(App);
