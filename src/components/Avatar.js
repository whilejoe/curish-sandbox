import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const AvatarImage = styled.img`
  max-width: ${props => (props.small ? '2rem' : '2.5rem')};
  vertical-align: middle;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 180ms ease-out;
`;

const AvatarLink = styled(Link)`
  &:hover,
  &:focus,
  &.active {
    & ${AvatarImage} {
      border-color: ${THEME[PRIMARY_KEY]};
    }
  }
`;

const Avatar = ({ user, showImage = false, to, className }) => {
  if (!user) return null;
  const { userName, profileURL } = user;
  const location = to ? { pathname: `/${userName}`, ...to } : `/${userName}`;
  return (
    <AvatarLink to={location} className={className}>
      {showImage ? (
        profileURL ? (
          <AvatarImage src={profileURL} alt={`${userName} profile photo`} />
        ) : (
          <Icon type="user" title="profile link" />
        )
      ) : (
        <span>@{userName}</span>
      )}
    </AvatarLink>
  );
};

export default Avatar;
