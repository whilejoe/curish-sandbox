import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';

const ProfileImage = styled.img`
  margin-right: ${props => (!props.imageOnly ? '.35rem' : 0)};
  max-width: ${props => (props.small ? '2rem' : '2.5rem')};
  vertical-align: middle;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 180ms ease-out;
`;

const ProfileIcon = styled(Icon)`
  margin-right: ${props => (!props.imageOnly ? '.2rem' : 0)};
`;

// TODO: Decide if this should use Link or NavLink
const AvatarLink = styled(Link)`
  &:hover,
  &:focus,
  &.active {
    & ${ProfileImage}, & ${ProfileIcon} {
      border-color: ${THEME[PRIMARY_KEY]};
    }
  }
`;

const Image = ({ user: { profileURL = '', userName = '' }, small = false, imageOnly }) => {
  return profileURL ? (
    <ProfileImage
      src={profileURL}
      alt={`${userName}'s profile photo`}
      small={small}
      imageOnly={imageOnly}
    />
  ) : (
    <ProfileIcon type="user" title={`${userName}'s profile photo`} imageOnly={imageOnly} />
  );
};

const AvatarImage = ({ user, imageOnly }) => {
  return imageOnly ? (
    <Image user={user} imageOnly={imageOnly} />
  ) : (
    [
      <Image key="image" user={user} imageOnly={imageOnly} />,
      <span key="userName">@{user.userName}</span>
    ]
  );
};

const Avatar = ({ user, imageOnly = false, to = '', className }) => {
  if (!user) return null;

  return to ? (
    <AvatarLink to={{ pathname: `/${user.userName}`, ...to }} className={className}>
      <AvatarImage user={user} imageOnly={imageOnly} />
    </AvatarLink>
  ) : (
    <AvatarImage user={user} imageOnly={imageOnly} />
  );
};

export default Avatar;
