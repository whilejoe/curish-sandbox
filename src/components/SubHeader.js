import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`background-color: #f7f7f7;`;

// const HeaderNav = styled.div`
//   margin-right: -1.2rem;
//   margin-left: -1.2rem;
// `;

const HeaderLink = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0.8rem;
  font-size: 1.05em;
  text-align: center;

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
    transition: opacity 150ms ease, transform 150ms ease, color 150ms ease;
  }

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;

    &:after {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const SubHeader = ({ userResult: { user } }) => {
  const isUserAuthed = isAuthed();
  if (!isUserAuthed || !user) return null;
  return (
    <Header>
      <Container>
        <Flex align="center" justify="space-around">
          <FlexContent space="self">
            <HeaderLink to="/stories">
              <Icon type="story" title="stories link" />
            </HeaderLink>
          </FlexContent>
          <FlexContent space="self">
            <HeaderLink to="/search">
              <Icon type="search" title="link" />
            </HeaderLink>
          </FlexContent>
          <FlexContent space="self">
            <HeaderLink to="/messages">
              <Icon type="message" title="messages link" />
            </HeaderLink>
          </FlexContent>
          <FlexContent space="self">
            <HeaderLink exact to="/notifications">
              <Icon type="alert" title="notififcations link" />
            </HeaderLink>
          </FlexContent>
        </Flex>
      </Container>
    </Header>
  );
};

export default SubHeader;
