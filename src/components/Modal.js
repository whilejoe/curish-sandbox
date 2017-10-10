import React, { Component } from 'react';
import { Portal } from 'react-portal';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import { Slide, Backdrop } from 'components/ModalAnimations';
import Button from 'components/Button';
import { Flex, FlexContent } from 'components/Flex';
import { SLIDE_DURATION } from 'constants/animation';

const PADDING_TB = '1rem';
const PADDING_LR = '1.25rem';

const Header = styled.div`
  padding-top: ${PADDING_TB};
  padding-right: ${PADDING_LR};
  padding-left: ${PADDING_LR};
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1.35em;
`;

const Body = styled.div`
  padding: ${PADDING_TB} ${PADDING_LR};
`;

class Modal extends Component {
  state = {
    isPortalOpen: false,
    isModalOpen: false
  };

  componentWillMount() {
    this.onPortalOpen();
  }

  onPortalOpen = () => {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('click', this.handleWindowClick, false);
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('aria-hidden', 'true');
    this.setState({ isPortalOpen: true, isModalOpen: true });
  };

  handleKeyDown = e => {
    if (e && e.keyCode === 27) this.onCloseModal();
  };

  handleWindowClick = e => {
    if (e && this.modalContentRef && !this.modalContentRef.contains(e.target)) {
      this.onCloseModal();
    }
  };

  onPortalClosed = () => {
    this.setState({ isPortalOpen: false });
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('click', this.handleWindowClick, false);
    document.body.removeAttribute('style');
    document.body.removeAttribute('aria-hidden');
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  setRef = node => {
    this.modalContentRef = node;
  };

  render() {
    const { trigger, title, children } = this.props;
    const { isPortalOpen, isModalOpen } = this.state;
    return [
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
            onEntered={() => this.modalContentRef && this.modalContentRef.focus()}
            onExited={this.onPortalClosed}
          >
            {status => (
              <Backdrop key="backdrop" status={status}>
                <Slide
                  key="slide"
                  status={status}
                  duration={SLIDE_DURATION}
                  innerRef={node => this.setRef(node)}
                  tabIndex={0}
                >
                  <Header>
                    <Flex gutters align="center">
                      <FlexContent>
                        <Heading>{title}</Heading>
                      </FlexContent>
                      <FlexContent space="self">
                        <Button style={{ marginBottom: '.5rem' }} onClick={this.onCloseModal}>
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
