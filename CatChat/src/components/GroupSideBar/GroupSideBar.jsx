import React, { useState } from 'react';
import {
  GroupBlock,
  GroupBlockItem,
  GroupIcon,
  GroupImg,
  GroupInfoBlock,
  GroupMainInfo,
  GroupMainText,
  GroupMember,
  GroupName,
  GroupSideBarConteiner,
  GroupText,
  GroupTextItem,
  MainMembersText,
  MembersInfoBlock,
  MembersNumber,
  MembersList,
  MembersListItem,
  ShowAllButton,
  UserImg,
  PerfomanceInfoBlock,
  PerfomanceMainText,
  PerfomanceList,
  PerfomanceItem,
  PerfomanceIcon,
  PerfomanceNumber,
  PerfomanceText,
  PerfomanceButton,
} from './GroupSideBar.styled';
import imgUser from '../../images/photoUserTest.png';
import img from '../../images/UnionGrey.png';

const GroupSideBar = () => {
  const [showAll, setShowAll] = useState(false);

  const members = [
    {
      img: imgUser,
      name: 'Steven',
    },
    {
      img: imgUser,
      name: 'Shrek2',
    },
    {
      img: imgUser,
      name: 'McQueen',
    },
    {
      img: imgUser,
      name: 'Ivan',
    },
    {
      img: imgUser,
      name: 'Soska',
    },
    {
      img: imgUser,
      name: 'Sasha',
    },
    {
      img: imgUser,
      name: 'Denchik',
    },
  ];

  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  return (
    <GroupSideBarConteiner>
      <GroupMainText>Details</GroupMainText>
      <GroupInfoBlock>
        <GroupMainInfo>
          <GroupImg src={imgUser} />
          <GroupBlock>
            <GroupName>General</GroupName>
            <GroupMember>
              ID: 0 <GroupIcon src={img} />
            </GroupMember>
          </GroupBlock>
          <GroupBlockItem>
            <GroupText>Default</GroupText>
            <GroupTextItem>All agents belong to this group</GroupTextItem>
          </GroupBlockItem>
        </GroupMainInfo>
      </GroupInfoBlock>

      <MembersInfoBlock>
        <MainMembersText>
          Members <MembersNumber>({members.length})</MembersNumber>
        </MainMembersText>

        <MembersList>
          {members
            .slice(0, showAll ? members.length : 3)
            .map((member, index) => (
              <MembersListItem key={index}>
                <UserImg src={member.img} alt={member.name} />
                {member.name}
              </MembersListItem>
            ))}
        </MembersList>

        <ShowAllButton onClick={toggleShowAll}>
          {showAll ? 'Hide members' : 'Show all members'}
        </ShowAllButton>
      </MembersInfoBlock>
      <PerfomanceInfoBlock>
        <PerfomanceMainText>Perfomance</PerfomanceMainText>
        <PerfomanceList>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Total chats
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Goals
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Chat satisfaction
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Solved tickets
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Ticket first response time
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
          <PerfomanceItem>
            <PerfomanceText>
              <PerfomanceIcon src={img} />
              Ticket satisfaction
            </PerfomanceText>
            <PerfomanceNumber>10</PerfomanceNumber>
          </PerfomanceItem>
        </PerfomanceList>
        <PerfomanceButton>Reports</PerfomanceButton>
      </PerfomanceInfoBlock>
    </GroupSideBarConteiner>
  );
};

export default GroupSideBar;
