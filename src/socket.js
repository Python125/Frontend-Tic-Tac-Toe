import { io } from 'socket.io-client';

const apiURL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_SOCKET_URL : import.meta.env.VITE_URL;

console.log('Connecting socket to:', apiURL);

// if (import.meta.env.MODE !== 'production') {
//     console.log('Socket URL:', apiURL);
// }

export const socket = io(apiURL, {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,
});