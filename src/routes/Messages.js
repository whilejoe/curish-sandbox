import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import AllUsersChatsQuery from 'graphql/AllUsersChatsQuery.graphql';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';
import StoryCardLoading from 'components/StoryCardLoading';
import { LinkCard } from 'components/Card';
import { getTimeFromNow } from 'utils/date';
import { headingFont } from 'styles/elements';

const MessageCard = LinkCard.extend`
  padding-top: 0.7rem;
  padding-bottom: 0.6rem;
  user-select: none;
`;

const ChatUsers = styled.span`
  display: block;
  margin-bottom: 0.3em;
  font-size: 0.93em;
  font-family: ${headingFont};
`;

const FromMessage = styled.span`
  display: block;
  width: 100%;
  color: #585858;
  font-size: 0.85em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageDate = styled.span`
  font-size: 0.65em;
  color: #777;
`;

const Messages = ({ userResult, loading, chats, location, ...rest }) => {
  return (
    <PageContainer>
      <Container>
        <h1>Chats</h1>
        <NewItemButton
          to={{ pathname: '/new-message', state: { referrer: location } }}
          title="new message"
        />
        {loading || userResult.loading ? (
          [<StoryCardLoading key="1" />, <StoryCardLoading key="2" />, <StoryCardLoading key="3" />]
        ) : chats.length ? (
          chats.map(chat => {
            const { id, users, lastMessage, lastMessageDate } = chat;
            return (
              <MessageCard
                key={id}
                to={{ pathname: `/message/${id}`, state: { referrer: location } }}
              >
                <ChatUsers>{users}</ChatUsers>
                <FromMessage>{lastMessage}</FromMessage>
                <MessageDate>{lastMessageDate}</MessageDate>
              </MessageCard>
            );
          })
        ) : (
          <p>No chats yet :(</p>
        )}
      </Container>
    </PageContainer>
  );
};

export default graphql(AllUsersChatsQuery, {
  name: 'allUserChats',
  props: ({
    ownProps: {
      userResult: { user = {} }
    },
    allUserChats: { loading, user: chatUser = {} }
  }) => ({
    loading: loading,
    chats:
      chatUser.chats && chatUser.chats.length
        ? chatUser.chats.map(chat => ({
            id: chat.id,
            users: chat.users
              .filter(u => u.id !== user.id)
              .map(u => u.userName)
              .join(', '),
            lastMessage: chat.messages.length
              ? chat.messages.map(
                  m => `${user.id !== m.from.id ? m.from.userName : 'You'}: ${m.text}`
                )[0]
              : '',
            lastMessageDate: chat.messages.length ? getTimeFromNow(chat.messages[0].createdAt) : ''
          }))
        : []
  })
})(Messages);
