import React from 'react';
import ChatCard from 'components/ChatCard';
import { InputCheckbox } from 'components/InputGroup';
import Avatar from 'components/Avatar';

const SelectUserCard = ({ user }) => {
  return (
    <ChatCard>
      <InputCheckbox id={user.userName} model={`newChatUsers.${user.id}`}>
        <Avatar user={user} />
      </InputCheckbox>
    </ChatCard>
  );
};

export default SelectUserCard;
