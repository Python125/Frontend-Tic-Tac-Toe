import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Button, Box, Link, Input } from '@chakra-ui/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider, useAccount } from 'wagmi';
// import { config } from '../wagmi.config';
// import { Account } from './account';
// import WalletOptions from './wallet-options';

const apiURL = import.meta.env.VITE_URL;
console.log('API URL:', apiURL);

function Game({ gameId }) {
    // const [game, setGame] = useState(null);
    // const [players, setPlayers] = useState([]);
    // const [currentPlayer, setCurrentPlayer] = useState('');

    // useEffect(() => {
    //     const fetchGame = async () => {
    //         const response = await axios.get(`${apiURL}/games/${gameId}`);
    //         setGame(response.data);
    //     }
    //     fetchGame();
    // }, [gameId]);
    
    // const randomPlayer = (e) => {
    //     e.preventDefault();
    //     const randomPlayer = Math.random();
    //     if (randomPlayer === 0) {
    //         setCurrentPlayer('X');
    //     } else if (randomPlayer === 1) {
    //         setCurrentPlayer('O');
    //     }

    //     axios.post(`${apiURL}/games/${gameId}`, {
    //         setCurrentPlayer: currentPlayer,
    //     })
    // }

    // const placePiece = (e) => {
    //     e.preventDefault();
    // }

    // function ConnectWallet() {
    //     const { isConnected } = useAccount();
    //     if (isConnected) return <Account />;
    //     return <WalletOptions />;
    // }

    // const queryClient = new QueryClient();

    return (
        <Box>
            {/* <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}> */}
                    {/* <ConnectWallet /> */}
                    <Text fontWeight='bold' fontSize='2xl'>Welcome to your game session</Text>
                    <Button type="submit" variant='solid' href={'/'} marginTop='1rem' _hover={{backgroundColor: 'gray.600'}}>Join Game</Button>
                {/* </QueryClientProvider>
            </WagmiProvider> */}
        </Box>
    )
}

export default Game;