import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../features/wallet/walletSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wallet'],
}

const persistedReducer = persistReducer(persistConfig, walletReducer);

export const store = configureStore({
  reducer: {
    wallet: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);