import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import BackButton from 'components/BackButton';
import { Flex } from 'components/Flex';
import Container from 'components/Container';

const Header = styled.div`
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  overflow: hidden;
`;

class StoryHeader extends Component {
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
    const { location: { state }, children } = this.props;
    const { showBack } = this.state;
    return (
      <Header>
        <Container style={{ position: 'relative' }}>
          <BackButton referrer={state && state.referrer} show={showBack} />
          <Flex align="center" justify="space-around">
            {children}
          </Flex>
        </Container>
      </Header>
    );
  }
}

export default withRouter(StoryHeader);
