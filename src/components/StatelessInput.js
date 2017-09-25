import styled from 'styled-components';
import { PALETTE } from 'constants/theme';
import { darken } from 'polished';

const PLACEHOLDER_COLOR = PALETTE.GRAY.MEDIUM;
const ACTIVE_PLACEHOLDER_COLOR = darken(0.2, PALETTE.GRAY.MEDIUM);

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
    border-bottom-color: ${darken(0.2, PALETTE.GRAY.LIGHT)};

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
