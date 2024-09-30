import React, { useEffect, useState } from 'react';
import SideBarChats from '../../components/SideBarChats/SideBarChats';
import Chat from 'components/Chat/Chat';
import RightSideBarChat from 'components/RightSideBarChat/RightSideBar';
import { ChatsPageContainer } from './ChatsPage.styled';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/selectors';
import { socket } from 'services/API';

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentChat, setCurrentChat] = useState(null)

  const [chats, setChats] = useState([]);
  const uname = useSelector(selectUserUsername);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rooms/${uname}`
      );
      setChats(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    handleSearch();

    // Прослушивание события "newChat" и обновление списка чатов
    socket.on('newChat', () => {
      handleSearch();
      if (chats) {
        setChats(chats);
        console.log(chats);
      }
    });

    socket.on('update_chat_list', () => {
      console.log();
      handleSearch();
      if (chats) {
        setChats(chats);
        console.log(chats);
      }
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off('newChat');
      socket.off('update_chat_list');
    };
  }, []);

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
