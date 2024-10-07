import {
  HeaderConteiner,
  AllChatsName,
  HeaderIcon,
  HeaderIconWrap,
  HeaderName,
  HeaderNameWrap,
  ChatsNameWrap,
  Settings,
  ModalWindow,
  ButtonStyle,
  SettingsStyle,
  ManagerIcon,
  OpenModal,
  CloseChat,
} from './Header.styled';
import MainIcon from '../../images/Union.png';
import { socket } from 'services/API';
import { selectUserUsername } from '../../redux/selectors';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from './Modal/Modal';
import { Manager } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import {
  fetchManager,
  fetchManagers,
  fetchRooms,
  replaceChatManager,
} from '../../redux/Chat/chatActions';
import { setCurrentChat } from '../../redux/Chat/chatSlice';

const Header = () => {
  const dispatch = useDispatch();
  const uname = useSelector(state => state.user.username);
  const currentChat = useSelector(state => state.chat.currentChat);
  const manager = useSelector(state => state.chat.currentManager);
  const managers = useSelector(state => state.chat.managers);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const modalRef = useRef(null);
  const pageLocation = useLocation();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleOpenSetting = () => {
    setOpenSettings(prev => !prev);
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenSettings(false);
    }
  };

  useEffect(() => {
    if (openSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSettings]);

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchManager(uname)); // Получаем текущего менеджера
    dispatch(fetchRooms(uname)); // Получаем комнаты, где менеджер задействован

    // Подключаем обработчик события замены менеджера от сервера
    socket.on('manager-replaced', data => {
      console.log(`Менеджер был заменен в комнате ${data.roomId}:`);
      console.log(`Старый менеджер: ${data.oldManagerUsername}`);
      console.log(`Новый менеджер: ${data.newManagerUsername}`);

      // Обновляем список чатов после замены менеджера
      dispatch(fetchRooms(uname));
      // Если текущий чат обновился (например, менеджер был заменен в нем)
      if (currentChat?.roomId === data.roomId) {
        dispatch(fetchManager(uname)); // Обновляем текущего менеджера
      }
    });

    // Очистка события при размонтировании компонента
    return () => {
      socket.off('manager-replaced');
    };
  }, [dispatch, uname]);

  const joinChat = username => {
    if (username.trim() !== '') {
      socket.emit('join_manager', username.trim());
      dispatch(fetchManager(username));
    }
  };

  const removeManager = username => {
    if (username.trim() !== '') {
      socket.emit('delete_manager', username.trim());
      dispatch(fetchManager(null));
    }
  };

  const handleDisconnectChat = () => {
    const roomId = currentChat?.roomId; // Получите ID комнаты, которую нужно отключить
    socket.emit('disconnect_chat', roomId);
    dispatch(setCurrentChat(null));
  };

  const handleReplaceManager = () => {
    dispatch(
      replaceChatManager({
        roomId: currentChat?.roomId,
        oldManagerUsername: currentChat?.managers[0]?.username,
        newManagerUsername: selectedOption,
      })
    )
      .then(() => {
        // Обновляем список чатов после успешной замены менеджера
        dispatch(fetchRooms(uname));
      })
      .catch(error => {
        console.error('Ошибка при замене менеджера:', error);
      });
    dispatch(setCurrentChat(null));
    closeModal();
  };

  return (
    <HeaderConteiner>
      {/* Визуальная часть осталась неизменной */}
      <HeaderIconWrap>
        <HeaderIcon src={MainIcon} alt="UserImg" />
      </HeaderIconWrap>
      {pageLocation.pathname !== '/team' ? (
        <ChatsNameWrap>
          <AllChatsName>All Chats</AllChatsName>
        </ChatsNameWrap>
      ) : (
        <AllChatsName>Team</AllChatsName>
      )}

      {pageLocation.pathname !== '/team' && (
        <HeaderNameWrap>
          <HeaderName>
            {currentChat ? currentChat?.clients?.username : ''}
          </HeaderName>

          {pageLocation.pathname == '/main' &&
            (openSettings ? (
              <ModalWindow ref={modalRef}>
                {manager?.manager === null ? (
                  <SettingsStyle onClick={() => joinChat(uname)}>
                    <ManagerIcon />
                    Join Manager
                  </SettingsStyle>
                ) : (
                  <>
                    <SettingsStyle onClick={() => removeManager(uname)}>
                      <ManagerIcon />
                      Remove Manager
                    </SettingsStyle>
                  </>
                )}
                <SettingsStyle
                  onClick={() => {
                    openModal();
                    dispatch(fetchManagers()); // Загружаем всех менеджеров
                  }}
                >
                  <OpenModal /> Открыть модальное окно
                </SettingsStyle>
                <SettingsStyle onClick={() => handleDisconnectChat()}>
                  <CloseChat />
                  Отключить чат
                </SettingsStyle>
              </ModalWindow>
            ) : null)}

          <Modal show={showModal}>
            <button onClick={closeModal}>X</button>
            <h1>Выберите вариант</h1>

            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="" disabled>
                -- Выберите вариант --
              </option>
              {managers?.map(
                man =>
                  man.username !== uname && (
                    <option key={man.username} value={man.username}>
                      {man.username}
                    </option>
                  )
              )}
            </select>

            {selectedOption && (
              <div>
                <h2>Вы выбрали: {selectedOption}</h2>
                <button onClick={handleReplaceManager}>Заменить</button>
              </div>
            )}
          </Modal>

          {pageLocation.pathname == '/main' && (
            <Settings onClick={handleOpenSetting} />
          )}
        </HeaderNameWrap>
      )}
    </HeaderConteiner>
  );
};

export default Header;
