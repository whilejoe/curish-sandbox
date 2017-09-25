import React, { Component } from 'react';
import Container from 'components/Container';
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
      if (nextProps.userResult.user) history.push('/');
      else history.push('/join');
    }
  }

  render() {
    return this.props.userResult.loading ? <Container>Loading...</Container> : null;
  }
}

export default Callback;
