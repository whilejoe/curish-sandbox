import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import BackButton from 'components/BackButton';
import SubHeaderLink from 'components/SubHeaderLink';
import { Flex, FlexContent } from 'components/Flex';
import Container from 'components/Container';
import Icon from 'components/Icon';
import { isAuthed } from 'utils/AuthService';

const Header = styled.header`
  background-color: #f7f7f7;
  overflow-y: hidden;
`;

class SubHeader extends Component {
  state = {
    showBack: false
  };
  componentWillMount() {
    if (this.props.location.state && this.props.location.state.referrer) {
      this.setState({ showBack: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      if (nextProps.location.state && nextProps.location.state.referrer) {
        this.setState({ showBack: true });
      } else this.setState({ showBack: false });
    }
  }

  render() {
    const isUserAuthed = isAuthed();
    const { userResult: { user }, location: { state } } = this.props;
    const { showBack } = this.state;
    if (!isUserAuthed || !user) return null;
    return (
      <Header>
        <Container style={{ position: 'relative' }}>
          <BackButton referrer={state && state.referrer} show={showBack} />
          <Flex align="center" justify="space-around">
            <FlexContent space="self">
              <SubHeaderLink to="/stories" show={!showBack}>
                <Icon type="story" title="stories link" />
              </SubHeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <SubHeaderLink to="/messages" show={!showBack}>
                <Icon type="message" title="messages link" />
              </SubHeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <SubHeaderLink to="/notifications" show={!showBack}>
                <Icon type="alert" title="notifications link" />
              </SubHeaderLink>
            </FlexContent>
            <FlexContent space="self">
              <SubHeaderLink to="/search" show={!showBack}>
                <Icon type="search" title="link" />
              </SubHeaderLink>
            </FlexContent>
          </Flex>
        </Container>
      </Header>
    );
  }
}

export default withRouter(SubHeader);
