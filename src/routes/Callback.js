import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Container from 'components/Container';
import { isEnvLocalhost } from 'utils/env';
import { parseURL } from 'utils/AuthService';

class Callback extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    // parseUrl returns false is hash doesn't exist or user is already authed
    if (!parseURL(location.hash)) history.replace('/');
  }

  componentWillReceiveProps(nextProps) {
    // User will initially be undefined and query will either return user object or null
    if (this.props.userResult.user !== nextProps.userResult.user) {
      const { history, userResult } = nextProps;
      if (userResult.user) {
        // Send user id to Google Analytics
        if (!isEnvLocalhost) ReactGA.set({ userId: userResult.user.id });

        // Reroute to root
        history.replace('/');
      } else history.replace('/join');
    }
  }

  render() {
    return this.props.userResult.loading ? <Container>Loading...</Container> : null;
  }
}

export default Callback;
