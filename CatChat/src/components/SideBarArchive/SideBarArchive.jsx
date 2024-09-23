import React, { useState, useEffect } from 'react';
import { selectUserUsername } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import {
  SideBarChatsConteiner,
  ChatsList,
  ChatConteiner,
  UserImg,
  ChatText,
  ChatInfoWrap,
  MessageTime,
  MassageWrap,
  ChatTextItem,
} from './SideBarArchive.styled';
import userPhoto from '../../images/photoexample.jpeg';
import { getArchivedRooms, socket } from '../../services/API';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../redux/Chat/chatSlice';

const SideBarArchive = ({onChatSelect}) => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);
  const [rooms, setRooms] = useState([]);

  const handleChatChange = newChat => {
    dispatch(setCurrentChat(newChat));
  };

  const handleChatClick = chat => {
    if (onChatSelect) {
      onChatSelect(chat);
      handleChatChange(chat)
    }
  };
  
  useEffect(() => {
    // Функция для обработки обновления комнат
    const handleRoomsUpdate = (rooms) => {
      setRooms(rooms);
      console.log('Полученные комнаты:', rooms);
    };

    // Добавляем слушателя на обновление архивированных комнат
    socket.on('archived_rooms_update', handleRoomsUpdate);

    // Запускаем запрос на получение комнат
    getArchivedRooms(uname);

    // Очистка эффекта при размонтировании компонента
    return () => {
      socket.off('archived_rooms_update', handleRoomsUpdate);
    };
  }, []);



  return (
    <SideBarChatsConteiner>
      <ChatsList>
        {rooms.map((room) => {
          const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1] : null;
          const formatEndTime = (endTime) => {
            return format(new Date(endTime), "dd MMMM yyyy, HH:mm");
          };
          
          // Пример использования
          const endTime = room.endTime;
          const formattedEndTime = formatEndTime(endTime);
          return (
            <ChatConteiner key={room._id} onClick={() => handleChatClick(room)}>
              <UserImg src={userPhoto} alt="User" />
              <ChatInfoWrap>
                <MassageWrap>
                  <ChatText>{room?.clients?.username || 'No username'}</ChatText>
                  <ChatTextItem>{lastMessage ? lastMessage.message : 'No messages'}</ChatTextItem>
                </MassageWrap>
                <MessageTime>{formattedEndTime}</MessageTime>
              </ChatInfoWrap>
            </ChatConteiner>
          );
        })}
      </ChatsList>
    </SideBarChatsConteiner>
  );
};

export default SideBarArchive;
