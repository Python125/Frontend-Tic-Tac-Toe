import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Box, Link, Input } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
// console.log('API URL:', apiURL);

function GameList({ userId }) {
  const [games, setGames] = useState([]);
  const [gameInput, setGameInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${apiURL}/games`);
      const gamesData = Array.isArray(response.data) ? response.data : [];
      setGames(gamesData);
      setUsername(response.data.username || '');
    }
    fetchGames();
  }, [userId]);

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
      userId: userId,
    }
    console.log(newGame);

    axios.post(`${apiURL}/games`, newGame).then(response => {
      setGames([...games, response.data]);
      setGameInput('');
    })
  }

  return (
    <Box>
      <Text fontWeight='bold' fontSize='2xl'>Games</Text>
      <form onSubmit={submitGame}>
        <Input type="text" width='200px' placeholder="Enter game name" onChange={addGame} value={gameInput} />
        <Text fontWeight='bold' fontSize='xl' marginTop='0.5rem' color='black'>Join a game below</Text>
      </form>
      <ul>
        {games.map(game => {
          return (
            <li key={game.id}>
              <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/${userId}/${game.id}`} color='black'>{game.name}</Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default GameList;