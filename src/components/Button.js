import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Button = styled.button`
  display: inline-block;
  padding: 0.51em 0.8em;
  background-color: transparent;
  color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  font-family: inherit;
  font-size: 0.9em;
  line-height: 0.9em;
  vertical-align: middle;
  text-transform: uppercase;
  border-radius: 2px;
  transition: background-color 150ms ease-out, color 150ms ease-out;
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

export const ButtonLink = Button.withComponent(Link);

export default Button;
