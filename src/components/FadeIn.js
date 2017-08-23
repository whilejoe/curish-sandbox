import styled from 'styled-components';

const statusOpacity = {
  entering: 0.01,
  entered: 1,
  exiting: 0.01,
  exited: 0.01
};

const FadeIn = styled.div`
  opacity: ${props => statusOpacity[props.status]};
  transition-property: opacity, background-color;
  transition-duration: ${props => (props.duration ? props.duration : '200')}ms;
  transition-timing-function: linear;
`;

export default FadeIn;
