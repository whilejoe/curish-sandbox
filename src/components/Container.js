import styled from 'styled-components';

// const THEME = {
//   sm: '22rem',
//   md: '60rem',
//   lg: '70rem'
// }

const Container = styled.div`
  position: relative;
  max-width: ${props => (props.narrow ? '22rem' : '70rem')};
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export default Container;
