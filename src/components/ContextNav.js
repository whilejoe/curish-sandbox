import React from 'react';
import { connect } from 'react-redux';
import PublishedNav from 'components/PublishedNav';
// import ReactDOM from 'react-dom';
// import { SUBNAV_PORTAL_ID } from 'constants/portals';

const COMPONENTS = {
  PublishedNav
};

class ContextNav extends React.PureComponent {
  render() {
    const { component, componentProps } = this.props;
    const Component = COMPONENTS[component];
    console.log('...props', componentProps);
    return Component ? <Component {...componentProps} /> : null;
  }
}

const mapStateToProps = state => ({
  component: state.contextNav.componentName,
  componentProps: state.contextNav.componentProps
});

export default connect(mapStateToProps)(ContextNav);

// let navRoot = document.getElementById(SUBNAV_PORTAL_ID);

// class ContextNav extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement('div');
//   }

//   componentDidMount() {
//     navRoot.appendChild(this.props.children);
//     // console.log('SUBNAV_PORTAL_ID', SUBNAV_PORTAL_ID);
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.children !== nextProps.children) {
//       console.log('********nextProps.children*********', nextProps.children);
//     }
//   }

//   componentWillUnmount() {
//     console.log('********unmount*********');
//     navRoot.removeChild(this.props.children);
//   }

//   render() {
//     navRoot = document.getElementById(SUBNAV_PORTAL_ID);
//     return ReactDOM.createPortal(this.props.children, navRoot);
//   }
// }

// export default ContextNav;
