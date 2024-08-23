import React, { useEffect, useState } from 'react';
import Archive from '../../components/Archive/Archive';
import SideBarArchive from '../../components/SideBarArchive/SideBarArchive';
import { ChatsPageContainer } from '../Chats/ChatsPage.styled';

const ArchivePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <ChatsPageContainer>
      <SideBarArchive onChatSelect={setSelectedChat} />
      <Archive selectedChat={selectedChat} />
    </ChatsPageContainer>
  );
};

export default ArchivePage;
