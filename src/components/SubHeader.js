// TODO: Make transitioning smarter
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Headroom from 'react-headroom';
import BackButton from 'components/BackButton';
import NavIconLink from 'components/NavIconLink';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Transition, { ENTERING, ENTERED, EXITING, EXITED } from 'react-transition-group/Transition';
import { isAuthed } from 'utils/AuthService';
import { PALETTE } from 'constants/theme';
import { SUBNAV_PORTAL_ID } from 'constants/portals';

const DURATION = 160;

const SHOW_ON_ROUTES = {
  '/': true,
  '/stories': true,
  '/messages': true,
  '/notifications': true,
  '/search': true,
  '/profile': true
};

const STYLE = {
  position: 'absolute',
  right: 0,
  left: 0
};

const STATES = {
  [ENTERING]: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
  [ENTERED]: { opacity: 1, transform: 'translate3d(0, 0%, 0)' },
  [EXITING]: { opacity: 0, transform: 'translate3d(0, 70%, 0)' },
  [EXITED]: { opacity: 0, transform: 'translate3d(0, 70%, 0)' }
};

const Header = styled.div`
  height: 50px;
  background-color: ${PALETTE.BODY};
  border-bottom: 1px solid #eaeaea;
  overflow: hidden;
`;

const NavTransitioner = styled(Flex)`
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition: ${`
    transform ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1),
    opacity ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1)
  `};
`;

class SubHeader extends Component {
  state = {
    showBack: false
  };

  componentWillMount() {
    const { location } = this.props;
    if (location.state && location.state.referrer) {
      this.setState({ showBack: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      const { location } = nextProps;
      const showBack = !!(location.state && location.state.referrer);
      if (showBack !== this.state.showBack) this.setState({ showBack });
    }
  }

  render() {
    const { location: { state, pathname } } = this.props;
    const { showBack } = this.state;
    const hide = !isAuthed() || !SHOW_ON_ROUTES[pathname];
    return (
      <Headroom pinStart={52}>
        <Header>
          <Container size="lg" style={{ height: '100%' }}>
            <div style={{ height: '100%', position: 'relative' }}>
              <Transition in={!showBack && !hide} mountOnEnter unmountOnExit timeout={DURATION}>
                {status => {
                  return (
                    <NavTransitioner
                      status={status}
                      align="center"
                      justify={['space-between', { md: 'space-around' }]}
                      style={STYLE}
                    >
                      <FlexContent space="self">
                        <NavIconLink to="/stories" type="story" title="stories link" />
                      </FlexContent>
                      <FlexContent space="self">
                        <NavIconLink to="/messages" type="message" title="messages link" />
                      </FlexContent>
                      <FlexContent space="self">
                        <NavIconLink to="/notifications" type="alert" title="notifications link" />
                      </FlexContent>
                      <FlexContent space="self">
                        <NavIconLink to="/search" type="search" title="search link" />
                      </FlexContent>
                    </NavTransitioner>
                  );
                }}
              </Transition>
              <Transition in={showBack} timeout={DURATION}>
                {status => {
                  return (
                    <Flex align="center">
                      <BackButton
                        referrer={state && state.referrer}
                        status={status}
                        duration={DURATION}
                      />
                      <NavTransitioner status={status} id={SUBNAV_PORTAL_ID} />
                    </Flex>
                  );
                }}
              </Transition>
            </div>
          </Container>
        </Header>
      </Headroom>
    );
  }
}

export default withRouter(SubHeader);
