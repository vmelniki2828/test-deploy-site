import React, { useEffect, useState } from 'react';
import SideBarChats from '../../components/SideBarChats/SideBarChats';
import Chat from 'components/Chat/Chat';
import RightSideBarChat from 'components/RightSideBarChat/RightSideBar';
import { ChatsPageContainer } from './ChatsPage.styled';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserUsername } from '../../redux/selectors';
import { socket } from 'services/API';
import { fetchRooms } from '../../redux/Chat/chatActions';

const ChatsPage = () => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);

  useEffect(() => {
    dispatch(fetchRooms(uname));

    socket.on('newChat', () => {
      dispatch(fetchRooms(uname));
    });

    socket.on('update_chat_list', () => {
      dispatch(fetchRooms(uname));
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off('newChat');
      socket.off('update_chat_list');
    };
  }, []);

  return (
    <ChatsPageContainer>
      <SideBarChats />
      <Chat />
      <RightSideBarChat />
    </ChatsPageContainer>
  );
};

export default ChatsPage;
