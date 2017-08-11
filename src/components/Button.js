import styled from 'styled-components';

const theme = {
  primary: 'SteelBlue',
  secondary: 'SeaGreen',
  tertiary: 'Tomato',
  error: 'IndianRed'
};

const Button = styled.button`
  padding: 0.4rem .8rem;
  background-color: transparent;
  color: ${props => theme[props.theme] || theme['primary']};
  font-size: ${props => (props.large ? '1rem' : '.85rem')};
  font-weight: 600;
  font-family: inherit;
  line-height: 1;
  border-radius: 20px;
  border: 2px solid ${props => theme[props.theme] || theme['primary']};
  transition: background-color 200ms ease-out, color 200ms ease-out;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    background-color: ${props => theme[props.theme] || theme['primary']};
    color: white;
    outline: none;
  }
`;

export default Button;
