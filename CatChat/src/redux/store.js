import { configureStore } from '@reduxjs/toolkit';
import persistedAuthReducer from './rootReducer';

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import authMiddleware from './auth/authMiddleware';

export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // authMiddleware(),
  ],
});

export const persistor = persistStore(store);