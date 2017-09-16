import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AvatarImage = styled.img`
  max-width: ${props => (props.small ? '2rem' : '2.5rem')};
  margin-right: 0.5rem;
  vertical-align: middle;
  border: 2px solid transparent;
  border-radius: 50%;
`;

const Link = styled(NavLink)`
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

export const AvatarLink = ({ user, small }) => {
  if (!user) return null;
  const { userName, profileURL } = user;
  return (
    <Link to="/profile">
      {profileURL && (
        <AvatarImage src={profileURL} alt={`${userName} profile photo`} small={small} />
      )}
      {userName && <AvatarName>@{userName}</AvatarName>}
    </Link>
  );
};

export const Avatar = ({ user, small }) => {
  if (!user) return null;
  const { userName, profileURL } = user;
  return (
    <div>
      {profileURL && (
        <AvatarImage src={profileURL} alt={`${userName} profile photo`} small={small} />
      )}
      {userName && <AvatarName>@{userName}</AvatarName>}
    </div>
  );
};

// export default Avatar;
