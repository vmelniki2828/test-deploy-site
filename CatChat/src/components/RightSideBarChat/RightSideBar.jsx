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
  Text,
  MainText,
  TextItem,
  UserLocationConteiner,
  LocationItem,
  LocationText,
  Location,
} from './RightSideBarChat.styled';
import userPhoto from '../../images/photoexample.jpeg';
import Map from '../../components/Map/Map';

const RightSideBarChat = () => {
  const currentChat = useSelector(state => state.chat.currentChat);
  const [selectedTab, setSelectedTab] = useState('person'); // Состояние для выбора вкладки
  const latitude = currentChat?.clients?.otherInfo?.coordinates.latitude
  const longitude = currentChat?.clients?.otherInfo?.coordinates.longitude
  const locationCoordinates = {latitude, longitude};
  const testLocation = {latitude : 50.458, longitude : 30.5303};

  const handleTabClick = tab => {
    setSelectedTab(tab);
  };

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
            <UserLocationConteiner>
              <LocationItem>
                <LocationText>
                  <Location />
                  {currentChat?.clients?.otherInfo?.location}
                </LocationText>
                <Map coordinates={testLocation}/>
              </LocationItem>
            </UserLocationConteiner>
            <MainText>Main data</MainText>
            <Text>
              IP : <TextItem>{currentChat?.clients?.otherInfo?.ip}</TextItem>
            </Text>
            <Text>
              Language :
              <TextItem>{currentChat?.clients?.otherInfo?.language}</TextItem>
            </Text>
            <Text>
              Referrer :
              <TextItem>{currentChat?.clients?.otherInfo?.referrer}</TextItem>
            </Text>
            <Text>
              Timestamp :
              <TextItem>{currentChat?.clients?.otherInfo?.timestamp}</TextItem>
            </Text>
            <Text>
              Timezone :
              <TextItem>{currentChat?.clients?.otherInfo?.timezone}</TextItem>
            </Text>
            <Text>
              UserAgent :
              <TextItem>{currentChat?.clients?.otherInfo?.userAgent}</TextItem>
            </Text>
            <Text>
              Latitude :
              <TextItem>
                {currentChat?.clients?.otherInfo?.coordinates?.latitude}
              </TextItem>
            </Text>
            <Text>
              Longitude :
              <TextItem>
                {currentChat?.clients?.otherInfo?.coordinates?.longitude}
              </TextItem>
            </Text>
          </>
        ) : (
          <div>{/* Add the Ticket Info here */}</div>
        )}
      </InfoWrap>
    </InfoCon>
  );
};

export default RightSideBarChat;
