import React, { useEffect, useState } from 'react';
import SideBarChats from '../../components/SideBarChats/SideBarChats';
import Chat from 'components/Chat/Chat';
import RightSideBarChat from 'components/RightSideBarChat/RightSideBar';
import { ChatsPageContainer } from './ChatsPage.styled';

const ChatsPage = ({ chats, setCurrentChat }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    setCurrentChat(selectedChat);
    console.log(selectedChat);
  }, [selectedChat]);

  return (
    <ChatsPageContainer>
      <SideBarChats chats={chats} onChatSelect={setSelectedChat} />
      <Chat selectedChat={selectedChat} />
      <RightSideBarChat />
    </ChatsPageContainer>
  );
};

export default ChatsPage;
