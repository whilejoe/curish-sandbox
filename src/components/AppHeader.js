import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import Avatar from 'components/Avatar';
// import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: #f8f8f8;
  border-bottom: 1px solid #f3f3f3;
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

// const IconLink = styled(NavLink)`
//   display: inline-block;
//   line-height: 1;
//   vertical-align: middle;
// `;

const HeaderAvatar = styled(Avatar)`
  display: inline-block;
  vertical-align: middle;
  line-height: 1;

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
  }
`;

const Brand = styled(NavLink)`
  display: inline-block;
  padding-top: 1.15rem;
  padding-bottom: 1.05rem;
  font-family: 'Merriweather', serif;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const LoginButton = ButtonLink.extend`
  color: currentColor;

  &:hover,
  &:focus,
  &.active {
    background-color: white;
    color: ${THEME[PRIMARY_KEY]};
  }
`;

// const SearchButton = styled(NavLink)`
//   display: block;
//   transition: color 200ms ease-out;

//   &:hover,
//   &:focus,
//   &.active {
//     color: ${THEME[PRIMARY_KEY]};
//     text-decoration: none;
//   }
// `;

const AppHeader = ({ userResult: { loading, user } }) => {
  const isUserAuthed = isAuthed();
  return (
    <Header>
      <Container>
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
                !loading && <HeaderAvatar user={user} showImage to={{ pathname: '/profile' }} />}
            </FlexContent>
          </Flex>
        )}
      </Container>
    </Header>
  );
};

export default AppHeader;
