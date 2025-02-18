import { useState, React, useEffect } from "react";
import { Text, Button, Box } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_API_URL;

function Game({ userId }) {
  const [games, setGames] = useState([]);
  const [gameInput, setGameInput] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${apiURL}/users/${userId}/games`);
      setGames(response.data);
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
      maxParticipantCount: [],
      minBuyInAmount: 0,
      maxBuyInAmount: 0,
      status: 'Active',
      userId: userId,
      seats: [],
    }
    console.log(newGame);

    axios.post(`${apiURL}/users/${userId}/games`, newGame).then(response => {
      setGames([...games, response.data]);
      setGameInput('');     
    })
  }

  return (
    <Box>
      <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Tic Tac Toe</Text>
      <form onSubmit={submitGame}>
        <Input type="text" width='200px' placeholder="Enter game name" onChange={addGame} value={gameInput} />
        <Button type='submit' marginLeft='5px' marginBottom='5px' width='70px' fontWeight='bold' onClick={submitGame}>Join Game</Button>
      </form>
      <ul>
        {games.map(game => {
          return (
            <h1>Hello</h1>
          )
        })}
      </ul>
    </Box>
  )
}

export default Game;