import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import ChatByIdQuery from 'graphql/ChatByIdQuery.graphql';
import StoryContainer from 'components/StoryContainer';
import Container from 'components/Container';
import { Flex, FlexContent } from 'components/Flex';
import { InputText } from 'components/InputGroup';
import Icon from 'components/Icon';
// import { FlexHeight, FlexHeightMain, FlexFooter } from 'components/FlexApp';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';

const MessageFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 61px;
  background-color: #eee;
`;

const MessageContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 61px;
`;

const SendButton = styled.button`
  color: #666;

  &:hover {
    color: inherit;
  }
`;

const Message = ({ userResult, chatQuery: { loading, Chat: chat }, ...props }) => {
  if (loading) return <StoryContainer>Loading...</StoryContainer>;
  else if (!userResult.user) return null;
  console.log('chat', chat);
  return [
    <MessageContainer key="messageContainer">
      <SubHeaderPortal>
        <Flex align="center">
          <FlexContent space="self">
            <SubHeaderTitle>
              {chat.users
                .filter(user => userResult.user.id !== user.id)
                .map(user => `@${user.userName}`)
                .join(', ')}
            </SubHeaderTitle>
          </FlexContent>
        </Flex>
      </SubHeaderPortal>
      <Container>
        {chat.messages.length === 0 ? (
          <p>
            No Messages :( No Messages :( No Messages :( No Messages :( No Messages :( No Messages
            :(
          </p>
        ) : null}
      </Container>
    </MessageContainer>,
    <MessageFooter key="messageFooter">
      <Container style={{ height: '100%' }}>
        <Flex gutters align="center" style={{ height: '100%' }}>
          <FlexContent>
            <InputText
              autoFocus
              id="write-message"
              // label="Write Message"
              // hideLabel
              // type="text"
              placeholder="write a message"
              model="chat.message"
              // validators={{ required: value => !value }}
              // clearable
            />
          </FlexContent>
          <FlexContent space="self">
            <SendButton>
              <Icon type="sendMessage" title="send message" />
            </SendButton>
          </FlexContent>
        </Flex>
      </Container>
    </MessageFooter>
  ];
};

export default graphql(ChatByIdQuery, {
  name: 'chatQuery',
  options: ({ match }) => ({ variables: { id: match.params.id } })
})(Message);
