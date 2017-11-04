import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import BackButton from 'components/BackButton';
import { Flex } from 'components/Flex';
import Container from 'components/Container';
import { isAuthed } from 'utils/authService';
import { PALETTE } from 'constants/theme';

export const HeaderTitle = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const Header = styled.div`
  position: absolute;
  top: -56px;
  height: 56px;
  width: 100%;
  background-color: ${PALETTE.BODY};
  z-index: 2;
`;

const StoryHeader = ({ location: { state }, children }) => {
  return (
    <Header>
      <Container style={{ height: '100%' }}>
        <BackButton
          referrer={state && state.referrer ? state.referrer : isAuthed() ? '/stories' : '/'}
          show
        />
        <Flex
          gutters
          align="center"
          justify="space-between"
          offset={[8, { sm: 6, md: 4 }]}
          style={{ height: '100%' }}
        >
          {children}
        </Flex>
      </Container>
    </Header>
  );
};

export default withRouter(StoryHeader);
