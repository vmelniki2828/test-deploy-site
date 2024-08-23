import sessionStorage from 'redux-persist/lib/storage/session';
import persistReducer from "redux-persist/es/persistReducer";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import chatReducer from './Chat/chatSlice';

import {combineReducers} from 'redux';


const persistConfig = {
  key: 'token',
  version: 1,
  storage: sessionStorage,
  whitelist: ["auth", "user","profile", 'chat'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user : userReducer,
  chat: chatReducer,
});

const persistedAuthReducer = persistReducer(persistConfig, rootReducer)

  
  export default persistedAuthReducer;