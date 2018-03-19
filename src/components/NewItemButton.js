import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { THEME, SECONDARY_KEY } from 'constants/theme';
import { rgba } from 'polished';
import Icon from 'components/Icon';

const COLOR = THEME[SECONDARY_KEY];

const PlusIcon = styled(Icon)`
  width: 62%;
  height: 62%;
  transform: rotate(0) scale3d(1, 1, 1);
  transition: transform 200ms ease-out;
`;

const HeaderButton = styled(Link)`
  position: absolute;
  right: 1rem;
  top: 0;
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  height: 2.3rem;
  width: 2.3rem;
  padding: 0;
  background-color: ${COLOR};
  color: white;
  border: 2px solid transparent;
  border-radius: 50%;
  box-shadow: -1px 2px 6px -1px ${rgba('black', 0.15)};
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  &:hover,
  &:focus {
    background-color: white;
    color: ${COLOR};
    border-color: ${COLOR};
    box-shadow: -2px 3px 12px 0px ${rgba('black', 0.15)};

    & ${PlusIcon} {
      transform: rotate(180deg) scale3d(1.1, 1.1, 1);
    }
  }
`;

const NewItemButton = ({ to, type, title }) => {
  return (
    <HeaderButton to={to}>
      <PlusIcon type="plus" title={title} />
    </HeaderButton>
  );
};

export default NewItemButton;
