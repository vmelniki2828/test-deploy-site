import React, { useState } from 'react';
import {
  CloseButton,
  GroupModalConteiner,
  HeaderModalBlock,
  InputConteiner,
  MainModalText,
  ModalOverlay,
  TextInput,
  Label,
  ItemBlock,
  ListItem,
  OptionSpan,
  InputButton,
  RoundCheckbox,
  LabelName,
  InputBox,
  List,
  PositionBox,
  CreateButton, 
} from './GroupModal.styled';

const GroupModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelect = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = name => {
    setSelectedMembers(prev =>
      prev.includes(name)
        ? prev.filter(option => option !== name)
        : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(member => member.name));
    }
    setSelectAll(!selectAll);
  };

  const members = [
    { name: 'Steven', email: 'steven@example.com' },
    { name: 'Steve1', email: 'steven1@example.com' },
    { name: 'Steven2', email: 'steven2@example.com' },
    { name: 'Steven3', email: 'steven3@example.com' },
  ];

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
          <PositionBox>
            <InputButton onClick={toggleSelect}>
              {selectedMembers.length > 0
                ? `Selected (${selectedMembers.length})`
                : 'Enter a name or email'}
            </InputButton>

            {isOpen && (
              <InputBox>
                <div
                  style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
                >
                  <RoundCheckbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <LabelName>Select all</LabelName>
                </div>

                <List>
                  {members.map((member, index) => (
                    <ListItem
                      key={index}
                      onClick={() => handleOptionClick(member.name)}
                      style={{
                        backgroundColor: selectedMembers.includes(member.name)
                          ? '#e0e0e0'
                          : '#fff',
                      }}
                    >
                      {member.name}
                      <ItemBlock>
                        <OptionSpan>{member.email}</OptionSpan>
                        <RoundCheckbox
                          checked={selectedMembers.includes(member.name)}
                          onChange={() => handleOptionClick(member.name)}
                        />
                      </ItemBlock>
                    </ListItem>
                  ))}
                </List>
              </InputBox>
            )}
          </PositionBox>
        </InputConteiner>
        <CreateButton>Create</CreateButton>
      </GroupModalConteiner>
    </>
  );
};

export default GroupModal;
