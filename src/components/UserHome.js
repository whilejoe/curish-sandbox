import React from 'react';
import styled from 'styled-components';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import Icon from 'components/Icon';
import { AvatarLink } from 'components/Avatar';
// import { THEME } from 'constants/theme';
import { lighten, darken } from 'polished';

const COLOR = 'DarkCyan';

const Header = styled.div`
  padding-top: 3vh;
  padding-bottom: 3vh;
  margin-top: -1px;
  margin-bottom: 3vh;
  background-image: linear-gradient(to right, ${COLOR} 30%, ${lighten(0.1, COLOR)} 100%);
  border-top: 1px solid ${darken(0.05, COLOR)};
  border-bottom: 1px solid ${darken(0.05, COLOR)};
  color: white;
`;

const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.45em;
  color: inherit;
`;

const HeaderButton = ButtonLink.extend`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
  width: 2.2rem;
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
`;

const HeaderAvatar = styled(AvatarLink)`
  color: white;

  &:hover,
  &:focus {
    color: ${darken(0.18, COLOR)};
  }
`;

const Name = styled.span`display: inline-block;`;

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
              <Headline>
                Hello, <Name>{user.fullName}</Name>
              </Headline>
              <HeaderAvatar user={user} />
            </FlexContent>
            <Flex space={[100, { sm: 'self' }]} gutters align="center">
              <FlexContent space="self">
                <HeaderButton to="write">
                  <Icon type="newStory" title="create new story" />
                </HeaderButton>
              </FlexContent>
              <FlexContent space="self">
                <HeaderButton to="/messages">
                  <Icon type="newMessage" title="create new message" />
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
