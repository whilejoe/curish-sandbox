import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { rgba } from 'polished';
import { PALETTE } from 'constants/theme';

const cardMixin = css`
  margin-bottom: 1.2rem;
  padding: 0.9rem 0.8rem 0.75rem;
  background-color: ${PALETTE.HEADER};
  border: 1px solid ${PALETTE.GRAY.MEDIUM};
  border-top-color: inherit;
  border-radius: 3px;
`;

const Card = styled.div`
  ${cardMixin};
`;

export const LinkCard = styled(Link)`
  display: block;
  ${cardMixin};
  line-height: inherit;
  font-weight: inherit;
  transition-property: box-shadow, border-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;

  &:hover,
  &:focus {
    text-decoration: none;
    border-color: inherit;
    box-shadow: 0px 5px 13px 0px ${rgba('black', 0.15)};
  }
`;

export default Card;
