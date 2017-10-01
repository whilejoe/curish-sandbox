// TODO: Clean up file
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
// import Link from 'components/Link';
import BackButton from 'components/BackButton';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Icon from 'components/Icon';
import { THEME, PRIMARY_KEY } from 'constants/theme';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: #f7f7f7;
  overflow-y: hidden;
`;

const HeaderLink = styled(NavLink)`
  display: block;
  position: relative;
  padding: 0.8rem;
  font-size: 1.05em;
  text-align: center;
  transform: ${props => (props.showBack ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0%, 0)')};
  opacity: ${props => (props.showBack ? '0' : '1')};
  transition: transform 160ms ease-out, opacity 160ms ease-out, color 180ms ease-out;

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
    transition: opacity 200ms ease-in, transform 200ms ease-in;
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

// const BackLink = styled(Link)`
//   position: absolute;
//   top: 50%;
//   left: 1.2rem;
//   transform: ${props =>
//     props.showBack ? 'translate3d(0%, -50%, 0)' : 'translate3d(-100%, -50%, 0)'};
//   opacity: ${props => (props.showBack ? '1' : '0')};
//   transition: transform 160ms ease-out, opacity 160ms ease-out;
// `;

class SubHeader extends Component {
  state = {
    showBack: false
  };
  componentWillMount() {
    if (this.props.location.state && this.props.location.state.referrer) {
      this.setState({ showBack: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      if (nextProps.location.state && nextProps.location.state.referrer) {
        this.setState({ showBack: true });
      } else this.setState({ showBack: false });
    }
  }

  render() {
    const isUserAuthed = isAuthed();
    const { userResult: { user }, location: { state } } = this.props;
    const { showBack } = this.state;
    if (!isUserAuthed || !user) return null;
    console.log('this.state.showBack', showBack);
    return (
      <Header>
        <Container style={{ position: 'relative' }}>
          <BackButton referrer={state && state.referrer} show={showBack} />
          <Flex align="center" justify="space-around">
            <FlexContent space="self">
              <HeaderLink to="/stories" showBack={showBack}>
                <Icon type="story" title="stories link" />
              </HeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <HeaderLink to="/messages" showBack={showBack}>
                <Icon type="message" title="messages link" />
              </HeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <HeaderLink exact to="/notifications" showBack={showBack}>
                <Icon type="alert" title="notifications link" />
              </HeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <HeaderLink to="/search" showBack={showBack}>
                <Icon type="search" title="link" />
              </HeaderLink>
            </FlexContent>
          </Flex>
        </Container>
      </Header>
    );
  }
}

export default withRouter(SubHeader);
