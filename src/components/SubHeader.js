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
  '/profile': true,
  '/101': false
};

const FALLBACK_ROUTES = {
  edit: '/stories',
  story: '/search',
  message: '/messages',
  notification: '/notifications'
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
  background-color: ${PALETTE.HEADER};
  border-bottom: 1px solid ${PALETTE.GRAY.MEDIUM};
  overflow: hidden;
`;

const NavTransitioner = styled(Flex)`
  transform: ${props => STATES[props.status].transform};
  opacity: ${props => STATES[props.status].opacity};
  transition:
    transform ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1),
    opacity ${DURATION}ms cubic-bezier(0.2, 0.3, 0.3, 1)
  };
`;

class SubHeader extends Component {
  state = {
    showBack: !!(this.props.location.state && this.props.location.state.referrer)
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state !== this.props.location.state) {
      const { state } = this.props.location;
      const showBack = !!(state && state.referrer);
      if (showBack !== prevState.showBack) this.setState({ showBack });
    }
  }

  render() {
    const {
      location: { state, pathname }
    } = this.props;
    const { showBack } = this.state;
    const basePath = pathname.split('/')[1];
    const fallbackPath = FALLBACK_ROUTES[basePath];
    const showMainNav = isAuthed() && SHOW_ON_ROUTES[pathname];
    const showBackNav = showBack || fallbackPath !== undefined;

    return (
      <Headroom pinStart={54}>
        <Header>
          <Container size="lg" style={{ height: '100%' }}>
            <div style={{ height: '100%', position: 'relative' }}>
              <Transition in={showMainNav} mountOnEnter unmountOnExit timeout={DURATION}>
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
              <Transition in={showBackNav} timeout={DURATION}>
                {status => {
                  return (
                    <Flex align="center">
                      <BackButton
                        referrer={state && state.referrer}
                        fallbackPath={fallbackPath}
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
