import React, { useEffect, useState } from 'react';
import {
  ChatContainer,
  ChatInput,
  ChatMessages,
  MessageBox,
  IconButton,
  InputWrap,
  SendButton,
  ChatDiv,
  UserImg,
  ChatText,
  MessageTime,
  MessageWrap,
  InfoWrap,
  TextName,
} from './Chat.styled';
import Vec from '../../images/Vector.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserUsername, selectUserPhoto } from '../../redux/selectors';
import userPhoto from '../../images/photoexample.jpeg';
import { socket } from '../../services/API';
import { fetchRooms } from '../../redux/Chat/chatActions';

const Chat = () => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);
  const uPhoto = useSelector(selectUserPhoto);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const currentChat = useSelector(state => state.chat.currentChat);

  useEffect(() => {
    if (currentChat?.roomId) {
      socket.emit('join_room', currentChat.roomId);
      socket.emit('get_room_messages', currentChat.roomId); // Получаем сообщения при входе

      const handleReceiveMessage = (info) => {
        if (info.id === currentChat?.roomId) {
          setChatMessages(info?.messages);
          dispatch(fetchRooms(uname)); // Обновление списка чатов
        }
      };

      socket.on('receive_message', handleReceiveMessage);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
      };
    }
  }, [currentChat, dispatch, uname]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', {
        roomId: currentChat.roomId,
        sender: uname,
        messageText: message,
      });
      setMessage('');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {chatMessages.map((mes, index) => (
          <ChatDiv key={index} isManager={mes.sender === uname}>
            {console.log(mes)}
            <MessageWrap isManager={mes.sender === uname}>
              <UserImg
                src={uPhoto || userPhoto}
                alt="UserImg"
                isManager={mes.sender === uname}
              />
              <div>
                <InfoWrap>
                  <TextName>{mes.sender}</TextName>
                  <MessageTime>
                    {new Date(mes.timestamp).toLocaleTimeString()}
                  </MessageTime>
                </InfoWrap>
                <img src={mes?.fileUrl} atl="dsad"/>
                <MessageBox isManager={mes.sender === uname}>
                  <ChatText>{mes.message}</ChatText>
                </MessageBox>
              </div>
            </MessageWrap>
          </ChatDiv>
        ))}
      </ChatMessages>

      <InputWrap>
        <ChatInput
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Введите сообщение"
        />
        <SendButton onClick={sendMessage}>
          Send
          <IconButton src={Vec} alt="Vec" />
        </SendButton>
      </InputWrap>
    </ChatContainer>
  );
};

export default Chat;