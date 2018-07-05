import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import { THEME, PRIMARY_KEY, PALETTE } from 'constants/theme';

export const TagsContainer = styled.div`
  margin: -0.2rem;
`;

export const Tag = styled.span`
  display: inline-block;
  margin: 0.2rem;
  padding: 0.1rem 0.35rem;
  font-size: 0.65em;
  line-height: 1.27;
  background-color: ${props => (props.matches ? PALETTE.SEARCH : '#eee')};
  color: ${props => (props.matches ? 'white' : 'inherit')};
  font-weight: 400;
  border-radius: 2px;

  a & {
    &:hover,
    &:focus {
      background-color: ${THEME[PRIMARY_KEY]};
      color: white;
    }
  }
`;

const TagLink = ({ matches, tagName, referrer, ...props }) => {
  return (
    <Link to={{ pathname: `/tags/${tagName}`, state: { referrer } }}>
      <Tag {...props} matches={matches}>
        {tagName}
      </Tag>
    </Link>
  );
};

export default TagLink;
