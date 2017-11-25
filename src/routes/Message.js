import React from 'react';
import { graphql } from 'react-apollo';
import ChatByIdQuery from 'graphql/ChatByIdQuery.graphql';
import PageContainer from 'components/PageContainer';
import { Flex, FlexContent } from 'components/Flex';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';

const Message = ({ userResult, chatQuery: { loading, Chat: chat }, ...props }) => {
  if (loading) return <PageContainer>Loading...</PageContainer>;
  else if (!userResult.user) return null;
  console.log('chat', chat);
  return (
    <PageContainer>
      <SubHeaderPortal>
        <Flex align="center">
          <FlexContent space="self">
            <SubHeaderTitle>
              You,{' '}
              {chat.users
                .filter(user => userResult.user.id !== user.id)
                .map(user => `@${user.userName}`)
                .join(', ')}
            </SubHeaderTitle>
          </FlexContent>
        </Flex>
      </SubHeaderPortal>
      <p>message placeholder</p>
    </PageContainer>
  );
};

export default graphql(ChatByIdQuery, {
  name: 'chatQuery',
  options: ({ match }) => ({ variables: { id: match.params.id } })
})(Message);
