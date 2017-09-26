import { css } from 'styled-components';

// temp copied from Flex
const BREAK_POINTS = {
  sm: '478px',
  md: '780px',
  lg: '1080px'
};

export const media = Object.keys(BREAK_POINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`@media (min-width: ${BREAK_POINTS[label]}) {${css(...args)};}`;

  return acc;
}, {});
