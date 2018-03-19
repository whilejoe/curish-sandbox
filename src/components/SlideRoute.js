import React from 'react';
import { Route } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import { Slide, Backdrop, SlideContent } from 'components/SlideAnimations';
import { SLIDE_DURATION } from 'constants/animation';

const SlideRoute = ({ component: Component, ...rest }) => {
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
            timeout={SLIDE_DURATION}
            unmountOnExit
            mountOnEnter
          >
            {status => (
              <div>
                <Slide status={status} duration={SLIDE_DURATION}>
                  <SlideContent>
                    <Component {...merged} />
                  </SlideContent>
                </Slide>
                <Backdrop status={status} />
              </div>
            )}
          </Transition>
        );
      }}
    />
  );
};

export default SlideRoute;
