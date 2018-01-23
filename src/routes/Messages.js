import React from 'react';
import { graphql } from 'react-apollo';
import AllUsersChatsQuery from 'graphql/AllUsersChatsQuery.graphql';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import NewItemButton from 'components/NewItemButton';
import Card from 'components/Card';
import Link from 'components/Link';

const Messages = ({ allUserChats, location, ...props }) => {
  if (allUserChats.loading) return <Container>Loading...</Container>;
  return (
    <PageContainer>
      <Container>
        <h1>Chats</h1>
        <NewItemButton
          to={{ pathname: '/new-message', state: { referrer: location } }}
          title="new message"
        />
        {allUserChats.user &&
          allUserChats.user.chats.map(chat => {
            return (
              <Card key={chat.id}>
                <Link to={{ pathname: `/message/${chat.id}`, state: { referrer: location } }}>
                  Chat ID: {chat.id}
                </Link>
              </Card>
            );
          })}
      </Container>
    </PageContainer>
  );
};

export default graphql(AllUsersChatsQuery, {
  name: 'allUserChats'
})(Messages);
