import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/Icon';

const IconLink = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0.75rem 0.85rem;
  line-height: 1;
  text-align: center;

  &:after {
    position: absolute;
    content: '';
    bottom: 1px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0;
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

const NavIconLink = ({ type, title, ...rest }) => {
  return (
    <IconLink {...rest}>
      <Icon type={type} title={title} />
    </IconLink>
  );
};

export default NavIconLink;
