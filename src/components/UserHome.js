import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import Icon from 'components/Icon';
// import { AvatarLink } from 'components/Avatar';
// import { THEME } from 'constants/theme';
import { lighten, darken } from 'polished';
import { media } from 'utils/media';

const COLOR = 'DarkCyan';

const Header = styled.div`
  padding-top: 4vw;
  padding-bottom: 4vw;
  margin-bottom: 3vh;
  background-image: linear-gradient(to bottom, ${COLOR} 20%, ${lighten(0.1, COLOR)} 100%);
  border-top: 1px solid ${darken(0.05, COLOR)};
  border-bottom: 1px solid ${darken(0.05, COLOR)};
  color: ${lighten(0.71, COLOR)};

  ${media.sm`
    padding-top: 3vw;
    padding-bottom: 3vw;
    background-image: linear-gradient(to right, ${COLOR} 30%, ${lighten(0.1, COLOR)} 100%);
  `};

  ${media.lg`
    padding-top: 2vw;
    padding-bottom: 2vw;
  `};
`;

const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.28em;
  line-height: 1.2;
  color: inherit;

  ${media.sm`font-size: 1.4em;`};
`;

const HeaderButton = ButtonLink.extend`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  padding: 0;
  color: ${darken(0.18, COLOR)};
  border-color: ${darken(0.18, COLOR)};
  border-radius: 50%;

  &:hover,
  &:focus,
  &:active {
    background-color: ${darken(0.18, COLOR)};
    color: white;
  }

  ${media.md`
    height: 2.2rem;
    width: 2.2rem;
  `};
`;

const ButtonIcon = styled(Icon)`
  width: 62%;
  height: 62%;
`;

// const HeaderAvatar = styled(AvatarLink)`
//   color: white;

//   &:hover,
//   &:focus {
//     color: ${darken(0.18, COLOR)};
//   }
// `;
// <HeaderAvatar user={user} />

const UserHome = ({ userResult }) => {
  if (userResult.loading) return <Container>Loading....</Container>;
  // add logic to redirect when user doesn't exist.
  console.log('userResult', userResult);
  const { user } = userResult;
  return (
    <div>
      <Header>
        <Container>
          <Flex gutters guttersVertical align="center" justify="space-between">
            <FlexContent space={[100, { sm: 'self' }]}>
              <Headline>Hello, {user.fullName}</Headline>
            </FlexContent>
            <Flex space={[100, { sm: 'self' }]} gutters align="center">
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
            </Flex>
          </Flex>
        </Container>
      </Header>
      <Container>
        <Flex gutters guttersVertical>
          <FlexContent space={[100, { sm: 45, md: 40, lg: 30 }]}>placeholder</FlexContent>
        </Flex>
      </Container>
    </div>
  );
};

export default UserHome;
