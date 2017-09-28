import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: white;
  margin-top: -1px;
  border-bottom: 1px solid #eee;
`;

const HeaderNav = styled.div`
  margin-right: -1.2rem;
  margin-left: -1.2rem;
`;

const HeaderLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  padding: 0.4rem 1.2rem 1rem;

  &:hover,
  &:focus,
  &.active {
    color: ${THEME[PRIMARY_KEY]};
    text-decoration: none;
  }
`;

const SubHeader = ({ userResult: { user } }) => {
  const isUserAuthed = isAuthed();
  if (!isUserAuthed || !user) return null;
  return (
    <Header>
      <Container>
        <Flex align="center" justify={['center', { sm: 'flex-start' }]}>
          <FlexContent space="self">
            <HeaderNav>
              <HeaderLink exact to="/">
                <Icon type="home" title="home link" />
              </HeaderLink>
              <HeaderLink to="/stories">
                <Icon type="story" title="stories link" />
              </HeaderLink>
              <HeaderLink to="/profile">
                <Icon type="message" title="messages link" />
              </HeaderLink>
            </HeaderNav>
          </FlexContent>
        </Flex>
      </Container>
    </Header>
  );
};

export default SubHeader;
