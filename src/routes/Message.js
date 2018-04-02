import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import ChatByIdQuery from 'graphql/ChatByIdQuery.graphql';
import OnMessageAdded from 'graphql/OnMessageAdded.graphql';
import CreateMessageMutation from 'graphql/CreateMessageMutation.graphql';
import Container from 'components/Container';
import { Flex, FlexContent } from 'components/Flex';
import { baseInputMixin, activeState } from 'components/InputGroup';
import Icon from 'components/Icon';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
import SrOnly from 'components/SrOnly';
import { PALETTE } from 'constants/theme';
import { darken } from 'polished';
import { getTimeFromNow } from 'utils/date';

const MESSAGE_COLOR = PALETTE.SEARCH;

const FOOTER_HEIGHT = '60px';

const MessageFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${FOOTER_HEIGHT};
  padding-right: 0.6rem;
  padding-left: 0.6rem;
  background-color: ${PALETTE.HEADER};
  border-top: 1px solid;
`;

const MessageContainer = styled.div`
  padding: 1rem 1rem ${FOOTER_HEIGHT};
`;

const MessageInput = styled.input`
  ${baseInputMixin};
  border-color: #cacaca;
  transition: box-shadow 180ms ease-out;

  &:hover,
  &:focus {
    ${activeState};
  }
`;

const SendButton = styled.button`
  color: ${props => (props.isActive ? MESSAGE_COLOR : '#b9b9b9')};
  transition: color 180ms ease-out;

  &:hover,
  &:focus {
    &:not(:disabled) {
      color: ${darken(0.2, MESSAGE_COLOR)};
    }
  }
`;

const BadgeContainer = styled.div`
  margin-bottom: 0.65rem;
  text-align: ${props => (props.you ? 'right' : 'left')};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.1rem 0.65rem;
  color: ${props => (props.you ? PALETTE.BODY : 'inherit')};
  background-color: ${props => (props.you ? MESSAGE_COLOR : '#e6e6e6')};
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1.7;
  border-radius: 24px;
`;

const TimeStamp = styled.span`
  display: block;
  margin-top: 0.1em;
  color: #a0a0a0;
  font-size: 0.7em;
`;

class Message extends React.Component {
  state = {
    messageValue: '',
    messageSubmitting: false
  };

  componentWillMount() {
    const { subscribeToNewMessages, match } = this.props;
    subscribeToNewMessages({ id: match.params.id });
  }

  componentDidMount() {
    const { loading, messages } = this.props;
    if (!loading && messages.length) this.scrollIntoView();
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages.length !== messages.length && messages.length) {
      // Timeout needed for browser to paint
      setTimeout(() => {
        this.scrollIntoView();
      }, 0);
    }
  }

  async submitMessage() {
    const { createMessage, chatId, userResult } = this.props;
    const { messageValue, messageSubmitting } = this.state;

    if (!messageValue || messageSubmitting) return;

    this.setState({ messageSubmitting: true });

    // Add message to chat
    const result = await createMessage({
      variables: {
        chatId,
        fromId: userResult.user.id,
        text: messageValue
      }
    });

    this.setState({ messageSubmitting: false });

    // Reset input
    if (result.data) this.setState({ messageValue: '' });
  }

  handleOnChange = e => {
    this.setState({ messageValue: e.target.value });
  };

  handleOnFocus = e => {
    this.scrollIntoView();
  };

  handleSendSubmit = e => {
    e.preventDefault();
    this.submitMessage();
  };

  handleSendClick = e => {
    this.submitMessage();
    // Reset focus to input on button click only to prevent mobile keyboard from closing
    if (this.inputRef) this.inputRef.focus();
  };

  onContainerRef = node => {
    this.containerRef = node;
  };

  onInputRef = node => {
    this.inputRef = node;
  };

  scrollIntoView() {
    if (this.containerRef) {
      this.containerRef.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }

  render() {
    const { userResult, loading, messages = [], chatUsers = [] } = this.props;
    const { messageValue, messageSubmitting } = this.state;

    if (loading) return <Container>Loading...</Container>;
    else if (!userResult.user) return null;
    return [
      <SubHeaderPortal key="message-portal">
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
      <MessageContainer key="messages" innerRef={this.onContainerRef}>
        <Container>
          {messages.length > 0 &&
            messages.map(message => {
              const you = message.from.id === userResult.user.id;
              return (
                <BadgeContainer key={message.id} you={you}>
                  <Badge you={you}>{message.text}</Badge>
                  <TimeStamp>{message.dateFromNow}</TimeStamp>
                </BadgeContainer>
              );
            })}
        </Container>
      </MessageContainer>,
      <MessageFooter key="footer">
        <Flex gutters align="center" justify="center" style={{ height: '100%' }}>
          <FlexContent space={{ md: 55, xlg: 50 }}>
            <form onSubmit={this.handleSendSubmit}>
              <SrOnly>
                <label htmlFor="write-message">write a message</label>
              </SrOnly>
              <MessageInput
                autoComplete="off"
                id="write-message"
                placeholder="write a message"
                value={messageValue}
                onChange={this.handleOnChange}
                onFocus={this.handleOnFocus}
                innerRef={this.onInputRef}
              />
            </form>
          </FlexContent>
          <FlexContent space="self">
            <SendButton
              onClick={this.handleSendClick}
              isActive={!!messageValue}
              disabled={!messageValue || messageSubmitting}
            >
              <Icon type="sendMessage" title="send message" />
            </SendButton>
          </FlexContent>
        </Flex>
      </MessageFooter>
    ];
  }
}

export default compose(
  graphql(ChatByIdQuery, {
    name: 'chatQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } }),
    props: ({ chatQuery: { loading, Chat = {}, subscribeToMore } }) => ({
      loading,
      chatId: Chat.id,
      chatUsers: Chat.users,
      messages: Chat.messages
        ? Chat.messages.map(m => ({ ...m, dateFromNow: getTimeFromNow(m.createdAt) }))
        : [],
      subscribeToNewMessages: params => {
        return subscribeToMore({
          document: OnMessageAdded,
          variables: { id: params.id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data.Message) return prev;

            const newMessage = subscriptionData.data.Message.node;
            const updatedChat = {
              Chat: {
                ...prev.Chat,
                messages: [...prev.Chat.messages, newMessage]
              }
            };

            return updatedChat;
          }
        });
      }
    })
  }),
  graphql(CreateMessageMutation, { name: 'createMessage' })
)(Message);
