// TODO: Revist
import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  state = {
    storedY: 0
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      if (this.props.location.search) {
        console.log('this.props.location.search', this.props.location.search);
        this.setState({ storedY: window.scrollY });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // console.log('this.props.location', this.props.location);
      // console.log('prevProps.location', prevProps.location);
      // window.scrollTo(0, 0);
      console.log('this.state.storedY', this.state.storedY);
      console.log('prevState.storedY', prevState.storedY);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
