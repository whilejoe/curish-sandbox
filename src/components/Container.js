import styled from 'styled-components';

const THEME = {
  sm: '22rem',
  md: '38rem',
  lg: '69rem'
};

const Container = styled.div`
  position: relative;
  max-width: ${props => THEME[props.size] || THEME['md']};
  margin-right: auto;
  margin-left: auto;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
`;

export default Container;
