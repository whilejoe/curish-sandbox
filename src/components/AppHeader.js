import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import Avatar from 'components/Avatar';
import { PALETTE, THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: ${PALETTE.HEADER};
  border-bottom: 1px solid;
`;

const HeaderLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  padding: 1.15rem 1rem;
  line-height: 1;

  &:after {
    position: absolute;
    content: '';
    bottom: -1px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 150ms ease;
  }

  &:hover,
  &:focus,
  &.active {
    text-decoration: none;

    &:after {
      opacity: 1;
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  display: inline-block;
  vertical-align: middle;
  font-size: 0.95em;
  line-height: 1;
`;

const Brand = styled(NavLink)`
  display: inline-block;
  padding-top: 0.95rem;
  padding-bottom: 0.85rem;
  font-family: 'Merriweather', serif;
  font-size: 1.08em;
  font-style: italic;
  font-weight: 700;
  line-height: 1;

  &.active {
    text-decoration: underline;
  }
`;

const LoginButton = ButtonLink.extend`
  color: currentColor;

  &:hover,
  &:focus,
  &.active {
    background-color: ${THEME[PRIMARY_KEY]};
  }
`;

const AppHeader = ({ userResult: { loading, user } }) => {
  const isUserAuthed = isAuthed();
  return (
    <Header>
      <Container size="lg">
        {!isUserAuthed ? (
          <Flex gutters align="center">
            <FlexContent space="self">
              <Brand exact to="/">
                Curish
              </Brand>
            </FlexContent>
            <FlexContent offset={{ md: 4 }}>
              <HeaderLink to="/101">101</HeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <LoginButton to="/login">Login</LoginButton>
            </FlexContent>
          </Flex>
        ) : (
          <Flex gutters align="center" justify="space-between">
            <FlexContent>
              <Brand exact to="/">
                Curish
              </Brand>
            </FlexContent>
            <FlexContent space="self">
              {isUserAuthed &&
                !loading && <HeaderAvatar user={user} to={{ pathname: '/profile' }} imageOnly />}
            </FlexContent>
          </Flex>
        )}
      </Container>
    </Header>
  );
};

export default AppHeader;
