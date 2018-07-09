import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { PALETTE } from 'constants/theme';

// let lastKnownTop = null; // Gets reassigned on scroll. Avoids state change renders.
// let ticking = false; // Gets reassigned on scroll. Avoids state change renders.

const HEIGHT = '50px';

const Container = styled.div`
  height: ${HEIGHT};
`;

const Header = styled.div`
  position: relative;
  height: ${HEIGHT};
  background-color: ${PALETTE.HEADER};
  border-bottom: 1px solid ${PALETTE.GRAY.MEDIUM};
  transform: translateZ(0);
  z-index: 3;
  will-change: position;
  // overflow: hidden;

  &:after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 10px;
    content: '';
    background-size: 100% 10px;
    background-repeat: no-repeat;
    background: linear-gradient(rgba(0, 0, 0, 0.05), transparent);
    opacity: 0;
    transition: opacity 200ms linear;
  }

  ${props => {
    if (props.stuck) {
      return css`
        position: fixed;
        top: 0;
        width: 100%;
        background-color: ${rgba(PALETTE.HEADER, 0.95)};

        &:after {
          opacity: 1;
        }
      `;
    }
    return null;
  }};
`;

class StickyHeader extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    isStuck: false
  };

  lastKnownTop = null;
  ticking = false;

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.lastKnownTop = this.containerRef.getBoundingClientRect().top;
    this.requestTick();
  };

  requestTick = () => {
    if (!this.ticking) requestAnimationFrame(this.update);
    this.ticking = true;
  };

  update = () => {
    this.ticking = false;
    const stuck = this.lastKnownTop < 0;
    if (stuck !== this.state.isStuck) this.setState({ isStuck: stuck });
  };

  onRef = ref => {
    this.containerRef = ref;
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Container innerRef={this.onRef} classes="sticky-header-container">
        <Header stuck={this.state.isStuck}>{this.props.children}</Header>
      </Container>
    );
  }
}

export default StickyHeader;
