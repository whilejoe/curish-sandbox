import React from 'react';
import { graphql } from 'react-apollo';
import AllUsersChatsQuery from 'graphql/AllUsersChatsQuery.graphql';
import PageContainer from 'components/PageContainer';
import NewItemButton from 'components/NewItemButton';

const Messages = ({ allChats, location, ...props }) => {
  if (allChats.loading) return <PageContainer>Loading...</PageContainer>;
  return (
    <PageContainer>
      <h1>Chats</h1>
      <NewItemButton
        to={{ pathname: '/new-message', state: { referrer: location } }}
        title="new message"
      />
    </PageContainer>
  );
};

export default graphql(AllUsersChatsQuery, {
  name: 'allChats'
})(Messages);
