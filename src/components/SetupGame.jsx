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

    const randomPlayer = (e) => {
        e.preventDefault();
        const randomPlayer = Math.random();
        if (randomPlayer === 0) {
            setPlayer1('X');
            setPlayer2('O');
        } else if (randomPlayer === 1) {
            setPlayer1('O');
            setPlayer2('X');
        }

        axios.post(`${apiURL}/games/${gameId}`, {
            setPlayer1: player1,
            setPlayer2: player2,
        })
    }

    // const placePiece = (e) => {
    //     e.preventDefault();
    // }

    return (
        <Box>
            <form onSubmit={randomPlayer}>
                <Text fontWeight='bold' fontSize='2xl'>Welcome to your game session</Text>
                <Button type="submit" variant='solid' href={'/'} marginTop='1rem' _hover={{backgroundColor: 'gray.600'}}>Start Game</Button>
            </form>
        </Box>
    )
}

export default Game;