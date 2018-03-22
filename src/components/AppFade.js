import React from 'react';
import Transition from 'react-transition-group/Transition';
import FadeIn from 'components/FadeAnimations';
import { APP_FADE_DURATION } from 'constants/animation';

const AppFade = ({ children }) => {
  return (
    <Transition in appear enter={false} exit={false} timeout={APP_FADE_DURATION}>
      {status => (
        <FadeIn status={status} duration={APP_FADE_DURATION}>
          {children}
        </FadeIn>
      )}
    </Transition>
  );
};

export default AppFade;
