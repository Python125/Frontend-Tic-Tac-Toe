import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    games: [],
}

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setAllGames: (state, action) => {
            state.games = action.payload;
        },
        addGame: (state, action) => {
            state.games.push(action.payload);
        }
    }
})

export const { setAllGames, addGame } = gameSlice.actions;
export default gameSlice.reducer;