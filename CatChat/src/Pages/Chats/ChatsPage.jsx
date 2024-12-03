import React, { useEffect } from 'react';
import SideBarChats from '../../components/SideBarChats/SideBarChats';
import Chat from 'components/Chat/Chat';
import RightSideBarChat from 'components/RightSideBarChat/RightSideBar';
import { ChatsPageContainer } from './ChatsPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/selectors';
import { socket } from 'services/API';
import { fetchRooms } from '../../redux/Chat/chatActions';

const ChatsPage = () => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);

  useEffect(() => {
    const fetchChatRooms = () => {
      dispatch(fetchRooms(uname));
    };

    fetchChatRooms(); // Инициализация загрузки чатов

    socket.on('newChat', fetchChatRooms);
    socket.on('update_chat_list', fetchChatRooms);
    socket.on('receive_message', fetchChatRooms); // Обновление списка при новом сообщении

    return () => {
      socket.off('newChat', fetchChatRooms);
      socket.off('update_chat_list', fetchChatRooms);
      socket.off('receive_message', fetchChatRooms); // Отписка от события
    };
  }, [dispatch, uname]);

  return (
    <ChatsPageContainer>
      <SideBarChats />
      <Chat />
      <RightSideBarChat />
    </ChatsPageContainer>
  );
};

export default ChatsPage;