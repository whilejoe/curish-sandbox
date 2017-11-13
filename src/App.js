import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import { graphql } from 'react-apollo';
import UserProfileQuery from 'graphql/UserProfileQuery.graphql';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
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
import Notifications from 'routes/Notifications';
import NoMatch from 'routes/NoMatch';
import AppFade from 'components/AppFade';
import FadeRoute from 'components/FadeRoute';
// import TransitionGroup from 'react-transition-group/TransitionGroup';

function bounce(val) {
  return spring(val, {
    // stiffness: 134,
    // damping: 15
    stiffness: 330,
    damping: 22
  });
}

const App = ({ userData: user }) => {
  return (
    <AppFade>
      <FlexApp>
        <FlexHeader>
          <AppHeader userResult={user} />
          <SubHeader userResult={user} />
        </FlexHeader>
        <FlexMain>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: bounce(0) }}
            atActive={{ opacity: bounce(1) }}
          >
            <FadeRoute exact path="/" component={Home} userResult={user} />
            <FadeRoute path="/101" component={About} />
            <FadeRoute path="/search" component={SearchContainer} requireAuth />
            <FadeRoute
              path="/profile"
              component={UserProfile}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <FadeRoute
              path="/stories"
              component={UserStoriesContainer}
              userResult={user}
              requireAuth
            />
            <FadeRoute path="/messages" component={Messages} userResult={user} requireAuth />
            <FadeRoute path="/notifications" component={Notifications} userResult={user} />
            <FadeRoute
              path="/write"
              component={StoryNewContainer}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <FadeRoute
              path="/edit/:id"
              component={StoryEditContainer}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <FadeRoute
              path="/tags/:key?"
              component={TagsContainer}
              userResult={user}
              requireAuth
              scrollToTop
            />
            <FadeRoute path="/story/:id" component={StoryPublishedContainer} scrollToTop />
            <FadeRoute path="/join" component={JoinContainer} userResult={user} requireAuth />
            <FadeRoute path="/login" component={LoginContainer} />
            <FadeRoute path="/verify" component={VerifyContainer} />
            <FadeRoute path="/callback" component={Callback} userResult={user} />
            <FadeRoute path="/:userName?" component={ProfileContainer} />
            <FadeRoute component={NoMatch} />
          </AnimatedSwitch>
        </FlexMain>
      </FlexApp>
    </AppFade>
  );
};

export default graphql(UserProfileQuery, {
  name: 'userData'
  // options: { fetchPolicy: 'network-only' } // Do we need this fetchPolicy?
})(App);
