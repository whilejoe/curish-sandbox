import React from 'react';
import { Route } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import { CrossFade } from 'components/FadeIn';
import { CROSS_FADE_DURATION } from 'constants/animation';

const FadeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // Combine passed props with route props
        const merged = { ...rest, ...props };
        return (
          <Transition
            // {...rest}
            in={props.history.location.pathname === props.location.pathname}
            timeout={CROSS_FADE_DURATION}
            unmountOnExit
            mountOnEnter
          >
            {status => (
              <CrossFade status={status} duration={CROSS_FADE_DURATION}>
                <Component {...merged} />
              </CrossFade>
            )}
          </Transition>
        );
      }}
    />
  );
};

export default FadeRoute;
