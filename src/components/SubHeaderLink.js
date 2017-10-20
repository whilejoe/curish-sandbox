import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Transition, { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
// import { THEME, PRIMARY_KEY } from 'constants/theme';
// import { darken } from 'polished';

// #636363
const DURATION = 160;

const STATES = {
  [ENTERING]: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  [ENTERED]: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  [EXITING]: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
  [EXITED]: { opacity: 0, transform: 'translate3d(0, 100%, 0)' }
};

// const COLOR_ACTIVE = THEME[PRIMARY_KEY];

const NavAction = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0.85rem 0.9rem;
  font-size: 1.1em;
  color: #3c2242;
  line-height: 1;
  text-align: center;
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition: ${`
    transform ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1),
    opacity ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1), color 150ms linear
  `};

  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 150ms linear;
  }

  &:hover,
  &:focus,
  &.active {
    text-decoration: none;

    &:after {
      opacity: 1;
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
