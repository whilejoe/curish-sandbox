import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.4rem 0.7rem;
  background-color: transparent;
  color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  font-family: inherit;
  font-size: 0.9em;
  line-height: 1;
  vertical-align: middle;
  text-transform: uppercase;
  border-radius: 2px;
  transition: background-color 200ms ease-out, color 200ms ease-out;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &.active {
    background-color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
    color: white;
    text-decoration: none;
  }
`;

export const ButtonLink = Button.withComponent(NavLink);

export default Button;
