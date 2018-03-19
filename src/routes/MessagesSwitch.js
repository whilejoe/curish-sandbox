import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FadeRoute from 'components/FadeRoute';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Messages from 'routes/Messages';
import Message from 'routes/Message';
import NewMessage from 'routes/NewMessage';

const MessagesSwitch = ({ userResult, parentLocation, ...rest }) => {
  // console.log('location', location);
  return (
    <Route
      children={() => {
        return (
          <TransitionGroup>
            <Switch key={parentLocation.key} location={parentLocation}>
              <FadeRoute path="/messages" component={Messages} userResult={userResult} />
              <FadeRoute path="/new-message" component={NewMessage} userResult={userResult} />
              <FadeRoute path="/message/:id" component={Message} userResult={userResult} />
            </Switch>
          </TransitionGroup>
        );
      }}
    />
  );
};

export default MessagesSwitch;
