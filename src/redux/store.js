import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactSlice } from './itemSlice';


const persistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter'],
}

const persistedReducer = persistReducer(persistConfig, contactSlice.reducer)

export const store = configureStore({
    reducer: {
      contacts: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      devTools: process.env.NODE_ENV !== 'development',
  });

  
export const persistor = persistStore(store);