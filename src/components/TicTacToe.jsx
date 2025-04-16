import { useState, useEffect } from 'react';
import { Box, Text, Grid, Button, Link } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { socket } from '../socket';
import { useSelector } from 'react-redux';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [user, setUser] = useState(null);
    const gameId = useSelector(state => state.games.gameId);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        socket.connect();
        socket.emit('startGame', 174);
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

        if (checkWin(newBoard, user)) {
            toaster.create({
                title: "You win!",
                description: "You won the game!",
                type: "success",
            });
            socket.emit('gameWon', gameId);
        } else if (checkDraw(newBoard)) {
            toaster.create({
                title: "It's a draw!",
                description: "The game is a draw!",
                type: "info",
            });
            socket.emit('gameDraw', gameId);
            return;
        }

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

        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === user);
        });
    }

    const checkDraw = (board) => {
        return board.every(cell => cell !== null);
    }

    const requestRematch = () => {
        socket.connect();
        socket.emit('requestRematch', 173);

        setBoard(Array(9).fill(null));
        setUser(null);
        console.log("Rematch requested", gameId);
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

    const leaveGame = () => {
        socket.connect();
        socket.emit('leaveGame', 173);
    }

    useEffect(() => {
        const onGameLeft = () => {
            console.log("Left game");
        }

        socket.on('gameLeft', onGameLeft);

        return () => {
            socket.off('gameLeft', onGameLeft);
        }
    }, []);

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='35vh' gap={3} marginTop='20px'>
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
            <Link onClick={leaveGame} href='/games' backgroundColor='black' color='white' padding='10px' borderRadius='md' _hover={{backgroundColor: 'gray.800'}}>Leave Game</Link>
        </Box>
    )
}

export default TicTacToe;