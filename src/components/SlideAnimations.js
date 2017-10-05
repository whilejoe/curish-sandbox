import styled from 'styled-components';
import { SLIDE_DURATION } from 'constants/animation';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';

const SLIDE_STATES = {
  [ENTERING]: 'translate3d(0, 100%, 0)',
  [ENTERED]: 'translate3d(0, 0%, 0)',
  [EXITING]: 'translate3d(0, 100%, 0)',
  [EXITED]: 'translate3d(0, 100%, 0)'
};

const OPACITY_STATES = {
  [ENTERING]: 0,
  [ENTERED]: 1,
  [EXITING]: 0,
  [EXITED]: 0
};

export const Slide = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  opacity: ${props => OPACITY_STATES[props.status]};
  background-color: darkcyan;
  transform: ${props => SLIDE_STATES[props.status]};
  transition-property: transform, opacity;
  transition-duration: ${props => props.duration || SLIDE_DURATION}ms;
  transition-timing-function: ease-out;
  z-index: 1;
`;

export default Slide;
