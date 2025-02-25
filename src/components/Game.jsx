import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Button, Box, Link, Input } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
console.log('API URL:', apiURL);

function Game({ gameId }) {
    const [game, setGame] = useState(null);
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            const response = await axios.get(`${apiURL}/games/${gameId}`);
            setGame(response.data);
        }
        fetchGame();
    }, [gameId]);
    
    const randomPlayer = (e) => {
        e.preventDefault();
        const randomPlayer = Math.random();
        if (randomPlayer === 0) {
            setCurrentPlayer('X');
        } else if (randomPlayer === 1) {
            setCurrentPlayer('O');
        }

        axios.post(`${apiURL}/games/${gameId}`, {
            setCurrentPlayer: currentPlayer,
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