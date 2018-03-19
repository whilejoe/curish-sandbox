import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Avatar from 'components/Avatar';
import { getMonthYear } from 'utils/date';

const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
`;

const Attribute = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;

const ProfileHeader = ({ user }) => {
  const { fullName = '', createdAt = '' } = user;
  return (
    <Flex gutters guttersVertical justify="space-between">
      <FlexContent space={[100, { sm: 'self' }]}>
        <Headline>{fullName}</Headline>
        <Avatar user={user} />
      </FlexContent>
      <FlexContent space={[100, { sm: 'self' }]}>
        <Attribute>Joined: {getMonthYear(createdAt)}</Attribute>
      </FlexContent>
    </Flex>
  );
};

export default ProfileHeader;
