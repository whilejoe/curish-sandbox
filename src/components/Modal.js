import React, { Component } from 'react';
import { Portal } from 'react-portal';
import Transition from 'react-transition-group/Transition';
import { Slide, Backdrop, SlideContent } from 'components/ModalAnimations';
import Button from 'components/Button';
import { SLIDE_DURATION } from 'constants/animation';

class Modal extends Component {
  state = {
    isPortalOpen: false,
    isModalOpen: false
  };

  onPortalOpen = () => {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('click', this.handleWindowClick, false);
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
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  setRef = node => {
    this.modalContentRef = node;
  };

  render() {
    const { trigger, children } = this.props;
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
                <Slide key="slide" status={status} duration={SLIDE_DURATION}>
                  <SlideContent innerRef={node => this.setRef(node)} tabIndex={0}>
                    <div style={{ textAlign: 'right' }}>
                      <Button style={{ marginBottom: '.5rem' }} onClick={this.onCloseModal}>
                        close
                      </Button>
                    </div>
                    {children}
                  </SlideContent>
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
