import styled from 'styled-components';

const theme = {
  primary: 'SteelBlue',
  secondary: 'SeaGreen',
  tertiary: 'Tomato',
  error: 'IndianRed'
};

const Button = styled.button`
  padding: 0.35rem .8rem;
  background-color: transparent;
  color: ${props => theme[props.theme] || theme['primary']};
  font-size: .85rem;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1;
  border-radius: 3px;
  border: 2px solid ${props => theme[props.theme] || theme['primary']};
  
  &:hover,
  &:focus {
    background-color: ${props => theme[props.theme] || theme['primary']};
    color: white;
	}
`;

export default Button;