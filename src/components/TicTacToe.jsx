import { useState, useEffect } from 'react';
import { Box, Text, Grid, Button, Link } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { socket } from '../socket';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [user, setUser] = useState(null);

    const startNewGame = () => {
        const newUser = Math.random() < 0.5 ? "X" : "O";
        setUser(newUser);

        socket.connect();
        socket.emit('startGame', 213);
    }

    const handleClick = (i) => {
        socket.connect();
        socket.emit('makeMove', 213);

        if (board[i] !== null) {
            toaster.create({
                title: "Cell already filled",
                description: "Please choose another cell",
                type: "error",
            });
            return;
        }

        const newBoard = board.slice();
        newBoard[i] = user; // Player's symbol is added to the board
        setBoard(newBoard); // Updates the board to reflect the change you made

        if (checkWin(newBoard, user)) {
            toaster.create({
                title: "You win!",
                type: "success",
            });
            socket.emit('gameWon', 213);
            endGame();
            return;
        } else if (checkDraw(newBoard)) {
            toaster.create({
                title: "It's a draw.",
                type: "info",
            });
            socket.emit('gameDraw', 213);
            endGame();
            return;
        }

        toggleUser();
        console.log(board);
    }

    const toggleUser = () => {
        if (user === "X") {
            setUser("O");
        } else {
            setUser("X");
        }
    }

    const checkWin = (boardState, player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
          ];

        return winPatterns.some(pattern => { // Checks if any of the patterns "match"
            return pattern.every(index => boardState[index] === player);
        });
    }

    const checkDraw = (board) => {
        return board.every(cell => cell !== null);
    }

    const endGame = () => {
        socket.connect();
        socket.emit('endGame', 213);
    }

    const requestRematch = () => {
        socket.connect();
        socket.emit('requestRematch', 213);

        setBoard(Array(9).fill(null));
        setUser(null);
        console.log("Rematch requested");
    }

    // useEffect(() => { // LEAVE COMMENTED OUT FOR NOW
    //     const onRematchRequested = () => {
    //         console.log("Rematch requested");
    //     }

    //     socket.on('rematchRequested', onRematchRequested);

    //     return () => {
    //         socket.off('rematchRequested', onRematchRequested);
    //     }
    // }, []);

    const leaveGame = () => {
        socket.connect();
        socket.emit('leaveGame', 213);
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='35vh' gap={3} marginTop='20px' color='white'>
            <Text fontWeight='500' fontSize='2xl' marginTop='20px'>User: {user}</Text>
            <Button backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{backgroundColor: 'blue.600'}} onClick={startNewGame}>Start New Game</Button>
            <Grid templateColumns="repeat(3, 1fr)" width='300px' justifyItems='center' alignItems='center' backgroundColor='gray.600'>
                {board.map((cell, i) => (
                    <Box
                        key={i}
                        onClick={() => handleClick(i)}
                        height='100px'
                        width='100px'
                        border='white 1px solid'
                        fontSize='6xl'
                        cursor='pointer'
                        transition='background-color 0.3s ease'
                        _hover={{ backgroundColor: 'gray.00' }}
                    >
                        {cell}
                    </Box>
                ))}
            </Grid>
            <Button backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{backgroundColor: 'blue.600'}} onClick={requestRematch}>Request Rematch</Button>
            <Link backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{backgroundColor: 'blue.600'}} onClick={leaveGame} href='/games'>Leave Game</Link>
        </Box>
    )
}

export default TicTacToe;