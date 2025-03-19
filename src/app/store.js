import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../features/wallet/walletSlice';
import gameReducer from '../features/games/gameSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    game: gameReducer,
  },
})