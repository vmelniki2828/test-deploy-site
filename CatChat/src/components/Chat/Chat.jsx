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
import { fetchManager } from '../../redux/Chat/chatActions';

const Chat = () => {
  const dispatch = useDispatch();
  const uname = useSelector(selectUserUsername);
  const uPhoto = useSelector(selectUserPhoto);
  const [message, setMessage] = useState('');

  const currentChat = useSelector(state => state.chat.currentChat);

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

  useEffect(() => {
    socket.on('receive_message', message => {
      console.log('Получено сообщение:', message);
    });

    return () => {
      socket.off('receive_message'); // Очистка обработчика при размонтировании
    };
  }, []);

  // useEffect(() => {
  //   const storedMessages = localStorage.getItem('chatMessages');
  //   if (storedMessages) {
  //     const parsedMessages = JSON.parse(storedMessages);
  //     // Установите сообщения в состояние Redux или локальное состояние
  //     dispatch(setMessages(parsedMessages)); // Пример действия Redux
  //   }
  // }, []);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    // Обработка события отключения чата
    socket.on('chat_disconnected', message => {
      dispatch(fetchManager(null));
      alert(message); // Сообщение об отключении
      // Вы можете добавить логику для перехода на другой экран или очистки состояния чата
    });

    return () => {
      socket.off('chat_disconnected');
    };
  }, []);

  return (
    <ChatContainer>
      <ChatMessages>
        {currentChat?.messages?.map((mes, index) => (
          <ChatDiv key={index} isManager={mes.sender === uname}>
            <MessageWrap isManager={mes.sender === uname}>
              {!uPhoto && (
                <UserImg
                  src={userPhoto}
                  alt="UserImg"
                  isManager={mes.sender === uname}
                />
              )}
              {uPhoto && (
                <UserImg
                  isManager={mes.sender === uname}
                  src={`http://${process.env.REACT_APP_BACKEND_URL}${uPhoto}`}
                  alt="UserImg"
                />
              )}
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
        <SendButton onClick={sendMessage} onKeyDown={handleKeyPress}>
          Send
          <IconButton src={Vec} alt="Vec" />
        </SendButton>
      </InputWrap>
    </ChatContainer>
  );
};

export default Chat;
