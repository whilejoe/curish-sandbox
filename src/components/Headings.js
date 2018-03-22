import styled, { css } from 'styled-components';
import { modularScale, stripUnit } from 'polished';

const BASE = 0.9;
const RATIO = 1.25;

const headingMixin = css`
  margin: 0;
  font-weight: 700;
  color: #444;
`;

export const H1 = styled.h1`
  font-size: ${modularScale(3, BASE, RATIO)};
  padding: ${stripUnit(modularScale(3, BASE, RATIO)) * 0.5}em 0;
  ${headingMixin};
`;

export const H2 = styled.h2`
  font-size: ${modularScale(2, BASE, RATIO)};
  padding: ${stripUnit(modularScale(2, BASE, RATIO)) * 0.5}em 0;
  ${headingMixin};
`;

export const H3 = styled.h3`
  font-size: ${modularScale(1, BASE, RATIO)};
  padding: ${stripUnit(modularScale(1, BASE, RATIO)) * 0.5}em 0;
  ${headingMixin};
`;

export const H4 = styled.h4`
  font-size: ${modularScale(1, BASE, RATIO)};
  ${headingMixin};
`;

export const H5 = styled.h5`
  font-size: ${modularScale(0, BASE, RATIO)};
  ${headingMixin};
`;

export const H6 = styled.h6`
  font-size: ${modularScale(0, BASE, RATIO)};
  ${headingMixin};
`;
