import styled from 'styled-components';

const THEME = {
  sm: '22rem',
  md: '39rem',
  lg: '69rem'
};

const Container = styled.div`
  position: relative;
  max-width: ${props => THEME[props.size] || THEME['md']};
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export default Container;
