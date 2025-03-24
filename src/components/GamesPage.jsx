import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Box, Link } from '@chakra-ui/react';
// import { QueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import AuthHeader from './AuthHeader';
import CreateGameModal from './CreateGameModal';

const apiURL = import.meta.env.VITE_URL;

function GamesPage() {
  const [games, setGames] = useState([]);
  const [gameInput, setGameInput] = useState('');
  const { isConnected } = useAccount();

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

  return (
    <>
      <AuthHeader />
      <Box backgroundColor='gray.900' color='white' display='flex' justifyContent='space-between' padding='0 500px'>
        {isConnected && (
          <>
            <Text fontWeight='300' fontSize='2xl' marginTop='20px'>Available Games</Text>
            <CreateGameModal />
          </>
        )}
      </Box>

      <Box backgroundColor='gray.900' height='100%' color='white'>
        <ul>
          {games.map(game => {
            return (
              <li key={game.id}>
                {isConnected ? (
                  <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/games/${game.id}`} color='white'>{game.name}</Link>
                ) : (
                  <Text color='white'>{game.name}</Text>
                )}
              </li>
            )
          })}
        </ul>
      </Box>
    </>
  )
}

export default GamesPage;