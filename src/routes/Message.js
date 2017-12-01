import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import ChatByIdQuery from 'graphql/ChatByIdQuery.graphql';
import CreateMessageMutation from 'graphql/CreateMessageMutation.graphql';
import StoryContainer from 'components/StoryContainer';
import Container from 'components/Container';
import { Flex, FlexContent } from 'components/Flex';
import { baseInputMixin } from 'components/InputGroup';
import Icon from 'components/Icon';
// import { FlexHeight, FlexHeightMain, FlexFooter } from 'components/FlexApp';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
import SrOnly from 'components/SrOnly';
import { THEME, SECONDARY_KEY } from 'constants/theme';
import { darken } from 'polished';

const MESSAGE_COLOR = THEME[SECONDARY_KEY];
const ACTIVE_COLOR = darken(0.25, MESSAGE_COLOR);

const MessageFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  background-color: ${MESSAGE_COLOR};
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.1);
`;

const MessageContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 50px;
`;

const MessageInput = styled.input`
  ${baseInputMixin};
  padding: 0.4rem 0.6rem;
  border: none;
`;

const SendButton = styled.button`
  color: ${props => (props.isActive ? ACTIVE_COLOR : 'white')};

  &:hover,
  &:focus {
    color: ${ACTIVE_COLOR};
  }
`;

class Message extends React.Component {
  state = {
    messageValue: ''
  };

  componentDidMount() {
    // console.log('containerRef', this.containerRef);
    // document.body.scrollTop = document.body.scrollHeight;
    if (this.containerRef) {
      this.containerRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages !== nextProps.messages && nextProps.messages.length) {
      console.log('nextProps.messages', nextProps.messages);
      console.log('containerRef will receive', this.containerRef);
      // console.log(' document.body.scrollHeight', document.body.scrollHeight);
      // window.scrollTo(0, document.body.scrollHeight);
      if (this.containerRef) {
        this.containerRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }

  handleChange = e => {
    this.setState({ messageValue: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { createMessage, chatId, userResult } = this.props;
    const { messageValue } = this.state;

    if (messageValue) {
      // Add message
      const result = await createMessage({
        variables: {
          chatId,
          fromId: userResult.user.id,
          text: messageValue
        }
      });

      if (result.data) {
        console.log('result', result);
        this.setState({ messageValue: '' });
      }
    }
  };

  onRef = node => {
    console.log('onRef containerRef', this.containerRef);
    this.containerRef = node;
  };

  render() {
    const { userResult, loading, messages, chatUsers } = this.props;
    const { messageValue } = this.state;

    if (loading) return <StoryContainer>Loading...</StoryContainer>;
    else if (!userResult.user) return null;
    return [
      <SubHeaderPortal key="portal">
        <Flex align="center">
          <FlexContent space="self">
            <SubHeaderTitle>
              {chatUsers
                .filter(user => userResult.user.id !== user.id)
                .map(user => `@${user.userName}`)
                .join(', ')}
            </SubHeaderTitle>
          </FlexContent>
        </Flex>
      </SubHeaderPortal>,
      <MessageContainer key="messages" innerRef={this.onRef}>
        <Container>
          {messages.length > 0 &&
            messages.map(message => {
              return <p key={message.id}>{message.text}</p>;
            })}
        </Container>
      </MessageContainer>,
      <MessageFooter key="footer">
        <Container style={{ height: '100%' }}>
          <form onSubmit={this.handleSubmit} style={{ height: '100%' }}>
            <Flex gutters align="center" justify="center" style={{ height: '100%' }}>
              <FlexContent space={{ md: 50 }}>
                <SrOnly>
                  <label htmlFor="write-message">write a message</label>
                </SrOnly>
                <MessageInput
                  autoFocus
                  autoComplete="off"
                  id="write-message"
                  // label="Write Message"
                  // hideLabel
                  // type="text"
                  placeholder="write a message..."
                  // model="chat.message"
                  // validators={{ required: value => !value }}
                  // clearable
                  value={messageValue}
                  onChange={this.handleChange}
                />
              </FlexContent>
              <FlexContent space="self">
                <SendButton type="submit" isActive={!!messageValue}>
                  <Icon type="sendMessage" title="send message" />
                </SendButton>
              </FlexContent>
            </Flex>
          </form>
        </Container>
      </MessageFooter>
    ];
  }
}

export default compose(
  graphql(ChatByIdQuery, {
    name: 'chatQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } }),
    props: ({ chatQuery: { loading, Chat = {} } }) => ({
      loading,
      chatId: Chat.id,
      chatUsers: Chat.users,
      messages: Chat.messages
    })
  }),
  graphql(CreateMessageMutation, { name: 'createMessage' })
)(Message);
