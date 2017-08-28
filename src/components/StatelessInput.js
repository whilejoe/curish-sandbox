import styled from 'styled-components';

export const StatelessInput = styled.input`
  margin-bottom: 1.5rem;
  background-color: transparent;
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

export default StatelessInput;
