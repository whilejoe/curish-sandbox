import React from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';
import ErrorMessage from 'abyss-form/lib/ErrorMessage';
import { THEME, PRIMARY_KEY, ERROR_KEY, PALETTE } from 'constants/theme';

let activeClass = '';

const COLOR = 'inherit';
const ACTIVE_COLOR = THEME[PRIMARY_KEY];
const ERROR_COLOR = THEME[ERROR_KEY];
const PLACEHOLDER_COLOR = PALETTE.GRAY.MEDIUM;

const activeState = css`
  outline: none;
  border-bottom: 1px solid ${ACTIVE_COLOR};
  box-shadow: 0 1px 0 0 ${ACTIVE_COLOR};
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font-size: inherit;
  color: ${COLOR};
  cursor: text;
  transition: transform 0.2s ease-out;
  transform-origin: 0% 100%;
  text-align: initial;
  transform: translateY(10px);
  pointer-events: none;
`;

export const Input = styled(TextInput)`
  background-color: transparent;
  color: ${COLOR};
  border: none;
  border-bottom: 1px solid ${PLACEHOLDER_COLOR};
  border-radius: 0;
  outline: none;
  height: 2.5rem;
  width: 100%;
  font-size: inherit;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;

  &:focus,
  &.active {
    ${activeState};
  }

  &:focus,
  &.active,
  &[placeholder] {
    & + ${Label} {
      color: ${ACTIVE_COLOR};
      transform: translateY(-14px) scale(0.8);
      transform-origin: 0 0;
    }
  }

  &.abyss-form-invalid {
    color: ${ERROR_COLOR};
    border-bottom: 1px solid red;
    box-shadow: 0 1px 0 0 red;

    & + ${Label} {
      color: ${ERROR_COLOR};
    }
  }

  &::placeholder {
    font-size: inherit;
    color: ${PLACEHOLDER_COLOR};
  }

  &:-webkit-autofill {
    ${activeState};
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

const FormError = styled(ErrorMessage)`
  position: absolute;
  padding-top: 0.2rem;
  font-size: 0.75em;
  color: ${ERROR_COLOR};
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 2.2rem;
`;

const InputGroup = props => {
  const { label, children, errorMessages, ...rest } = props;
  return (
    <Container>
      <Input
        {...rest}
        onChange={e => (activeClass = e.target.value ? 'active' : '')}
        className={activeClass}
      />
      <Label htmlFor={props.id}>{label}</Label>
      <FormError model={rest.model} messages={errorMessages} />
    </Container>
  );
};

export default InputGroup;
