import React from 'react';
import {
  CloseButton,
  GroupModalConteiner,
  HeaderModalBlock,
  InputConteiner,
  MainModalText,
  ModalOverlay,
  TextInput,
  SelectInput,
  Label,
} from './GroupModal.styled';

const GroupModal = ({ onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <GroupModalConteiner>
        <HeaderModalBlock>
          <MainModalText>Create a new group</MainModalText>
          <CloseButton onClick={onClose} />
        </HeaderModalBlock>
        <InputConteiner>
          <Label htmlFor="groupName">Name</Label>
          <TextInput
            id="groupName"
            type="text"
            placeholder="e.g. Support team"
          />

          <Label htmlFor="groupType">Add members</Label>
          <SelectInput id="groupType" placeholder="Enter a name or email">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="secret">Secret</option>
          </SelectInput>
        </InputConteiner>
      </GroupModalConteiner>
    </>
  );
};

export default GroupModal;
