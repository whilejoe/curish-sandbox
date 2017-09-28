import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const AvatarImage = styled.img`
  max-width: ${props => (props.small ? '2rem' : '2.5rem')};
  margin-right: 0.5rem;
  vertical-align: middle;
  border: 2px solid transparent;
  border-radius: 50%;
`;

const Link = styled(NavLink)`
  color: currentColor;
  transition: color 100ms ease-out;

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;

    & ${AvatarImage} {
      border-color: ${THEME[PRIMARY_KEY]};
    }
  }
`;

const Avatar = ({ user, small, className }) => {
  if (!user) return null;
  const { userName, profileURL } = user;
  return (
    <Link to="/profile" className={className}>
      {profileURL && (
        <AvatarImage src={profileURL} alt={`${userName} profile photo`} small={small} />
      )}
      {userName && <span>@{userName}</span>}
    </Link>
  );
};

export default Avatar;
