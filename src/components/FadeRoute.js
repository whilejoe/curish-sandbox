import React from 'react';
import { Route } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import { CrossFade } from 'components/FadeAnimations';
import { CROSS_FADE_DURATION } from 'constants/animation';

const FadeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // Combine passed props with route props
        // cleanest way atm for passing props to component. revisit.
        const merged = { ...rest, ...props };
        return (
          <Transition
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
