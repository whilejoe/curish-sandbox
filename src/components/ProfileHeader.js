import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Avatar from 'components/Avatar';
import Container from 'components/Container';
import { THEME, SECONDARY_KEY } from 'constants/theme';
import { lighten } from 'polished';
import media from 'utils/media';
import { getMonthYear } from 'utils/date';

const COLOR = THEME[SECONDARY_KEY];

const Header = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.6rem;
  margin-bottom: 1.5rem;
  background-color: ${COLOR};
  color: ${lighten(0.71, COLOR)};

  ${media.sm`
    padding-top: 1.7rem;
    padding-bottom: 1.7rem;
  `};
`;

const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.6em;
  color: inherit;
`;

const Attribute = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;

const ProfileHeader = ({ user }) => {
  const { fullName = '', createdAt = '' } = user;
  return (
    <Header>
      <Container>
        <Flex gutters guttersVertical justify="space-between">
          <FlexContent space={[100, { sm: 'self' }]}>
            <Headline>{fullName}</Headline>
            <Avatar user={user} />
          </FlexContent>
          <FlexContent space={[100, { sm: 'self' }]}>
            <Attribute>Joined: {getMonthYear(createdAt)}</Attribute>
          </FlexContent>
        </Flex>
      </Container>
    </Header>
  );
};

export default ProfileHeader;
