import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Transition, { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const DURATION = 160;

const STATES = {
  [ENTERING]: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  [ENTERED]: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  [EXITING]: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
  [EXITED]: { opacity: 0, transform: 'translate3d(0, 100%, 0)' }
};

const NavAction = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0.8rem;
  font-size: 1.05em;
  text-align: center;
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition: ${`transform ${DURATION}ms ease-out, opacity ${DURATION}ms ease-out, color 180ms ease-out`};

  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0;
    transform: translate3d(0, 5px, 0);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;

    &:after {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const SubHeaderLink = ({ show, children, ...props }) => {
  return (
    <Transition in={show} timeout={DURATION}>
      {status => {
        return (
          <NavAction {...props} status={status} tabIndex={!show ? -1 : 0} aria-hidden={!show}>
            {children}
          </NavAction>
        );
      }}
    </Transition>
  );
};

export default SubHeaderLink;
