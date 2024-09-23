import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ArchiveContainer,
  ChatMessages,
  UserImg,
  MessageTime,
  ChatText,
  ChatDiv,
  MessageWrap,
  StartText,
  MessageBox,
  InfoWrap,
  TextName,
  TextItem,
} from './Archive.styled';
import userPhoto from '../../images/photoexample.jpeg';
import { selectUserUsername, selectUserPhoto } from '../../redux/selectors';

const Archive = ({ selectedChat }) => {
  const uPhoto = useSelector(selectUserPhoto);
  const uname = useSelector(selectUserUsername);
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime())
      ? 'Invalid Date'
      : parsedDate.toLocaleString(undefined, options);
  };

  console.log(selectedChat);
  const formattedStartTime = selectedChat
    ? formatDate(selectedChat.startTime)
    : 'No Start Time';
  const formattedEndTime = selectedChat
    ? formatDate(selectedChat.endTime)
    : 'No Start Time';

  return (
    <ArchiveContainer>
      {selectedChat ? (
        <ChatMessages>
          <StartText>Started - {formattedStartTime}</StartText>
          {selectedChat?.messages?.map((message, index) => {
            const formattedTimeStamp = formatDate(message.timestamp);
            const isManager = message.sender === uname;

            return (
              <ChatDiv key={index} isManager={isManager}>
                <MessageWrap isManager={isManager}>
                 
                      {!uPhoto && <UserImg src={userPhoto} alt="UserImg" isManager={isManager} />}
                      {uPhoto && (
                        <UserImg
                          src={`http${
                            process.env.REACT_APP_SECURE === 'true' ? 's' : ''
                          }://${process.env.REACT_APP_BACKEND_URL}${uPhoto}`}
                          alt="UserImg"
                          isManager={isManager}
                        />
                      )}
                      <div>
                <InfoWrap>
                  <TextName>{message.sender}</TextName>
                  <MessageTime>
                    {formattedTimeStamp}
                  </MessageTime>
                </InfoWrap>

                <MessageBox isManager={isManager}>
                  <ChatText>{message.message}</ChatText>
                </MessageBox>
              </div>
                  
                   
                 
                </MessageWrap>
              </ChatDiv>
            );
          })}
          <TextItem>End Time: {formattedEndTime}</TextItem>
        </ChatMessages>
      ) : (
        <TextItem>Выберите чат для отображения.</TextItem>
      )}
    </ArchiveContainer>
  );
};

export default Archive;
