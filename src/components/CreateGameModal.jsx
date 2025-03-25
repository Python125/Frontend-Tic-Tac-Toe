import { useState, React, useEffect } from "react";
import { Input, Button, Dialog, CloseButton, Box, List, Link, Text } from '@chakra-ui/react';
import { toaster } from "./ui/toaster";
import axios from "axios";
import { useAccount } from "wagmi";
import { useDispatch } from 'react-redux';
import { addGame } from '../features/games/gameSlice';

const apiURL = import.meta.env.VITE_URL;
// console.log(apiURL);

function CreateGameModal() {
    const [games, setGames] = useState([]);
    const [gameInput, setGameInput] = useState('');
    const [gameAmount, setGameAmount] = useState('');
    const { isConnected } = useAccount();
    const dispatch = useDispatch();

    function submitGame(e) {
        e.preventDefault();
        if (!gameInput.trim()) return;

        const newGame = {
            id: games.length + 1,
            name: gameInput,
            maxParticipantCount: 2,
            minBuyInAmount: gameAmount,
            maxBuyInAmount: gameAmount,
            status: 'Active',
            // userId: Number(userId),
        }
        console.log(newGame);

        axios.post(`${apiURL}/games`, newGame).then(response => {
            dispatch(addGame(response.data));
            // setGames([...games, response.data]);
            setGameInput('');
            setGameAmount('');
        })
        // console.log('games',games);
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'>Create Challenge</Button>
                </Dialog.Trigger>
                <Dialog.Backdrop />
                <Dialog.Positioner justifyContent='center' alignItems='center'>
                    <Dialog.Content border='1px solid white' backgroundColor='#f2f2f2' color='white' width='500px' justifyContent='center' alignItems='center'>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" backgroundColor='#d9d9d9' color='black' />
                    </Dialog.CloseTrigger>
                    <Dialog.Header>
                        <Dialog.Title color='black'>Create New Challenge</Dialog.Title>
                    </Dialog.Header>
                        <Dialog.Body justifyContent='center' alignItems='center' onSubmit={submitGame}>
                            <Input color='white' width='85%' type="text" marginBottom='10px' marginTop='10px' placeholder="Enter new game" _placeholder={{ color: 'gray.600' }} onChange={setGameInput} value={gameInput} />
                            <Input color='white' width='85%' type="number" marginBottom='10px' marginTop='10px' placeholder="Enter amount" _placeholder={{ color: 'gray.600' }} onChange={setGameAmount} value={gameAmount} />
                            <Box>
                                <List.Root>
                                    {games.map(game => {
                                        return (
                                        <List.Item key={game.id}>
                                            {isConnected ? (
                                                <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/games/${game.id}`} color='white'>{game.name}</Link>
                                            ) : (
                                                <Text color='white'>{game.name}</Text>
                                            )}
                                        </List.Item>
                                        )
                                    })}
                                </List.Root>
                                <Button variant='outline' backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'
                                    onClick={() => toaster.create({
                                        title: 'Game created',
                                        description: 'Game created successfully',
                                        type: 'success',
                                    })}>
                                    Create
                                </Button>
                            </Box>

                        </Dialog.Body>
                        {/* <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" backgroundColor='white' color='black' />
                        </Dialog.CloseTrigger> */}
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    )
}

export default CreateGameModal;