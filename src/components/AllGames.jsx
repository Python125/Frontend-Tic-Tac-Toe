import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Box, Link, Input } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from '../wagmi.config';
import { Account } from './Account';
import WalletOptions from './WalletOptions';

const apiURL = import.meta.env.VITE_URL;
// console.log(`API URL: ${apiURL}`);

// function GameList({ userId }) {}
function GameList() {
  const [games, setGames] = useState([]);
  const [gameInput, setGameInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${apiURL}/games`);
      const gamesData = Array.isArray(response.data) ? response.data : [];
      setGames(gamesData);
    }
    fetchGames();
  }, []);

  function addGame(e) {
    setGameInput(e.target.value);
  }

  function submitGame(e) {
    e.preventDefault();
    if (!gameInput.trim()) return;

    const newGame = {
      id: games.length + 1,
      name: gameInput,
      maxParticipantCount: 2,
      minBuyInAmount: 0,
      maxBuyInAmount: 0,
      status: 'Active',
      // userId: Number(userId),
    }
    console.log(newGame);

    axios.post(`${apiURL}/games`, newGame).then(response => {
      setGames([...games, response.data]);
      setGameInput('');
    })
  }
  // console.log('games',games);

  function ConnectWallet() {
    const { isConnected } = useAccount();
    useEffect(() => {
      setIsConnected(isConnected);
    }, [isConnected]);
    if (isConnected) return <Account />;
    return <WalletOptions />;
  }

  const queryClient = new QueryClient();

  return (
    <Box>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />

          {isConnected && (
            <>
              <Text fontWeight='bold' fontSize='2xl'>Create a new game</Text>
              <form onSubmit={submitGame}>
                <Input type="text" width='200px' marginBottom='10px' marginTop='10px' placeholder="Enter new game" onChange={addGame} value={gameInput} />
              </form>
            </>
          )}

          <Text fontWeight='bold' fontSize='2xl'>Join or Observe a game below</Text>
          <ul>
            {games.map(game => {
              return (
                <li key={game.id}>
                  {isConnected ? (
                    <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/games/${game.id}`} color='black'>{game.name}</Link>
                  ) : (
                    <Text color='gray.800'>{game.name}</Text>
                  )}
                </li>
              )
            })}
          </ul>

          </QueryClientProvider>
        </WagmiProvider>
    </Box>
  )
}

export default GameList;