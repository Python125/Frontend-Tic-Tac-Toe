import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Input, Box, Link, Button, Dialog, Portal } from '@chakra-ui/react';
// import { QueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import AuthHeader from './AuthHeader';

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

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'>Create Challenge</Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content border='1px solid white' backgroundColor='gray.700' color='white' width='500px'>
                  <Dialog.Body>
                    <Input color='white' type="text" marginBottom='10px' marginTop='10px' placeholder="Enter new game" onChange={addGame} value={gameInput} />
                  </Dialog.Body>
                  <Dialog.Footer justifyContent='center'>
                    <Button backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'>Create Challenge</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
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