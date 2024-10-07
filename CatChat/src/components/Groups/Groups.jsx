import React, { useEffect, useRef, useState } from 'react';
import {
  ColumnHeader,
  ColumnItem,
  Dots,
  GropsText,
  GroupBlock,
  GroupButton,
  GroupImg,
  GroupInfoBlock,
  GroupMember,
  GroupName,
  GroupsConteiner,
  InfoChats,
  List,
  ListBlock,
  ListItem,
  QuantityMembers,
  SearchBlock,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchItemBlock,
  StatInformationBlock,
} from './Groups.styled';
import img from '../../images/UnionGrey.png';
import imgUser from '../../images/photoUserTest.png';
import GroupSideBar from 'components/GroupSideBar/GroupSideBar';
import GroupModal from 'components/GroupModal/GroupModal';

const Groups = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const modalRef = useRef(null);

  console.log(openModal);

  const toggleSideBar = () => {
    setOpenSideBar(prevState => !prevState);
  };

  const toggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (openSideBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSideBar]);

  return (
    <>
      <GroupsConteiner>
        <SearchBlock>
          <SearchItemBlock>
            <GropsText>Total (45)</GropsText>
            <SearchContainer>
              <SearchIcon src={img} />
              <SearchInput type="text" placeholder="Search group..." />
            </SearchContainer>
          </SearchItemBlock>
          <SearchItemBlock>
            <GroupButton onClick={toggleModal}>+ New Group</GroupButton>
          </SearchItemBlock>
        </SearchBlock>
        <ListBlock>
          <ColumnHeader>
            <ColumnItem marginRight={'301px'}>Name</ColumnItem>
            <ColumnItem marginRight={'122px'}>Members</ColumnItem>
            <ColumnItem marginRight={'0'}>Status</ColumnItem>
          </ColumnHeader>
          <List>
            <ListItem>
              <GroupInfoBlock>
                <GroupImg src={imgUser} />
                <GroupBlock>
                  <GroupName>General</GroupName>
                  <GroupMember>535 members</GroupMember>
                </GroupBlock>
                <QuantityMembers>+210</QuantityMembers>
              </GroupInfoBlock>
              <StatInformationBlock>
                <InfoChats>74/535 accepting chats</InfoChats>
              </StatInformationBlock>
              <Dots onClick={toggleSideBar} />
            </ListItem>
          </List>
        </ListBlock>
      </GroupsConteiner>
      {openSideBar && (
        <div ref={modalRef}>
          <GroupSideBar />
        </div>
      )}
      {openModal && (
        <div ref={modalRef}>
          <GroupModal onClose={toggleModal}/>
        </div>
      )}
    </>
  );
};

export default Groups;
