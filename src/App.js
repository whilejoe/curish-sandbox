import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FlexApp, FlexMain, FlexHeader } from 'components/FlexApp';
import AppHeader from 'components/AppHeader';
import LoginContainer from 'containers/LoginContainer';
import CreateUserContainer from 'containers/CreateUserContainer';
import Home from 'routes/Home';
import About from 'routes/About';
import Callback from 'routes/Callback';
import UserProfile from 'routes/UserProfile';
import NoMatch from 'routes/NoMatch';
import QuillEditor from 'components/QuillEditor';
import AppFade from 'components/AppFade';
import FadeRoute from 'components/FadeRoute';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const App = () => {
  return (
    <AppFade>
      <FlexApp>
        <FlexHeader>
          <AppHeader />
        </FlexHeader>
        <Route
          children={props => {
            return (
              <TransitionGroup component={FlexMain}>
                <Switch key={props.location.pathname} location={props.location}>
                  <FadeRoute exact path="/" component={Home} />
                  <FadeRoute path="/101" component={About} />
                  <FadeRoute path="/profile" component={UserProfile} />
                  <FadeRoute path="/write/:id?" component={QuillEditor} />
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
    </AppFade>
  );
};

export default App;
