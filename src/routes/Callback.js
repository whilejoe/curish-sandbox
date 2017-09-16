// TODO: Cleanup

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import { parseURL } from 'utils/AuthService';
// import store from 'state/store';
// import { push } from 'react-router-redux';

class Callback extends Component {
  state = {
    userExists: false
  };
  componentWillMount() {
    // parseURL(this.props.location.hash)
    //   .then(res => {
    //     console.log('response', res);
    //     // store.dispatch(push('/join'));
    //     // console.log('data', this.props.data);
    //   })
    //   .catch(err => {
    //     // store.dispatch(push('/login'));
    //     console.log('err', err);
    //   });
    // const response = await parseURL(this.props.location.hash);
    const parsed = parseURL(this.props.location.hash);
    if (parsed) {
      console.log('response', parsed);
      console.log('this.props in Callback', this.props);
    } else console.log('parse failed');
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data.user !== nextProps.data.user) {
      const user = nextProps.data.user;
      // if (user) store.dispatch(push('/profile'));
      // else store.dispatch(push('/join'));
      if (user) this.setState({ userExists: true });
      // else store.dispatch(push('/join'));
      // console.log('in if check nextProps.user', nextProps.user);
      // this.checkIfUser();
    }
    // console.log('will receive this.props', this.props);
    // console.log('will receive nextProps', nextProps);
    // if (!nextProps.data.loading) {
    // console.log('in if check nextProps.data.user', nextProps.data.user);
    // if (this.props.data.user !== nextProps.data.user) {
    //   console.log('in if check nextProps.data.user', nextProps.data.user);
    //   // this.checkIfUser();
    // }
    // }
    // if (!nextProps.data.loading) {
    //   if (this.props.data.user !== nextProps.data.user) {
    //     console.log('nextProps.data.user', nextProps.data.user);
    //     // this.checkIfUser();
    //   }
    // }
  }

  async checkIfUser() {
    // parseURL(this.props.location.hash)
    //   .then(res => {
    //     console.log('response', res);
    //     console.log('data', this.props.data);
    //   })
    //   .catch(err => console.log('err', err));
    // const parsed = parseURL(this.props.location.hash);
    // if (parsed) {
    //   console.log('response', parsed);
    //   console.log('data', this.props.data);
    // } else console.log('parse failed');
    // await this.props.data.user;
    // this.checkIfUser();
    try {
      const response = await parseURL(this.props.location.hash);
      console.log('response', response);
      console.log('user', this.props.data.user);
      // redirect if user is logged in or did not finish Auth0 Lock dialog
      // if (user) store.dispatch(replace('/profile'));
      // else store.dispatch(replace('/join'));
    } catch (err) {
      console.log('caught error', err);
      // store.dispatch(replace('/login'));
    }
  }

  render() {
    if (this.props.data.loading) return <h1>Callback Loading...</h1>;
    else if (this.state.userExists) return <Redirect to={{ pathname: '/profile' }} />;
    return <Redirect to={{ pathname: '/join' }} />;
  }
}

const USER_QUERY = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } })(Callback);
