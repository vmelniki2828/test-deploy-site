import { useSelector } from 'react-redux';
import { getUser, isAuthenticated,selectIsRefreshing } from '../redux/selectors';


export const useAuth = () => {
  return {
    user: useSelector(getUser),
    isAuth: useSelector(isAuthenticated),
    isRefreshing: useSelector(selectIsRefreshing),
  };
};
