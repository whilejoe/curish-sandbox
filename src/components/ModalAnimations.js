import styled from 'styled-components';
import { SLIDE_DURATION } from 'constants/animation';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import { PALETTE } from 'constants/theme';
import media from 'utils/media';

const SLIDE_STATES = {
  [ENTERING]: 'translate3d(0, 100vh, 0)',
  [ENTERED]: 'translate3d(0, 0, 0)',
  [EXITING]: 'translate3d(0, 100vh, 0)',
  [EXITED]: 'translate3d(0, 100vh, 0)'
};

const OPACITY_STATES = {
  [ENTERING]: 0,
  [ENTERED]: 1,
  [EXITING]: 0,
  [EXITED]: 0
};

const BACKDROP_STATE = {
  [ENTERING]: 0,
  [ENTERED]: 0.65,
  [EXITING]: 0,
  [EXITED]: 0
};

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: 100%;
  padding: 1rem;
  background-color: ${props => `rgba(0, 0, 0, ${BACKDROP_STATE[props.status]})`};
  transition: background-color ${SLIDE_DURATION * 0.85}ms linear;
  z-index: 3;
`;

export const Slide = styled.div`
  max-height: 100%;
  max-width: 100%;
  ${media.sm`max-width: 90%;`};
  ${media.md`max-width: 80%;`};
  ${media.lg`max-width: 70%;`};
  ${media.xlg`max-width: 60%;`};
  margin-right: auto;
  margin-left: auto;
  overflow-x: hidden;
  overflow-y: auto;
  opacity: ${props => OPACITY_STATES[props.status]};
  background-color: ${PALETTE.BODY};
  border-radius: 2px;
  outline: none;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.3);
  transform: ${props => SLIDE_STATES[props.status]};
  transition: transform ${SLIDE_DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1),
    opacity ${SLIDE_DURATION * 0.75}ms linear;
`;

export default Slide;
