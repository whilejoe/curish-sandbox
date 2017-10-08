import React from 'react';
import styled from 'styled-components';
import Transition, { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import Link from 'components/Link';
import Icon from 'components/Icon';

// import { THEME, PRIMARY_KEY } from 'constants/theme';
// color: ${THEME[PRIMARY_KEY]};

const DURATION = 160;

const STATES = {
  [ENTERING]: { opacity: 1, transform: 'translate3d(0%, -50%, 0)' },
  [ENTERED]: { opacity: 1, transform: 'translate3d(0%, -50%, 0)' },
  [EXITING]: { opacity: 0, transform: 'translate3d(-200%, -50%, 0)' },
  [EXITED]: { opacity: 0, transform: 'translate3d(-200%, -50%, 0)' }
};

const BackLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 0;
  padding: 0.85rem;
  font-size: 1.15em;
  line-height: 1;
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition: ${`transform ${DURATION}ms ease-out, opacity ${DURATION}ms ease-out`};
`;

const BackButton = ({ referrer, show, ...props }) => {
  return (
    <Transition in={show} timeout={DURATION}>
      {status => {
        return (
          <BackLink
            {...props}
            to={referrer ? referrer : ''}
            status={status}
            tabIndex={!show ? -1 : 0}
            aria-hidden={!show}
          >
            <Icon type="back" title="go back" />
          </BackLink>
        );
      }}
    </Transition>
  );
};

export default BackButton;
