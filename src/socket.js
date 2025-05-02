import { io } from 'socket.io-client';

const apiURL = import.meta.env.MODE === 'production' ? undefined : import.meta.env.VITE_URL;

if (import.meta.env.MODE !== 'production') {
    console.log('Socket URL:', apiURL);
}

export const socket = io(apiURL, {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,
});

socket.on('connect_error', (err) => {
    console.error('[SOCKET CONNECT ERROR]', err.message);
});