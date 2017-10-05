import styled from 'styled-components';
import { SLIDE_DURATION } from 'constants/animation';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';

const SLIDE_STATES = {
  [ENTERING]: 'translate3d(0, 150%, 0)',
  [ENTERED]: 'translate3d(0, 0%, 0)',
  [EXITING]: 'translate3d(0, 70%, 0)',
  [EXITED]: 'translate3d(0, 70%, 0)'
};

const OPACITY_STATES = {
  [ENTERING]: 0,
  [ENTERED]: 1,
  [EXITING]: 0,
  [EXITED]: 0
};

const BACKDROP_STATE = {
  [ENTERING]: 0,
  [ENTERED]: 0.5,
  [EXITING]: 0,
  [EXITED]: 0
};

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  opacity: ${props => BACKDROP_STATE[props.status]};
  transition: opacity ${SLIDE_DURATION * 0.65}ms linear;
`;

export const Slide = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  opacity: ${props => OPACITY_STATES[props.status]};
  background-color: white;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.3);
  transform: ${props => SLIDE_STATES[props.status]};
  transition: transform ${SLIDE_DURATION}ms cubic-bezier(0, 0.45, 0.7, 1),
    opacity ${SLIDE_DURATION * 0.7}ms linear;
  z-index: 1;
`;

export const SlideContent = styled.div`
  overflow-y: auto;
  height: 100%;
  background-color: white;
`;

export default Slide;
