import { io } from 'socket.io-client';

const apiURL = import.meta.env.VITE_URL;

console.log('Connecting socket to:', apiURL);

export const socket = io(apiURL, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
});