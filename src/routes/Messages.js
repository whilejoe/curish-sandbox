import React from 'react';
import { graphql } from 'react-apollo';
import AllUsersChatsQuery from 'graphql/AllUsersChatsQuery.graphql';
import PageContainer from 'components/PageContainer';
import NewItemButton from 'components/NewItemButton';
import ChatCard from 'components/ChatCard';
import Link from 'components/Link';

const Messages = ({ allUserChats, location, ...props }) => {
  if (allUserChats.loading) return <PageContainer>Loading...</PageContainer>;
  return (
    <PageContainer>
      <h1>Chats</h1>
      <NewItemButton
        to={{ pathname: '/new-message', state: { referrer: location } }}
        title="new message"
      />
      {allUserChats.user.chats.map(chat => {
        return (
          <ChatCard key={chat.id}>
            <Link to={{ pathname: `/message/${chat.id}`, state: { referrer: location } }}>
              Chat ID: {chat.id}
            </Link>
          </ChatCard>
        );
      })}
    </PageContainer>
  );
};

export default graphql(AllUsersChatsQuery, {
  name: 'allUserChats'
})(Messages);
