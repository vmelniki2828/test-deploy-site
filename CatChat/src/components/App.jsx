import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken, selectUserUsername } from '../redux/selectors';
import { useAuth } from 'hooks/useAuth';
import { Load } from './App.styled';
import { getCurrentUserTokenThunk } from '../redux/user/userActions';
import PrivateRoute from './Guard/PrivateRoute';
import PublicRoute from './Guard/PublicRoute';
import { MutatingDots } from 'react-loader-spinner';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import WidgetIcon from './Widget/WidgetIcon/WidgetIcon';
import axios from 'axios';
import { socket } from 'services/API';

const AuthPage = lazy(() => import('Pages/AuthPage/AuthPage'));
const ChatsPage = lazy(() => import('Pages/Chats/ChatsPage'));
const ArchivePage = lazy(() => import('Pages/Archive/ArchivePage'));

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(selectAccessToken);
  const { isRefreshing } = useAuth();
  const [changePage, setChangePage] = useState(true);
  const [messages, setMessages] = useState({});

  const uname = useSelector(selectUserUsername);
  const [chats, setChats] = useState([]);

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

  useEffect(() => {
    handleSearch();

    // Прослушивание события "newChat" и обновление списка чатов
    socket.on('newChat', (newRoom) => {
      // Only add to the chat list if the manager is part of the room
      if (newRoom.managers.some(manager => manager.username === uname)) {
        setChats(prevChats => [...prevChats, newRoom]);
      }
    });

    socket.on('update_chats', () => {
      handleSearch();
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off('newChat');
      socket.off('update_chats');
    };
  }, []);
  
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      {location.pathname === '/login' ? null : (
        <>
          <Header />
          {changePage && <SideBar setChangePage={setChangePage} />}
        </>
      )}
      <Suspense
        fallback={
          <Load>
            <MutatingDots
              height="100"
              width="100"
              color="#AFFFB7"
              secondaryColor="#AFFFB7"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
            />
          </Load>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <ChatsPage chats={chats} />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/widget"
            element={
              <PublicRoute>
                <WidgetIcon />
              </PublicRoute>
            }
          />
          <Route
            path="/archive"
            element={
              <PrivateRoute>
                <ArchivePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
