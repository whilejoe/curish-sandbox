import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PALETTE, THEME, PRIMARY_KEY } from 'constants/theme';

const Button = styled.button`
  display: inline-block;
  padding-right: 0.75em;
  padding-left: 0.75em;
  background-color: transparent;
  color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
  font-family: inherit;
  font-size: 0.87em;
  font-weight: 600;
  line-height: 1.7;
  vertical-align: middle;
  text-transform: lowercase;
  border: 2px solid;
  border-radius: 3px;
  transition: background-color 150ms ease-out, color 150ms ease-out;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &.active {
    background-color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
    color: ${PALETTE.BODY};
    border-color: ${props => THEME[props.theme] || THEME[PRIMARY_KEY]};
    text-decoration: none;
  }
`;

export const ButtonLink = Button.withComponent(Link);

export default Button;
