import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';
import TextArea from 'abyss-form/lib/TextArea';
import ErrorMessage from 'abyss-form/lib/ErrorMessage';
import SrOnly from 'components/SrOnly';
import { THEME, PRIMARY_KEY, ERROR_KEY, PALETTE } from 'constants/theme';

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
  font-weight: 600;
  color: ${COLOR};
  cursor: text;
  transition: transform 0.2s ease-out;
  transform-origin: 0% 100%;
  text-align: initial;
  transform: translateY(10px);
  pointer-events: none;
`;

const inputMixin = css`
  background-color: transparent;
  color: ${COLOR};
  border: none;
  border-bottom: 1px solid ${PLACEHOLDER_COLOR};
  border-radius: 0;
  outline: none;
  width: 100%;
  font-size: inherit;
  box-shadow: none;

  &:focus,
  &.active {
    ${activeState};
  }

  &.abyss-form-invalid {
    color: ${ERROR_COLOR};
    border-bottom: 1px solid red;
    box-shadow: 0 1px 0 0 red;
  }

  &:-webkit-autofill {
    ${activeState};
  }

  &::placeholder {
    font-size: inherit;
    color: ${PLACEHOLDER_COLOR};
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

export const InputText = styled(TextInput)`
  ${inputMixin};
  padding: 0;
  height: 2.5rem;

  &:focus,
  &.active,
  &[placeholder] {
    & + ${Label} {
      color: ${ACTIVE_COLOR};
      transform: translateY(-22px) scale(0.9);
      transform-origin: 0 0;
    }
  }

  &.abyss-form-invalid {
    & + ${Label} {
      color: ${ERROR_COLOR};
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
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const InputArea = styled(TextArea)`
  ${inputMixin};
  padding: 0.8rem;
  max-width: 100%;
  min-height: 3.1rem;
  background-color: #f8f8f8;
  border-bottom: 2px solid #f3f3f3;
  border-radius: 2px;
  resize: none !important;
`;

const INPUT_TYPES = {
  text: InputText,
  textArea: InputArea
};

class InputGroup extends Component {
  state = {
    isActive: false
  };

  componentWillMount() {
    if (this.props.hasValue) this.setState({ isActive: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasValue !== this.props.hasValue) {
      this.setState({ isActive: nextProps.hasValue });
    }
  }

  handleOnChange = (e, onChange) => {
    if (e) {
      if (e.target.value && !this.state.isActive) this.setState({ isActive: true });
      else if (!e.target.value && this.state.isActive) this.setState({ isActive: false });
      if (onChange) onChange();
    }
  };

  render() {
    const {
      children,
      inputType = 'text',
      hideLabel,
      label,
      errorMessages,
      hasValue,
      onChange,
      className,
      ...rest
    } = this.props;
    const { isActive } = this.state;
    const Input = INPUT_TYPES[inputType];
    return (
      <Container className={className}>
        <Input
          {...rest}
          onChange={e => this.handleOnChange(e, onChange)}
          className={isActive ? 'active' : ''}
        />
        {hideLabel || inputType !== 'text' ? (
          <SrOnly>
            <label htmlFor={this.props.id}>{label}</label>
          </SrOnly>
        ) : (
          <Label htmlFor={this.props.id}>{label}</Label>
        )}
        {errorMessages && <FormError model={rest.model} messages={errorMessages} />}
      </Container>
    );
  }
}

export default InputGroup;
