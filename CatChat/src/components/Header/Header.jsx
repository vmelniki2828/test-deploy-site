import {
  HeaderConteiner,
  AllChatsName,
  HeaderIcon,
  HeaderIconWrap,
  HeaderName,
  HeaderNameWrap,
  ChatsNameWrap,
} from './Header.styled';
import MainIcon from '../../images/Union.png';
import { socket } from 'services/API';
import { selectUserUsername } from '../../redux/selectors';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal/Modal';

const Header = () => {
  const uname = useSelector(selectUserUsername);
  const currentChat = useSelector(state => state.chat.currentChat);
  const [showModal, setShowModal] = useState(false);

  console.log(currentChat);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [manager, setManager] = useState(null); // Установил начальное состояние как null
  const [allManagers, setAllManagers] = useState();

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleManagers = async () => {
    try {
      const response = await axios.get(`https://chat.cat-tools.com/api/managers`);
      setAllManagers(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://chat.cat-tools.com/api/rooms/${uname}`
      );
      setChats(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const handleManager = async () => {
    try {
      const response = await axios.get(
        `https://chat.cat-tools.com/api/managers/${uname}`
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

    fetch('https://chat.cat-tools.com/api/managers')
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
        `https://chat.cat-tools.com/api/rooms/${currentChat?.roomId}/replace-manager`,
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
        {manager?.manager === null ? (
          <button onClick={() => joinChat(uname)}>Join Manager</button>
        ) : (
          <button onClick={() => removeManager(uname)}>Remove Manager</button>
        )}
        <button
          onClick={() => {
            openModal();
            handleManagers();
          }}
        >
          Открыть модальное окно
        </button>

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
      </HeaderNameWrap>
    </HeaderConteiner>
  );
};

export default Header;
