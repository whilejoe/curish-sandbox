import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Avatar from 'components/Avatar';

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const HeaderLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  padding: 1.8rem .8rem;

  &:not(:last-child) {
    margin-right: .9rem;
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

const AppHeader = ({ user }) => {
  const { isAuthed, userName, photoURL } = user;
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
              <HeaderLink to="/create-story">Create Story</HeaderLink>
              <HeaderLink to="/stories">Stories</HeaderLink>
            </nav>
          </FlexContent>
          <FlexContent space="self">
            {isAuthed
              ? <Avatar src={photoURL} alt="user-profile-header-link" name={userName} small />
              : <HeaderLink to="/authenticate">Login</HeaderLink>}
          </FlexContent>
        </Flex>
      </Container>
    </Header>
  );
};

export default AppHeader;
