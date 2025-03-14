import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: null,
    isConnected: false,
    isVerified: false,
    nonce: null,
    signature: null,
    error: null
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletConnection: (state, action) => {
            state.isConnected = action.payload;
        },
        setWalletNonce: (state, action) => {
            state.nonce = action.payload;
        },
        setWalletSignature: (state, action) => {
            state.signature = action.payload;
        },
        setWalletVerification: (state, action) => {
            state.isVerified = action.payload;
        },
        setWalletError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { setWalletConnection, setWalletNonce, setWalletSignature, setWalletVerification, setWalletError } = walletSlice.actions;
export default walletSlice.reducer;