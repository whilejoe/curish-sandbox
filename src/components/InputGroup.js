import React from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';
import FormError from 'components/FormError';

const color = 'inherit';
const activeColor = 'SeaGreen';

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font-size: inherit;
  color: ${color};
  cursor: text;
  transition: transform .2s ease-out;
  transform-origin: 0% 100%;
  text-align: initial;
  transform: translateY(10px);
  pointer-events: none;
`;

const activeState = css`
  outline: none;
  border-bottom: 1px solid ${activeColor};
  box-shadow: 0 1px 0 0 ${activeColor};

  & + ${Label} {
    color: ${activeColor};
    transform: translateY(-14px) scale(0.8);
    transform-origin: 0 0;
  }
`;

export const Input = styled(TextInput)`
  background-color: transparent;
  color: ${color};
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  outline: none;
  height: 2.5rem;
  width: 100%;
  font-size: inherit;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;

  &:focus,
  &[placeholder],
  &.active {
    ${activeState}
  }

  &:-webkit-autofill {
    ${activeState}
  }

  &.abyss-form-invalid {
    color: red;
    border-bottom: 1px solid red;
    box-shadow: 0 1px 0 0 red;

    & + ${Label} {
      color: red;
    }
  }

  &::placeholder {
    font-size: inherit;
    color: #ccc;
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

export const Container = styled.div`
  position: relative;
  margin-bottom: 2.2rem;
`;

const InputGroup = props => {
  const { label, children, errorMessages, hasValue, ...rest } = props;
  const activeClass = hasValue ? 'active' : '';
  return (
    <Container>
      <Input {...rest} className={activeClass} />
      <Label htmlFor={props.id}>
        {label}
      </Label>
      <FormError model={rest.model} messages={errorMessages} />
    </Container>
  );
};

export default InputGroup;
