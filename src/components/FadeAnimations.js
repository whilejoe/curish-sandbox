import styled from 'styled-components';
import { FADE_IN_DURATION, CROSS_FADE_DURATION } from 'constants/animation';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';

const statusOpacity = {
  [ENTERING]: 0.01,
  [ENTERED]: 1,
  [EXITING]: 0.01,
  [EXITED]: 0.01
};

export const FadeIn = styled.div`
  opacity: ${props => statusOpacity[props.status]};
  transition-property: opacity, background-color;
  transition-duration: ${props => props.duration || FADE_IN_DURATION}ms;
  transition-timing-function: ${props =>
    props.status === ENTERING || props.status === ENTERED ? 'ease-in' : 'ease-out'};
`;

export const CrossFade = FadeIn.extend`
  position: absolute;
  width: 100%;
  transition-duration: ${props => props.duration || CROSS_FADE_DURATION}ms;
`;

export default FadeIn;