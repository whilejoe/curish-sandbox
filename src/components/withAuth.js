import React from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthed } from 'utils/AuthService';

function withAuth(WrappedComponent) {
  console.log('WrappedComponent', WrappedComponent);
  // ...and returns another component...
  return class extends React.Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      // const { history } = params;
      const authed = isAuthed();
      console.log('authed', authed);
      // if (!authed) history.push({ pathname: '/login' });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withRouter(withAuth);

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { isAuthed } from 'utils/AuthService';
// /**
//  * Higher-order component (HOC) to wrap restricted pages
//  */
// export function BaseComponent() {
//   class RequireAuth extends Component {
//     componentWillMount() {
//       this.checkAuthentication(this.props);
//     }
//     componentWillReceiveProps(nextProps) {
//       if (nextProps.location !== this.props.location) {
//         this.checkAuthentication(nextProps);
//       }
//     }
//     async checkAuthentication(params) {
//       const { history } = params;
//       const authed = await isAuthed();
//       if (!authed) history.replace({ pathname: '/login' });
//     }
//     render() {
//       return <BaseComponent {...this.props} />;
//     }
//   }
//   return withRouter(RequireAuth);
// }
