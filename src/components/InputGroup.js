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
import { rgba, darken } from 'polished';

const COLOR = 'inherit';
const ACTIVE_COLOR = THEME[SECONDARY_KEY];
const ERROR_COLOR = THEME[ERROR_KEY];

const activeState = css`
  outline: none;
  box-shadow: 0px 2px 15px -3px ${rgba(ACTIVE_COLOR, 0.5)} !important;
`;

const inputMixin = css`
  padding: 0.4rem 0.6rem;
  background-color: white;
  color: ${COLOR};
  border: 1px solid #eaeaea;
  border-bottom: 2px solid ${ACTIVE_COLOR};
  border-radius: 2px;
  box-shadow: 0px 2px 15px -3px rgba(0, 0, 0, 0.1);
  outline: none;
  width: 100%;
  font-size: 1em;
  font-family: inherit;
  line-height: inherit;

  .abyss-form--focused&,
  &.abyss-form--focused {
    ${activeState};

    &.abyss-form--invalid {
      box-shadow: 0px 2px 15px -3px ${rgba(ERROR_COLOR, 0.5)} !important;
    }
  }

  .abyss-form--invalid& {
    color: ${ERROR_COLOR};
    border-bottom-color: ${ERROR_COLOR} !important;

    .abyss-form--focused& {
      box-shadow: 0px 2px 15px -3px ${rgba(ERROR_COLOR, 0.5)} !important;
    }
  }

  &:-webkit-autofill {
    ${activeState};
  }

  &::placeholder {
    color: #bbb;
    font-size: 0.95em;
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
  display: block;
  margin-bottom: 0.2em;
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
  display: block;
  max-width: 100%;
  min-height: 3.1rem;
  padding: 0.8rem;
  resize: none !important;
`;

export const InputSelect = styled(SelectList)`
  border-color: #eaeaea;
  border-bottom-color: ${ACTIVE_COLOR};
  border-radius: 2px;

  & .Select-control {
    ${inputMixin};
    height: 2.5rem !important;
    padding: 0 !important;
    line-height: 2.38rem !important;
  }

  &.isOpen {
    & .Select-control {
      border-color: inherit;
    }
  }

  & .Select-placeholder {
    left: 0.18rem;
    padding: 0 0 0 0.4rem !important;
    color: #bbb !important;
    font-size: 0.95em;
  }

  &.Select--multi {
    & .Select-value {
      margin: -0.15rem 0 0 0.4rem;
      padding: 0 !important;
      background-color: ${ACTIVE_COLOR};
      color: white;
      line-height: 1.3 !important;
      vertical-align: middle;
      border: none;
    }
  }

  & .Select--multi,
  & .Select-multi-value-wrapper {
    height: 100%;
  }

  &.Select--multi .Select-value-icon {
    border-right: 1px solid ${darken(0.02, ACTIVE_COLOR)};
    padding: 0 8px;
    font-size: 1.3em;
  }

  &.Select--multi .Select-value-label {
    padding: 4px 8px;
    font-weight: 600;
    font-size: 0.9em;
  }

  &.Select--multi .Select-clear-zone {
    line-height: 0;
  }

  & .Select-clear {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    font-size: 1.45em;
    color: #666;

    &:hover {
      color: ${ERROR_COLOR};
    }
  }
`;

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
    bottom: 0px;
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
