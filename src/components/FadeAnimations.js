import styled from 'styled-components';
import { FADE_IN_DURATION, CROSS_FADE_DURATION } from 'constants/animation';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';

const STATES = {
  [ENTERING]: 0,
  [ENTERED]: 1,
  [EXITING]: 0,
  [EXITED]: 0
};

export const FadeIn = styled.div`
  opacity: ${props => STATES[props.status]};
  transition-property: opacity;
  transition-duration: ${props => props.duration || FADE_IN_DURATION}ms;
  transition-timing-function: cubic-bezier(0.2, 0.3, 0.3, 1);
`;

export const CrossFade = FadeIn.extend`
  position: absolute;
  width: 100%;
  transition-duration: ${props => props.duration || CROSS_FADE_DURATION}ms;
`;

export default FadeIn;
