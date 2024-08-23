import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../redux/Chat/chatSlice';
import {
  SideBarChatsConteiner,
  ChatsList,
  ChatConteiner,
  UserImg,
  ChatText,
  ChatInfoWrap,
  MessageTime,
} from './SideBarChats.styled';
import userPhoto from '../../images/photoexample.jpeg';
import { format } from 'date-fns'; 

const SideBarChats = ({ chats, onChatSelect }) => {
  const dispatch = useDispatch();
  const [cchat, setCchat] = useState(null);

  const handleChatChange = newChat => {
    dispatch(setCurrentChat(newChat));
  };

  const handleChatClick = chat => {
    if (onChatSelect) {
      onChatSelect(chat);
      handleChatChange(chat);
    }
    setCchat(chat); // Сохраняем выбранный чат
  };

  // Этот эффект срабатывает при изменении списка chats
  useEffect(() => {
    if (cchat) {
      const updatedChat = chats.find(chat => chat.roomId === cchat.roomId);
      if (updatedChat) {
        handleChatClick(updatedChat);
      }
    }
  }, [chats]);

  const sortedChats = chats?.sort((a, b) => {
    const lastMessageTimeA = a?.messages.length
      ? a?.messages[a?.messages.length - 1]?.timestamp
      : a?.startTime;
    const lastMessageTimeB = b?.messages.length
      ? b?.messages[b?.messages.length - 1]?.timestamp
      : b?.startTime;
    return new Date(lastMessageTimeB) - new Date(lastMessageTimeA);
  });

  return (
    <SideBarChatsConteiner>
      <ChatsList>
        {sortedChats?.map(chat => (
          <ChatConteiner
            key={chat.roomId}
            onClick={() => handleChatClick(chat)}
          >
            <UserImg src={userPhoto} alt="UserImg" />
            <div>
              <div>{chat?.clients?.username}</div>
              <ChatInfoWrap>
                <ChatText>
                  {chat?.messages[chat?.messages.length - 1]?.message || ""}
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
