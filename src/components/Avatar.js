import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AvatarImage = styled.img`
  max-width: ${props => (props.small ? '2rem' : '2.5rem')};
  margin-right: .5rem;
  vertical-align: middle;
  border: 2px solid transparent;
  border-radius: 50%;
`;

const AvatarLink = styled(NavLink)`

  &:hover,
  &:focus,
  &.active {
    color: Tomato;
    text-decoration: none;

    & ${AvatarImage} {
      border-color: Tomato;
    }
  }
`;

const AvatarName = styled.span`vertical-align: middle;`;

const Avatar = props => {
  const { src, alt, small, name, className } = props;
  return (
    <AvatarLink to="/profile" className={className}>
      {src && alt && <AvatarImage src={src} alt={alt} small={small} />}
      {name &&
        <AvatarName>
          @{name}
        </AvatarName>}
    </AvatarLink>
  );
};

export default Avatar;
