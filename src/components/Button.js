import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  line-height: 1;
  text-transform: capitalize;
  border-radius: 1rem;
  border: 2px solid ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  transition: background-color 200ms ease-out, color 200ms ease-out;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &.active {
    background-color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
    color: white;
  }
`;

export const ButtonLink = Button.withComponent(NavLink);

export default Button;
