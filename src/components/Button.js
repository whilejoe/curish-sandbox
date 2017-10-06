import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background-color: transparent;
  color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  font-family: inherit;
  line-height: normal;
  text-transform: capitalize;
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
