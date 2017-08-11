import styled from 'styled-components';
import ErrorMessage from 'abyss-form/lib/ErrorMessage';

const FormError = styled(ErrorMessage)`
  position: absolute;
  padding-top: .2rem;
  font-size: .75em;
  color: red;
`;

export default FormError;
