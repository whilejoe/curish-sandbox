import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
// import { ButtonLink } from 'components/Button';
// import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import { THEME, PRIMARY_KEY } from 'constants/theme';
// import { lighten, darken } from 'polished';
import { lighten } from 'polished';
import media from 'utils/media';

const COLOR = THEME[PRIMARY_KEY];

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

// Temp since Avatar is always returning a link to where this component is located
const ProfileAvatar = styled(Avatar)`
  cursor: default;
  &:hover,
  &:focus,
  &.active {
    color: inherit;
  }
`;

const Attribute = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;

// const HeaderButton = ButtonLink.extend`
//   display: flex;
//   flex: 1 1 0%;
//   align-items: center;
//   justify-content: center;
//   height: 2.3rem;
//   width: 2.3rem;
//   padding: 0;
//   color: ${darken(0.18, COLOR)};
//   border: 2px solid ${darken(0.18, COLOR)};
//   border-radius: 50%;

//   &:hover,
//   &:focus,
//   &:active {
//     background-color: ${darken(0.18, COLOR)};
//     color: white;
//   }
// `;

// const ButtonIcon = styled(Icon)`
//   width: 62%;
//   height: 62%;
// `;

const ProfileHeader = ({ user }) => {
  const joined = user.createdAt ? new Date(user.createdAt).getFullYear() : '';
  return (
    <Header>
      <Container>
        <Flex gutters guttersVertical justify="space-between">
          <FlexContent space={[100, { sm: 'self' }]}>
            <Headline>{user && user.fullName}</Headline>
            <ProfileAvatar user={user} />
          </FlexContent>
          <FlexContent space={[100, { sm: 'self' }]}>
            <Attribute>Since: {joined}</Attribute>
          </FlexContent>
          {/* <Flex space={[100, { sm: 'self' }]} gutters align="center">
            <FlexContent space="self">
              <HeaderButton to="write">
                <ButtonIcon type="story" title="create new story" />
              </HeaderButton>
            </FlexContent>
            <FlexContent space="self">
              <HeaderButton to="/messages">
                <ButtonIcon type="message" title="create new message" />
              </HeaderButton>
            </FlexContent>
          </Flex> */}
        </Flex>
      </Container>
    </Header>
  );
};

export default ProfileHeader;
