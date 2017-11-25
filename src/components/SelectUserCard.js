import React from 'react';
import { InputCheckbox } from 'components/InputGroup';
import Avatar from 'components/Avatar';
import ListCard from 'components/ListCard';

const SelectUserCard = ({ user, referrer, onMouseOverCallback }) => {
  return (
    <ListCard>
      <InputCheckbox id={user.userName} model={`newChatUsers.${user.id}`}>
        <Avatar user={user} />
      </InputCheckbox>
    </ListCard>
  );
};

export default SelectUserCard;
