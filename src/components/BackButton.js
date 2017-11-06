import React from 'react';
import styled from 'styled-components';
import { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import NavIconLink from 'components/NavIconLink';
import { FlexContent } from 'components/Flex';

const STATES = {
  [ENTERING]: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  [ENTERED]: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
  [EXITING]: { opacity: 0, transform: 'translate3d(-200%, 0, 0)' },
  [EXITED]: { opacity: 0, transform: 'translate3d(-200%, 0, 0)' }
};

const BackTransitioner = styled(FlexContent)`
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition: ${props =>
    `transform ${props.duration}ms ease-out, opacity ${props.duration}ms ease-out`};
`;

const BackButton = ({ referrer, status, duration, ...props }) => {
  return (
    <BackTransitioner space="self" status={status} duration={duration}>
      <NavIconLink to={referrer ? referrer : ''} type="back" title="go back" />
    </BackTransitioner>
  );
};

export default BackButton;
