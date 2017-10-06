import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Link = styled(NavLink)`
  color: currentColor;
  transition: color 100ms ease-out;

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;
  }
`;

export default Link;
