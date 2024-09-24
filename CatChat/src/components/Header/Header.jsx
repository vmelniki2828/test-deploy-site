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

import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from './Modal/Modal';
import { Manager } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const Header = ({ selectedChat }) => {
  const uname = useSelector(selectUserUsername);
  const currentChat = useSelector(state => state.chat.currentChat);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [manager, setManager] = useState(null); // Установил начальное состояние как null
  const [allManagers, setAllManagers] = useState();
  const [openSettings, setOpenSettings] = useState(false);
  const modalRef = useRef(null);

  const pageLocation = useLocation();

  const [selectedOption, setSelectedOption] = useState('');

  console.log(selectedChat);

  const handleOpenSetting = () => {
    setOpenSettings(prev => !prev);
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenSettings(false); // Закрыть модальное окно при клике снаружи
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

  const handleManagers = async () => {
    try {
      const response = await axios.get(
        `https://chat.cat-tools.com/api/managers`
      );
      setAllManagers(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

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

  const handleManager = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/managers/${uname}`
      );
      setManager(response.data); // Обновил состояние менеджера
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  useEffect(() => {
    handleManager();
  }, []);

  useEffect(() => {
    handleSearch();

    // Прослушивание события "newChat" и обновление списка чатов
    socket.on('newChat', newRoom => {
      setChats(prevChats => [...prevChats, newRoom]);
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off('newChat');
    };
  }, []);

  const joinChat = username => {
    if (username.trim() !== '') {
      socket.emit('join_manager', username.trim());
    }

    fetch('http://localhost:8000/api/managers')
      .then(response => {
        if (!response.ok) {
          throw new Error(
            'Не удалось загрузить список пользователей: ' + response.status
          );
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Произошла ошибка при загрузке данных:', error.message);
      });

    // Обновляем состояние после присоединения менеджера
    setManager(prev => ({ ...prev, manager: username }));
  };

  const removeManager = username => {
    if (username.trim() !== '') {
      socket.emit('delete_manager', username.trim());
    }

    // Обновляем состояние после удаления менеджера
    setManager(prev => ({ ...prev, manager: null }));
  };

  const handleReplaceManager = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/rooms/${currentChat?.roomId}/replace-manager`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldManagerUsername: currentChat?.managers[0]?.username,
            newManagerUsername: selectedOption,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Ошибка при замене менеджера', error);
      console.log('Не удалось заменить менеджера');
    }
  };

  const handleDisconnectChat = () => {
    const roomId = selectedChat.roomId; // Получите ID комнаты, которую нужно отключить
    socket.emit('disconnect_chat', roomId);
  };

  return (
    <HeaderConteiner>
      <HeaderIconWrap>
        <HeaderIcon src={MainIcon} alt="UserImg" />
      </HeaderIconWrap>
      <ChatsNameWrap>
        <AllChatsName>All Chats</AllChatsName>
      </ChatsNameWrap>

      <HeaderNameWrap>
        <HeaderName>
          {currentChat ? currentChat?.clients?.username : ''}
        </HeaderName>

        {pageLocation.pathname !== '/archive' ? (
          openSettings ? (
            <ModalWindow ref={modalRef}>
              {manager?.manager === null ? (
                <SettingsStyle onClick={() => joinChat(uname)}>
                  <ManagerIcon />
                  Join Manager
                </SettingsStyle>
              ) : (
                <SettingsStyle onClick={() => removeManager(uname)}>
                  <ManagerIcon />
                  Remove Manager
                </SettingsStyle>
              )}
              <SettingsStyle
                onClick={() => {
                  openModal();
                  handleManagers();
                }}
              >
                <OpenModal /> Открыть модальное окно
              </SettingsStyle>
              <SettingsStyle onClick={handleDisconnectChat}>
                <CloseChat />
                Отключить чат
              </SettingsStyle>
            </ModalWindow>
          ) : null
        ) : (
          <></>
        )}

        <Modal show={showModal}>
          <button onClick={closeModal}>X</button>
          <h1>Выберите вариант</h1>

          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="" disabled>
              -- Выберите вариант --
            </option>
            {allManagers?.map(man => {
              if (man.username != uname) {
                return <option>{man.username}</option>;
              }
            })}
          </select>

          {selectedOption && (
            <div>
              <h2>Вы выбрали: {selectedOption}</h2>
              <button
                onClick={() => {
                  handleReplaceManager();
                  closeModal();
                }}
              >
                Заменить
              </button>
            </div>
          )}
        </Modal>

        {pageLocation.pathname !== '/archive' ? (
          <Settings onClick={handleOpenSetting} />
        ) : (
          <></>
        )}
      </HeaderNameWrap>
    </HeaderConteiner>
  );
};

export default Header;
