import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Button, Box, Link, Input } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
console.log('API URL:', apiURL);

function Game({ gameId }) {
    const [gameSession, setGameSession] = useState([]);
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    useEffect(() => {
        const fetchGameSession = async () => {
            const response = await axios.get(`${apiURL}/games/${gameId}`);
            setGameSession(response.data);
        }
        fetchGameSession();
    }, [gameId]);

    function choosePlayer() {
        if (player1 === 'X') {
            setPlayer1('X');
            setPlayer2('O');
        } else if (player1 === 'O') {
            setPlayer1('O');
            setPlayer2('X');
        }
    }

    return (
        <Box>
            <Text fontWeight='bold' fontSize='2xl'>Welcome to your game session</Text>
            <form onSubmit={choosePlayer}>
                <Text fontWeight='bold' fontSize='xl' marginTop='0.5rem' color='black'>Choose your player</Text>
                <Button type="submit" variant='solid' colorScheme='blue' marginRight='1rem' marginTop='1rem'>Player 1</Button>
                <Button type="submit" variant='solid' colorScheme='blue' marginRight='1rem' marginTop='1rem'>Player 2</Button>
            </form>
        </Box>
    )
}

export default Game;