import styled, { css } from 'styled-components';
import TextInput from 'abyss-form/lib/TextInput';

const color = 'inherit';
const activeColor = 'SeaGreen';

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font: inherit;
  color: ${color};
  cursor: text;
  transition: transform .2s ease-out;
  transform-origin: 0% 100%;
  text-align: initial;
  transform: translateY(12px);
  pointer-events: none;
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
  margin-bottom: 1rem;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${activeColor};
    box-shadow: 0 1px 0 0 ${activeColor};

    & + ${Label} {
      color: ${activeColor};
      transform: translateY(-20px) scale(0.96);
      transform-origin: 0 0;
    }
  }

  ${props => {
    if (props.value || props.placeholder) {
      return css`
        & + ${Label} {
          color: ${activeColor};
          transform: translateY(-20px) scale(0.96);
          transform-origin: 0 0;
        }
      `;
    }
    return null;
  }}

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

export const InputField = styled.div`
  position: relative;
  margin-top: 1rem;
  color: ${color};
`;

// export default Input;
