import styled, { css } from 'styled-components';
import { PALETTE, THEME, PRIMARY_KEY } from 'constants/theme';
import { darken } from 'polished';

const ACTIVE_COLOR = THEME[PRIMARY_KEY];
const PLACEHOLDER_COLOR = PALETTE.GRAY.MEDIUM;
const ACTIVE_PLACEHOLDER_COLOR = darken(0.2, PALETTE.GRAY.MEDIUM);

const activeState = css`
  outline: none;
  border-bottom: 1px solid ${ACTIVE_COLOR};
  box-shadow: 0 1px 0 0 ${ACTIVE_COLOR};
`;

export const StatelessInput = styled.input`
  margin-bottom: 1.5rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${PALETTE.GRAY.LIGHT};
  border-radius: 0;
  outline: none;
  height: 2.5rem;
  width: 100%;
  font-size: inherit;
  padding: 0;
  box-shadow: none;

  &::placeholder {
    font-size: inherit;
    color: ${PLACEHOLDER_COLOR};
  }

  &:focus {
    ${activeState};

    &::placeholder {
      color: ${ACTIVE_PLACEHOLDER_COLOR};
    }
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: inherit;
    box-shadow: 0 0 0px 100px white inset;

    &:hover,
    &:focus {
      -webkit-text-fill-color: inherit;
      box-shadow: 0 0 0px 100px white inset;
    }
  }
`;

export default StatelessInput;
