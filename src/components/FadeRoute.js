import React from 'react';
import { Route } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import CrossFade from 'components/CrossFade';
import { CROSS_FADE_DURATION } from 'constants/animation';

const FadeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        <Transition
          in={props.history.location.pathname === props.location.pathname}
          timeout={CROSS_FADE_DURATION}
          appear
          unmountOnExit
        >
          {status =>
            <CrossFade status={status}>
              <Component {...props} />
            </CrossFade>}
        </Transition>}
    />
  );
};

export default FadeRoute;
