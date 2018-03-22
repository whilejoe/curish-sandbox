import styled from 'styled-components';
import { PALETTE } from 'constants/theme';

const Card = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid ${PALETTE.HEADER};
  border-top-color: inherit;
  border-radius: 2px;
`;

export default Card;
