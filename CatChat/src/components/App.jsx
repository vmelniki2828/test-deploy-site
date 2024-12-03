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
import TeamPage from 'Pages/Team/TeamPage';

const AuthPage = lazy(() => import('Pages/AuthPage/AuthPage'));
const ChatsPage = lazy(() => import('Pages/Chats/ChatsPage'));
const ArchivePage = lazy(() => import('Pages/Archive/ArchivePage'));

export const App = () => {
  const location = useLocation();
  const { isRefreshing } = useAuth();

 
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      {location.pathname === '/login' ? null : (
        <>
          <Header/>
          <SideBar />
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
                <ChatsPage/>
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
          <Route
            path="/team"
            element={
              <PrivateRoute>
                <TeamPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
