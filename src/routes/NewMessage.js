import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import CreateChatMutation from 'graphql/CreateChatMutation.graphql';
import AllUsersQuery from 'graphql/AllUsersQuery.graphql';
import StoryContainer from 'components/StoryContainer';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import SelectUserCard from 'components/SelectUserCard';
import SubHeaderPortal from 'components/SubHeaderPortal';
import SubHeaderTitle from 'components/SubHeaderTitle';

// const USERS_MOCK = [
//   { id: 1, userName: 'aristippus', fullName: 'Joe Piemeisel', photoURL: '' },
//   { id: 2, userName: 'jocelyn', fullName: 'Jocelyn', photoURL: '' }
// ];

const NewMessage = ({
  userResult,
  users: { loading = false, allUsers = [] },
  selectedUsersIds,
  createChat,
  ...props
}) => {
  return (
    <StoryContainer>
      <SubHeaderPortal>
        <Flex align="center" justify="space-between">
          <FlexContent space="self">
            <SubHeaderTitle>To</SubHeaderTitle>
          </FlexContent>
          <FlexContent space="self" hide={!selectedUsersIds.length}>
            <Button onClick={() => createChat(selectedUsersIds)}>New Chat</Button>
          </FlexContent>
        </Flex>
      </SubHeaderPortal>
      {!loading &&
        userResult.user &&
        allUsers.map(
          user => user.id !== userResult.user.id && <SelectUserCard key={user.id} user={user} />
        )}
    </StoryContainer>
  );
};

const mapStateToProps = state => {
  const model = state.forms.newChatUsers.model;
  return {
    selectedUsersIds: Object.keys(model).filter(userId => model[userId])
  };
};

export default compose(
  graphql(CreateChatMutation, {
    props: ({ ownProps: { location, history, userResult }, mutate }) => {
      console.log('ownProps.location', location);
      return {
        createChat: async selectedUsersIds => {
          // Current user may not exist until after components mounts
          // Concat once it does else return empty array and let type error prevent mutation
          const usersIds = userResult.user ? [userResult.user.id, ...selectedUsersIds] : [];
          const result = await mutate({
            variables: { usersIds }
          });
          console.log('result', result);
          if (result.data) {
            history.push(`/message/${result.data.createChat.id}`, {
              referrer: { pathname: '/messages' }
            });
          }
        }
      };
    }
  }),
  graphql(AllUsersQuery, {
    name: 'users'
  }),
  connect(mapStateToProps)
)(NewMessage);
