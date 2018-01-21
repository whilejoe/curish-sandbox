import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PageContainer from 'components/PageContainer';
import { isEnvLocalhost } from 'utils/env';
import { parseURL } from 'utils/AuthService';

class Callback extends Component {
  componentWillMount() {
    const { location, history } = this.props;
    // parseUrl returns false is hash doesn't exist or user is already authed
    if (!parseURL(location.hash)) history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    // User will initially be undefined and query will either return user object or null
    if (this.props.userResult.user !== nextProps.userResult.user) {
      const { history } = nextProps;
      if (nextProps.userResult.user) {
        // Send user id to Google Analytics
        if (!isEnvLocalhost) ReactGA.set({ userId: nextProps.userResult.user.id });

        // Reroute to root
        history.push('/');
      } else history.push('/join');
    }
  }

  render() {
    return this.props.userResult.loading ? <PageContainer>Loading...</PageContainer> : null;
  }
}

export default Callback;
