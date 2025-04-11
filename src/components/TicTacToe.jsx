import { useState, useEffect } from 'react';
import { Box, Text, Grid, Button } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { socket } from '../socket';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [user, setUser] = useState(null);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newUser = Math.random() < 0.5 ? "X" : "O";
        setUser(newUser);
        console.log("Game started");
    }

    const handleClick = (i) => {
        if (board[i] !== null) {
            toaster.create({
                title: "Cell already filled",
                description: "Please choose another cell",
                type: "error",
            });
            return;
        }

        const newBoard = board.slice();
        newBoard[i] = user;
        setBoard(newBoard);
        toggleUser();
        console.log(newBoard);
    }

    const toggleUser = () => {
        if (user === "X") {
            setUser("O");
        } else {
            setUser("X");
        }
    }

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    const checkDraw = () => {}

    const requestRematch = () => {
        socket.connect();
        socket.emit('rematchRequested');

        setBoard(Array(9).fill(null));
        setUser(null);
        console.log("Rematch requested");
    }

    useEffect(() => {
        const onRematchRequested = () => {
            console.log("Rematch requested");
        }

        socket.on('rematchRequested', onRematchRequested);

        return () => {
            socket.off('rematchRequested', onRematchRequested);
        }
    }, []);

    const endGame = () => {
        if (checkWin()) {
            alert("You win!");
        } else if (checkDraw()) {
            alert("It's a draw!");
        } else {
            alert("You lose!");
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='35vh' gap={3}>
            <Text>User: {user}</Text>

            <Button onClick={startNewGame}>Start New Game</Button>
            <Grid templateColumns="repeat(3, 1fr)" width='300px' justifyItems='center' alignItems='center'>
                {board.map((cell, i) => (
                    <Box
                        key={i}
                        onClick={() => handleClick(i)}
                        height='100px'
                        width='100px'
                        border='black 1px solid'
                        fontSize='6xl'
                        cursor='pointer'
                        transition='background-color 0.3s ease'
                        _hover={{ backgroundColor: 'gray.200' }}
                    >
                        {cell}
                    </Box>
                ))}
            </Grid>
            <Button onClick={requestRematch}>Request Rematch</Button>
        </Box>
    )
}

export default TicTacToe;