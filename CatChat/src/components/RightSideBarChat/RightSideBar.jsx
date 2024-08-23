import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HeaderInfoWrap,
  PersonIcon,
  InfoCon,
  InfoWrap,
  TicketName,
  UserImg,
  TicketIcon,
  IconWrapper,
  UserCon,
  UserWrap,
  UserName,
  UserMail,
} from './RightSideBarChat.styled';
import userPhoto from '../../images/photoexample.jpeg';

const RightSideBarChat = () => {
  const currentChat = useSelector(state => state.chat.currentChat);
  const [selectedTab, setSelectedTab] = useState('person'); // Состояние для выбора вкладки

  const handleTabClick = tab => {
    setSelectedTab(tab);
  };

  console.log(currentChat);

  return (
    <InfoCon>
      <HeaderInfoWrap>
        <IconWrapper
          isActive={selectedTab === 'person'}
          onClick={() => handleTabClick('person')}
        >
          <PersonIcon />
        </IconWrapper>

        <IconWrapper
          isActive={selectedTab === 'ticket'}
          onClick={() => handleTabClick('ticket')}
        >
          <TicketIcon />
        </IconWrapper>
      </HeaderInfoWrap>
      <InfoWrap>
        <TicketName>
          {selectedTab === 'person' ? 'General info' : 'Create ticket in GDesk'}
        </TicketName>
        {selectedTab === 'person' && currentChat ? (
          <>
            <UserCon>
              <UserImg src={userPhoto} alt="UserImg" />
              <UserWrap>
                <UserName>{currentChat?.clients?.username}</UserName>
                <UserMail>{currentChat?.clients?.email}</UserMail>
              </UserWrap>
            </UserCon>
            <p>Ip : {currentChat?.clients?.otherInfo?.ip}</p>
            <p>Language : {currentChat?.clients?.otherInfo?.language}</p>
            <p>Location : {currentChat?.clients?.otherInfo?.location}</p>
            <p>Referrer : {currentChat?.clients?.otherInfo?.referrer}</p>
            <p>Timestamp : {currentChat?.clients?.otherInfo?.timestamp}</p>
            <p>Timezone : {currentChat?.clients?.otherInfo?.timezone}</p>
            <p>UserAgent : {currentChat?.clients?.otherInfo?.userAgent}</p>
            <p>Latitude : {currentChat?.clients?.otherInfo?.coordinates?.latitude}</p>
            <p>Longitude : {currentChat?.clients?.otherInfo?.coordinates?.longitude}</p>
          </>
        ) : (
          <div>{/* Add the Ticket Info here */}</div>
        )}
      </InfoWrap>
    </InfoCon>
  );
};

export default RightSideBarChat;
