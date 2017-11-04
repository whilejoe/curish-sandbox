import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ScrollToTopOnMount from 'components/ScrollToTopOnMount';
import Transition from 'react-transition-group/Transition';
import { CrossFade } from 'components/FadeAnimations';
import { CROSS_FADE_DURATION } from 'constants/animation';
import { isAuthed } from 'utils/authService';

const FadeRoute = ({ component: Component, requireAuth, scrollToTop, ...rest }) => {
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
                {requireAuth && !isAuthed() ? <Redirect to="/login" /> : <Component {...merged} />}
                {scrollToTop && <ScrollToTopOnMount />}
              </CrossFade>
            )}
          </Transition>
        );
      }}
    />
  );
};

export default FadeRoute;
