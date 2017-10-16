import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';
import TextArea from 'abyss-form/lib/TextArea';
import SelectList from 'abyss-form/lib/SelectList';
import 'abyss-form/lib/SelectList/SelectList.css';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { Flex, FlexContent } from 'components/Flex';
import ErrorMessage from 'abyss-form/lib/ErrorMessage';
import SrOnly from 'components/SrOnly';
import { THEME, TERTIARY_KEY, SECONDARY_KEY, ERROR_KEY, PALETTE } from 'constants/theme';

const COLOR = 'inherit';
const ACTIVE_COLOR = THEME[TERTIARY_KEY];
const ERROR_COLOR = THEME[ERROR_KEY];

const activeState = css`
  outline: none;
  border-bottom-color: ${ACTIVE_COLOR};
`;

const inputMixin = css`
  padding: 0.5rem 0.6rem;
  color: ${COLOR};
  background-color: ${PALETTE.GRAY.LIGHT};
  border-top: none;
  border-right: none;
  border-bottom: 2px solid ${PALETTE.GRAY.MEDIUM};
  border-left: none;
  border-radius: 3px;
  outline: none;
  width: 100%;
  font-size: 1.05em;
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
    font-size: 1em;
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

const FlexLabelGroup = styled(Flex)`
  padding-bottom: ${props => (props.labelLarge ? 0.9 : 0.5)}rem;
`;

export const Label = styled.label`
  font-size: ${props => (props.labelLarge ? 1.05 : 0.95)}em;
  color: inherit;
`;

const FormError = styled(ErrorMessage)`
  font-size: 0.75em;
  color: ${ERROR_COLOR};
`;

const Container = styled.div`
  padding-bottom: 1.4rem;
`;

export const InputText = styled(TextInput)`
  & input {
    ${inputMixin};
  }
`;

export const InputArea = styled(TextArea)`
  ${inputMixin};
  max-width: 100%;
  min-height: 3.1rem;
  padding: 0.8rem;
  resize: none !important;
`;

export const SelectInput = styled(SelectList)`
  border-bottom-color: ${PALETTE.GRAY.MEDIUM};
  border-radius: 3px;

  & .Select-control {
    ${inputMixin};
    padding: 0.5rem 0.6rem !important;
    height: 2.5rem;
  }

  &.is-focused {
    ${activeState};
  }

  &.isOpen {
    & .Select-control {
      background: #f8f8f8;
      border-color: inherit;
    }
  }

  & .Select-placeholder {
    padding: 0 0.6rem !important;
    line-height: 2.5rem !important;
  }

  &.Select--multi {
    & .Select-value {
      background-color: ${THEME[SECONDARY_KEY]};
      border-radius: 2px;
      color: white;
      padding: 0.1rem 0.35rem !important;
      font-size: 0.82em;
      line-height: normal !important;
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
      props.currentCount > props.countMax ? THEME[ERROR_KEY] : THEME[SECONDARY_KEY]};
    bottom: 6px;
    left: 0;
    border-radius: 2px;
    transition: width 200ms ease-out;
  }
`;

const INPUT_TYPES = {
  text: InputText,
  textArea: InputArea,
  select: SelectInput
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
        <FlexLabelGroup gutters align="center" justify="space-between" labelLarge={labelLarge}>
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
          <Input {...rest} />
        )}
      </Container>
    );
  }
}

export default InputGroup;
