import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../redux/Chat/chatSlice';
import {
  SideBarChatsConteiner,
  ChatsList,
  ChatConteiner,
  UserImg,
  ChatText,
  ChatInfoWrap,
  MessageTime,
  UserNameText,
} from './SideBarChats.styled';
import userPhoto from '../../images/photoexample.jpeg';
import { format } from 'date-fns';

const SideBarChats = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const chats = useSelector(state => state.chat.chats);

  const sortedChats = chats?.length
    ? [...chats].sort((a, b) => {
        const lastMessageTimeA = a?.messages.length
          ? a.messages[a.messages.length - 1]?.timestamp
          : a?.startTime;
        const lastMessageTimeB = b?.messages.length
          ? b.messages[b.messages.length - 1]?.timestamp
          : b?.startTime;
        return new Date(lastMessageTimeB) - new Date(lastMessageTimeA);
      })
    : [];

  return (
    <SideBarChatsConteiner>
      <ChatsList>
        {sortedChats?.map(chat => (
          <ChatConteiner
            key={chat.roomId}
            onClick={() => {
              dispatch(setCurrentChat(chat)); 
              setIsActive(prev => !prev); 
            }}
            isActive={isActive}
          >
            <UserImg src={userPhoto} alt="UserImg" />
            <div>
              <UserNameText>{chat?.clients?.username}</UserNameText>
              <ChatInfoWrap>
                <ChatText>
                  {chat?.messages[chat?.messages.length - 1]?.message || ''}
                </ChatText>
                <MessageTime>
                  {format(
                    new Date(
                      chat?.messages.length
                        ? chat?.messages[chat?.messages.length - 1]?.timestamp
                        : chat?.startTime
                    ),
                    'HH:mm'
                  )}
                </MessageTime>
              </ChatInfoWrap>
            </div>
          </ChatConteiner>
        ))}
      </ChatsList>
    </SideBarChatsConteiner>
  );
};

export default SideBarChats;
