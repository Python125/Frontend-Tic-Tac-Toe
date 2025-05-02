import { useState, useEffect } from 'react';
import { Box, Text, Grid, Button, Link } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { socket } from '../socket';
import { useParams, useNavigate } from 'react-router';

function TicTacToe() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const id = Number(gameId);
    const [board, setBoard] = useState(Array.from({ length: 3 }, () => Array(3).fill('')));
    const [user, setUser] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [winnerMessage, setWinnerMessage] = useState('');
    const [playerIndex, setPlayerIndex] = useState(null);

    useEffect(() => {
        socket.connect();
        console.log('Socket connected?', socket.connected);
        socket.emit('joinGame', id);

        socket.on('playerAssigned', (role) => {
            console.log('[PLAYER ASSIGNED]', role);
            setUser(role);
            setPlayerIndex(role === 'X' ? 0 : 1);
        });

        socket.on('updateBoard', ({ board, currentTurn }) => {
            setBoard(board);
            setCurrentTurn(currentTurn);
        });

        // socket.on('gameOver', ({ winner }) => {
        //     setGameOver(true);
        //     const isWinner = winner === playerIndex;
        //     const result = isWinner ? 'You win!' : 'You lose.';
        //     const type = isWinner ? 'success' : 'error';
        //     setWinnerMessage(result);
        //     toaster.create({ title: result, type });
        // });

        socket.on('gameDraw', () => {
            setGameOver(true);
            toaster.create({ title: "It's a draw.", type: 'info' });
        });

        // socket.on('rematchRequested', ({ board, currentTurn }) => {
        //     setBoard(board.flat());
        //     setGameOver(false);
        //     setCurrentTurn(currentTurn);
        //     toaster.create({ title: 'Rematch started', type: 'info' });
        // });

        // socket.on('error', ({ message }) => {
        //   toaster.create({ title: 'Error', description: message, type: 'error' });
        //   navigate('/games');
        // });

        return () => {
            socket.off('playerAssigned');
            socket.off('updateBoard');
            // socket.off('gameOver');
            socket.off('gameDraw');
            // socket.off('rematchRequested');
            // socket.off('error');
        };
    }, [id]);

    useEffect(() => {
        if (playerIndex === null) return;

        const handleGameOver = ({ winner }) => {
            setGameOver(true);
            const isWinner = winner === playerIndex;
            const result = isWinner ? 'You win!' : 'You lose.';
            const type = isWinner ? 'success' : 'error';
            setWinnerMessage(result);
            toaster.create({ title: result, type });
        };

        socket.on('gameOver', handleGameOver);
        return () => socket.off('gameOver', handleGameOver);
    }, [playerIndex]);

    const handleClick = (row, col) => {
        console.log('[HANDLE CLICK]', { user, currentTurn, board });
        if (board[row][col] !== '' || gameOver) return;
        console.log('Click:', { user, currentTurn, board });
        if ((user === 'X' && currentTurn !== 0) || (user === 'O' && currentTurn !== 1)) {
            toaster.create({ title: "Not your turn", type: 'warning' });
            return;
        }

        socket.emit('makeMove', { gameId: id, row, col });
    };

    const startNewGame = () => {
        socket.emit('startGame', id);
    };

    // const requestRematch = () => {
    //     socket.emit('requestRematch', id);
    // };

    const leaveGame = () => {
        socket.emit('leaveGame', id);
    };
    console.log('Frontend:', { board, user, currentTurn });

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='35vh' gap={3} marginTop='20px' color='white'>
            {winnerMessage && (
                <Text fontWeight='500' marginTop='60px' fontSize='3xl' color={winnerMessage === 'You win!' ? 'green.500' : 'red.500'}>{winnerMessage}</Text>
            )}
            <Text fontWeight='500' fontSize='2xl'>User: {user}</Text>
            <Text fontSize='md'>
                Current Turn: {currentTurn === 0 ? 'X' : 'O'} | You: {user} | {((user === 'X' && currentTurn === 0) || (user === 'O' && currentTurn === 1)) ? ' Your Turn' : ' Waiting...'}
            </Text>
            <Button backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{ backgroundColor: 'blue.600' }} onClick={startNewGame}>Start New Game</Button>
            <Grid templateColumns='repeat(3, 1fr)' width='300px' justifyItems='center' alignItems='center' backgroundColor='gray.600' opacity={gameOver ? 0.2 : 1}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <Box
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            height="100px"
                            width="100px"
                            border="white 1px solid"
                            fontSize="6xl"
                            cursor={gameOver ? 'not-allowed' : 'pointer'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="background-color 0.3s ease"
                            _hover={{ backgroundColor: 'gray.700' }}
                        >
                            {cell}
                        </Box>
                    ))
                )}
            </Grid>
            {gameOver && (
                <Link backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{ backgroundColor: 'blue.600' }} onClick={leaveGame} href='/games'>Back to Lobby</Link>
            )}
            {/* <Button backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{ backgroundColor: 'blue.600' }} onClick={requestRematch}>Request Rematch</Button> */}
            
        </Box>
    );
}

export default TicTacToe;