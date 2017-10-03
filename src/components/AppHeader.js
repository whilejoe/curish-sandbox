import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import Avatar from 'components/Avatar';
// import Icon from 'components/Icon';
// import { THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const HeaderLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  padding: 1.8rem 0.8rem;

  &:not(:last-child) {
    margin-right: 0.9rem;
  }

  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 150ms ease, transform 150ms ease;
  }

  &:hover,
  &:focus,
  &.active {
    text-decoration: none;

    &:after {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  display: inline-block;
  vertical-align: middle;
`;

const Brand = styled(NavLink)`
  display: block;
  padding: 1.25rem 0;
  font-family: 'Merriweather', serif;
  font-size: 1.15em;
  line-height: 1;

  &:hover,
  &:focus {
    text-decoration: none;
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
          <Flex gutters guttersVertical align="center">
            <FlexContent space="self">
              <Brand exact to="/">
                Curish
              </Brand>
            </FlexContent>
            <FlexContent offset={{ md: 4 }}>
              <nav>
                <HeaderLink to="/101">101</HeaderLink>
                <HeaderLink to="/search">Search</HeaderLink>
              </nav>
            </FlexContent>
            <FlexContent space="self">
              <ButtonLink to="/login">Login</ButtonLink>
            </FlexContent>
          </Flex>
        ) : (
          <Flex gutters guttersVertical align="center" justify="space-between">
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
