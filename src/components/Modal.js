import React, { Component } from 'react';
import { Portal } from 'react-portal';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import { Slide, Backdrop } from 'components/ModalAnimations';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';
import { SLIDE_DURATION } from 'constants/animation';
import { PALETTE } from 'constants/theme';

const Header = styled.div`
  padding: 0.6rem 1rem;
  background-color: ${PALETTE.HEADER};
  border-bottom: 1px solid;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1em;
`;

const Body = styled.div`
  padding: 1.6rem 1rem 0.8rem;
`;

class Modal extends Component {
  state = {
    isPortalOpen: false,
    isModalOpen: false
  };

  handleKeyDown = e => {
    if (e && e.keyCode === 27) this.closeModal();
  };

  handleWindowClick = e => {
    if (e && this.modalContentRef && !this.modalContentRef.contains(e.target)) {
      this.closeModal();
    }
  };

  onPortalOpen = () => {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('click', this.handleWindowClick, false);
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('aria-hidden', 'true');
    this.setState({ isPortalOpen: true, isModalOpen: true });
  };

  onPortalEntered = () => {
    if (this.modalContentRef) this.modalContentRef.focus();
  };

  onPortalClosed = () => {
    this.setState({ isPortalOpen: false });
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('click', this.handleWindowClick, false);
    document.body.removeAttribute('style');
    document.body.removeAttribute('aria-hidden');
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  setRef = node => {
    this.modalContentRef = node;
  };

  render() {
    const { trigger, title, children } = this.props;
    const { isPortalOpen, isModalOpen } = this.state;
    return [
      trigger &&
        React.cloneElement(trigger, {
          key: 'modalTrigger',
          onClick: this.onPortalOpen
        }),
      isPortalOpen && (
        <Portal key="portal">
          <Transition
            in={isModalOpen}
            appear
            timeout={SLIDE_DURATION}
            onEntered={this.onPortalEntered}
            onExited={this.onPortalClosed}
          >
            {status => (
              <Backdrop status={status}>
                <Slide
                  status={status}
                  duration={SLIDE_DURATION}
                  innerRef={this.setRef}
                  tabIndex={0}
                >
                  <Header>
                    <Flex gutters align="center">
                      <FlexContent>
                        <Heading>{title}</Heading>
                      </FlexContent>
                      <FlexContent space="self">
                        <Button theme="secondary" onClick={this.closeModal}>
                          close
                        </Button>
                      </FlexContent>
                    </Flex>
                  </Header>
                  <Body>{children}</Body>
                </Slide>
              </Backdrop>
            )}
          </Transition>
        </Portal>
      )
    ];
  }
}

export default Modal;
