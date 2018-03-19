import React from 'react';
// import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

// const Header = styled.header`border-bottom: 1px solid #eee;`;

// const TransitionWrapper = ({ children }) => {
//   // const childComponents = React.Children.toArray(children);
//   // React.Children.map(children, child => console.log('child', child));
//   console.log('children', children);
//   return (
//     <TransitionGroup>
//       <Transition timeout={150}>
//         {status => React.cloneElement(children, { status: status })}
//       </Transition>
//     </TransitionGroup>
//   );
// };
const duration = 120;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`
  // opacity: 0
  // position: 'absolute',
  // top: 0,
  // right: 0,
  // bottom: 0,
  // left: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

const TransitionWrapper = Component => {
  const Transitioner = props => (
    <Transition
      // unmountOnExit
      appear
      in
      // in={props.match.path === props.location.pathname}
      timeout={duration}
    >
      {status => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[status]
          }}
        >
          <Component {...props} />
        </div>
      )}
    </Transition>
  );

  return Transitioner;
};

// const TransitionWrapper = Component => props =>
//   <Transition
//     unmountOnExit
//     appear
//     in={props.match.path === props.location.pathname}
//     timeout={duration}
//   >
//     {status =>
//       <div
//         style={{
//           ...defaultStyle,
//           ...transitionStyles[status]
//         }}
//       >
//         <Component {...props} />
//       </div>}
//   </Transition>;

// const TransitionWrapper = ComponentToWrap =>
//   class extends Component {
//     render() {
//       return (
//         <Transition
//           appear
//           in={this.props.match.path === this.props.location.pathname}
//           timeout={duration}
//         >
//           {status =>
//             <div
//               style={{
//                 ...defaultStyle,
//                 ...transitionStyles[status]
//               }}
//             >
//               <ComponentToWrap {...this.props} />
//             </div>}
//         </Transition>
//       );
//     }
//   };
// const Fade = ({ in: inProp }) =>
//   <Transition in={inProp} timeout={duration}>
//     {state =>
//       <div
//         style={{
//           ...defaultStyle,
//           ...transitionStyles[state]
//         }}
//       >
//         I'm A fade Transition!
//       </div>}
//   </Transition>;

export default TransitionWrapper;
