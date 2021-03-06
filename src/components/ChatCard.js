import styled from 'styled-components';
import { PALETTE } from 'constants/theme';

const ChatCard = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid ${PALETTE.HEADER};
  border-radius: 4px;
  box-shadow: 0px 2px 15px -3px rgba(0, 0, 0, 0.1);
`;

export default ChatCard;
