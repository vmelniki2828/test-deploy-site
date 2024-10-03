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

const Chat = () => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);
  const uPhoto = useSelector(selectUserPhoto);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);  // Состояние для сообщений

  const currentChat = useSelector(state => state.chat.currentChat);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', {
        roomId: currentChat.roomId,
        sender: uname,
        messageText: message,
      });
    }
    setMessage('');
  };

  useEffect(() => {
    if (currentChat?.roomId) {
      socket.emit('join_room', currentChat.roomId);

      // Подписка на получение сообщений
      const handleReceiveMessage = message => { 
        setChatMessages(message)
      };

      socket.on('receive_message', handleReceiveMessage);

      socket.on('update_chat_list', () => {
        setChatMessages([])
      });

      // Отписка от события при смене комнаты или размонтировании
      return () => {
        socket.off('receive_message', handleReceiveMessage);
      };
    }
  }, [currentChat]);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {/* Рендерим сообщения из состояния */}
        {chatMessages?.messages?.map((mes, index) => (
          <ChatDiv key={index} isManager={mes.sender === uname}>
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