import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
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

const renderInner = ({ user: { userName, profileURL }, showImage }) => {
  if (showImage) {
    if (profileURL) return <AvatarImage src={profileURL} alt={`${userName} profile photo`} />;
    return <Icon type="user" title="profile link" />;
  }
  return <span>@{userName}</span>;
};

const Avatar = ({ user, showImage = false, to = '', className }) => {
  if (!user) return null;

  return to ? (
    <AvatarLink to={{ pathname: `/${user.userName}`, ...to }} className={className}>
      {renderInner({ user, showImage })}
    </AvatarLink>
  ) : (
    <div className={className}>{renderInner({ user, showImage })}</div>
  );
};

export default Avatar;
