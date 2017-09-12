import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Button from 'components/Button';
// import store from 'state/store';
// import { push } from 'react-router-redux';
import { getIdToken, logout } from 'utils/AuthService';

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

const ButtonLink = Button.withComponent(NavLink);

const TutsAppHeader = () => {
  const isAuthed = getIdToken();
  return (
    <Header>
      <Container>
        <Flex gutters align="center">
          <FlexContent space="self">
            <NavLink exact to="/">
              Curish
            </NavLink>
          </FlexContent>
          <FlexContent offset={{ md: 4 }}>
            <nav>
              <HeaderLink to="/101">101</HeaderLink>
              <HeaderLink to="/search">Search</HeaderLink>
            </nav>
          </FlexContent>
          <FlexContent space="self">
            {isAuthed ? (
              <Button theme="tertiary" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <ButtonLink to="/login">Login</ButtonLink>
            )}
          </FlexContent>
        </Flex>
      </Container>
    </Header>
  );
};

export default TutsAppHeader;
