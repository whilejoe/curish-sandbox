import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import { ButtonLink } from 'components/Button';
import { AvatarLink } from 'components/Avatar';
import OmniSearch from 'components/OmniSearch';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #eee;

  ${props => {
    if (props.isAuthed) {
      // return css`
      //   padding-top: 0.6rem;
      //   padding-bottom: 0.6rem;
      // `;
    }
  }};
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

const AuthedLogo = styled(NavLink)`
  display: block;
  font-size: 1.6rem;
  line-height: 1;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  span {
    font-size: 0.7em;
  }
`;

const AppHeader = ({ userResult: { loading, user } }) => {
  const isUserAuthed = isAuthed();
  console.log('isUserAuthed', isUserAuthed);
  return (
    <Header isAuthed={isUserAuthed}>
      <Container>
        {!isUserAuthed ? (
          <Flex gutters guttersVertical align="center">
            <FlexContent space="self">
              <HeaderLink exact to="/">
                Curish
              </HeaderLink>
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
            <FlexContent space="self">
              <AuthedLogo exact to="/">
                C<span>urish</span>
              </AuthedLogo>
            </FlexContent>
            <FlexContent space={{ sm: 60, md: 40, lg: 30 }}>
              <OmniSearch />
            </FlexContent>
            <FlexContent space="self">
              {isUserAuthed && !loading && <AvatarLink user={user} />}
            </FlexContent>
          </Flex>
        )}
      </Container>
    </Header>
  );
};

export default AppHeader;
