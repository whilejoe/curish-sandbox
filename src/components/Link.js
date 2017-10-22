import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const Link = styled(RouterLink)`
  color: currentColor;

  &:hover,
  &:focus {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;
  }
`;

export default Link;
