import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import { THEME, PRIMARY_KEY, SECONDARY_KEY } from 'constants/theme';

export const TagsContainer = styled.div`
  margin: -0.2rem;
`;

export const Tag = styled.span`
  display: inline-block;
  margin: 0.2rem;
  padding: 0.1rem 0.35rem;
  font-size: 0.75em;
  line-height: 1.3;
  background-color: ${props => (props.matches ? THEME[SECONDARY_KEY] : '#eee')};
  color: ${props => (props.matches ? 'white' : 'inherit')};
  font-weight: 600;
  vertical-align: text-bottom;
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
