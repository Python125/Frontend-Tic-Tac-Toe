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

    // function randomPlayer() {
    //     if (player1 === 'X') {
    //         setPlayer1('X');
    //         setPlayer2('O');
    //     } else if (player1 === 'O') {
    //         setPlayer1('O');
    //         setPlayer2('X');
    //     }
    // }

    const startGame = (e) => {
        e.preventDefault();
    }

    // const handleClick = (e) => {
    //     e.preventDefault();
    // }

    return (
        <Box>
            <Text fontWeight='bold' fontSize='2xl'>Welcome to your game session</Text>
            <Button type="submit" variant='solid' marginTop='1rem' _hover={{backgroundColor: 'gray.600'}} onClick={startGame}>Start Game</Button>
            {/* <form onSubmit={randomPlayer}>
                <Text fontWeight='bold' fontSize='xl' marginTop='0.5rem' color='black'>Choose a player</Text>
                <Button type="submit" variant='solid' colorScheme='blue' marginRight='1rem' marginTop='1rem'>X</Button>
                <Button type="submit" variant='solid' colorScheme='blue' marginRight='1rem' marginTop='1rem'>O</Button>
            </form> */}
        </Box>
    )
}

export default Game;