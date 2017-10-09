import React, { Component } from 'react';
import { Portal } from 'react-portal';
import Transition from 'react-transition-group/Transition';
import { Slide, Backdrop, SlideContent } from 'components/ModalAnimations';
import { SLIDE_DURATION } from 'constants/animation';

class Modal extends Component {
  state = {
    isPortalOpen: false,
    isModalOpen: false
  };

  onPortalOpen = e => {
    window.addEventListener('keydown', this.handleKeyDown, false);
    this.setState({ isPortalOpen: true, isModalOpen: true });
  };

  handleKeyDown = e => {
    console.log('handleKeyDown event listener called');
    if (e && e.keyCode === 27) this.onCloseModal();
  };

  onPortalClosed = () => {
    this.setState({ isPortalOpen: false });
    window.removeEventListener('keydown', this.handleKeyDown, false);
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
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
            onExited={this.onPortalClosed}
          >
            {status => (
              <Backdrop onClick={this.onCloseModal} key="backdrop" status={status}>
                <Slide key="slide" status={status} duration={SLIDE_DURATION}>
                  <SlideContent>
                    <button onClick={this.onCloseModal}>close</button>
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
