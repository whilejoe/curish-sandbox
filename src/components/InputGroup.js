// TODO: Separate components
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';
import TextArea from 'abyss-form/lib/TextArea';
import SelectList from 'abyss-form/lib/SelectList';
import Checkbox from 'abyss-form/lib/Checkbox';
import 'abyss-form/lib/SelectList/SelectList.css';
import 'abyss-form/lib/Checkbox/Checkbox.css';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { Flex, FlexContent } from 'components/Flex';
import ErrorMessage from 'abyss-form/lib/ErrorMessage';
import SrOnly from 'components/SrOnly';
import { THEME, SECONDARY_KEY, ERROR_KEY } from 'constants/theme';

const COLOR = 'inherit';
const ACTIVE_COLOR = THEME[SECONDARY_KEY];
const ERROR_COLOR = THEME[ERROR_KEY];

const activeState = css`
  outline: none;
  border-top-color: #f5f5f5;
  border-right-color: #f5f5f5;
  border-left-color: #f5f5f5;
`;

const inputMixin = css`
  padding: 0.5rem 0.6rem;
  background-color: transparent;
  color: ${COLOR};
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 2px solid ${ACTIVE_COLOR};
  border-radius: 3px;
  outline: none;
  width: 100%;
  font-size: 1em;
  font-family: inherit;
  line-height: inherit;

  &:focus,
  &.active {
    ${activeState};
  }

  &.abyss-form-invalid {
    color: ${ERROR_COLOR};
    border-bottom-color: ${ERROR_COLOR};
  }

  &:-webkit-autofill {
    ${activeState};
  }

  &::placeholder {
    color: #bbb;
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

const FlexLabelGroup = styled(Flex)`
  padding-bottom: ${props => (props.hideLabel ? 0 : 0.5)}rem;
`;

export const Label = styled.label`
  font-size: ${props => (props.labelLarge ? 1.05 : 0.95)}em;
  color: inherit;
`;

export const FormError = styled(ErrorMessage)`
  font-size: 0.75em;
  color: ${ERROR_COLOR};
`;

export const Container = styled.div`
  padding-bottom: 1.4rem;
`;

export const InputText = styled(TextInput)`
  position: relative;

  & input {
    ${inputMixin};
  }

  & .abyss-textinput__clear {
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    padding: 1rem;
    font-size: 1.45em;
    color: #666;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      color: ${ACTIVE_COLOR};
    }
  }
`;

export const InputArea = styled(TextArea)`
  ${inputMixin};
  max-width: 100%;
  min-height: 3.1rem;
  padding: 0.8rem;
  resize: none !important;
`;

export const InputSelect = styled(SelectList)`
  border-color: transparent;
  border-bottom-color: ${ACTIVE_COLOR};
  border-radius: 2px;

  & .Select-control {
    ${inputMixin};
    padding: 0.5rem !important;
  }

  &.is-focused {
    ${activeState};
  }

  &.isOpen {
    & .Select-control {
      border-color: inherit;
    }
  }

  & .Select-placeholder {
    padding: 0 0.6rem !important;
    line-height: 2.5rem !important;
  }

  &.Select--multi {
    & .Select-value {
      background-color: ${ACTIVE_COLOR};
      border-radius: 2px;
      color: white;
      padding: 0.1rem 0.35rem !important;
    }
  }
`;

// export const InputCheckbox = styled(Checkbox)`
//   position: relative;
// `;

const InputCounter = styled.div`
  position: relative;

  &:after {
    position: absolute;
    content: '';
    height: 3px;
    width: ${props => props.currentCount / props.countMax * 100}%;
    max-width: 100%;
    background-color: ${props =>
      props.currentCount > props.countMax ? THEME[ERROR_KEY] : 'royalBlue'};
    bottom: 6px;
    left: 0;
    border-radius: 2px;
    transition: width 200ms ease-out;
  }
`;

const INPUT_TYPES = {
  text: InputText,
  textArea: InputArea,
  select: InputSelect,
  checkbox: Checkbox
};

class InputGroup extends Component {
  render() {
    const {
      inputType = 'text',
      hideLabel,
      label,
      errorMessages,
      currentCount,
      countMax,
      className,
      labelLarge,
      ...rest
    } = this.props;
    const Input = INPUT_TYPES[inputType];
    return (
      <Container className={className}>
        <FlexLabelGroup gutters align="center" justify="space-between" hideLabel={hideLabel}>
          {hideLabel ? (
            <SrOnly>
              <label htmlFor={this.props.id}>{label}</label>
            </SrOnly>
          ) : (
            <FlexContent space="self">
              <Label htmlFor={this.props.id} labelLarge={labelLarge}>
                {label}
              </Label>
            </FlexContent>
          )}
          {errorMessages && (
            <FlexContent space="self">
              <FormError model={rest.model} messages={errorMessages} />
            </FlexContent>
          )}
        </FlexLabelGroup>
        {currentCount !== undefined ? (
          <InputCounter currentCount={currentCount} countMax={countMax}>
            <Input {...rest} />
          </InputCounter>
        ) : (
          <Input {...rest} label={inputType === 'checkbox' ? label : null} />
        )}
      </Container>
    );
  }
}

export default InputGroup;
