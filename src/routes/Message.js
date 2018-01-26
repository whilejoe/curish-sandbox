import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import ChatByIdQuery from 'graphql/ChatByIdQuery.graphql';
import CreateMessageMutation from 'graphql/CreateMessageMutation.graphql';
import Container from 'components/Container';
import { Flex, FlexContent } from 'components/Flex';
import { baseInputMixin } from 'components/InputGroup';
import Icon from 'components/Icon';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';
import SrOnly from 'components/SrOnly';
import { THEME, PRIMARY_KEY, TERTIARY_KEY, PALETTE } from 'constants/theme';
import { darken } from 'polished';
import { getTimeFromNow } from 'utils/date';

const MESSAGE_COLOR = THEME[PRIMARY_KEY];
const ACTIVE_COLOR = darken(0.27, MESSAGE_COLOR);

const MessageFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  padding-right: 0.6rem;
  padding-left: 0.6rem;
  background-color: #eaeaea;
  border-top: 1px solid;
`;

const MessageContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 50px;
`;

const MessageInput = styled.input`
  ${baseInputMixin};
  padding: 0.35rem 0.6rem;
  background-color: inherit;
  border-color: #b9b9b9;
  border-radius: 2px;
  box-shadow: none;
  transition: background-color 180ms ease-out;

  &:hover,
  &:focus {
    background-color: ${PALETTE.BODY};
  }
`;

const SendButton = styled.button`
  color: ${props => (props.isActive ? ACTIVE_COLOR : '#b9b9b9')};

  &:hover,
  &:focus {
    color: ${ACTIVE_COLOR};
  }
`;

const BadgeContainer = styled.div`
  margin-bottom: 0.65rem;
  text-align: ${props => (props.you ? 'right' : 'left')};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.1rem 0.8rem;
  color: ${props => (props.you ? 'white' : '#555')};
  background-color: ${props => (props.you ? THEME[TERTIARY_KEY] : '#e6e6e6')};
  font-size: 0.92em;
  font-weight: 600;
  line-height: 1.6;
  vertical-align: text-top;
  border-radius: 24px;
  text-align: justify;
`;

const TimeStamp = styled.span`
  display: block;
  margin-top: 0.1em;
  color: #a0a0a0;
  font-size: 0.7em;
`;

class Message extends React.Component {
  state = {
    messageValue: ''
  };

  componentDidMount() {
    if (!this.props.loading && this.props.messages.length > 0) {
      console.log('did mount');
      this.scrollIntoView();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading && this.props.messages.length > 0) {
      console.log('did update');
      this.scrollIntoView();
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
        this.scrollIntoView();
        this.setState({ messageValue: '' }); // Reset input
      }
    }
  };

  onRef = node => {
    this.containerRef = node;
  };

  scrollIntoView() {
    if (this.containerRef) this.containerRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  render() {
    const { userResult, loading, messages = [], chatUsers = [] } = this.props;
    const { messageValue } = this.state;

    if (loading) return <Container>Loading...</Container>;
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
        <form onSubmit={this.handleSubmit} style={{ height: '100%' }}>
          <Flex gutters align="center" justify="center" style={{ height: '100%' }}>
            <FlexContent space={{ md: 50 }}>
              <SrOnly>
                <label htmlFor="write-message">write a message</label>
              </SrOnly>
              <MessageInput
                autoComplete="off"
                autoFocus
                id="write-message"
                placeholder="write a message"
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
      messages:
        Chat.messages &&
        Chat.messages.map(m => ({ ...m, dateFromNow: getTimeFromNow(m.createdAt) }))
    })
  }),
  graphql(CreateMessageMutation, { name: 'createMessage' })
)(Message);
