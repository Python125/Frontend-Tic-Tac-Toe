import { useState, React, useEffect } from "react";
import { Input, Button, Dialog, CloseButton } from '@chakra-ui/react';
import { toaster } from "./ui/toaster";
import axios from "axios";
import { useAccount } from "wagmi";
import { useDispatch } from 'react-redux';
import { addGame } from '../features/games/gameSlice';
import { socket } from '../socket';

const apiURL = import.meta.env.VITE_URL;

function CreateGameModal() {
    const [gameInput, setGameInput] = useState('');
    const [gameAmount, setGameAmount] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { address } = useAccount();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (!gameInput.trim()) return;

        const newGame = {
            name: gameInput,
            maxParticipantCount: 2,
            minBuyInAmount: parseFloat(gameAmount),
            maxBuyInAmount: parseFloat(gameAmount),
            status: 'Active',
            walletAddress: address
        }

        axios.post(`${apiURL}/games`, newGame).then(response => {
            const createdGame = {
                ...response.data,
                user: { username: address },
            };

            socket.connect();
            socket.emit('createGame', createdGame.id);

            dispatch(addGame(createdGame));
            setGameInput('');
            setGameAmount('');
            setIsDialogOpen(false);
            toaster.create({
                title: 'Game created',
                description: 'Game created successfully',
                type: 'success',
            });
        })
        .catch(error => {
            toaster.create({
                title: 'Error',
                description: error.response.data.message,
                type: 'error',
            });
        });
    }

    useEffect(() => {
        const onGameConfirmed = (data) => console.log(data);
        socket.on('gameConfirmed', onGameConfirmed);
        return () => socket.off('gameConfirmed', onGameConfirmed);
    }, []);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <Button backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'>Create Challenge</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner justifyContent='center' alignItems='center'>
                <Dialog.Content border='1px solid white' backgroundColor='#f2f2f2' color='white' width='500px'>
                <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" backgroundColor='#d9d9d9' color='black' />
                </Dialog.CloseTrigger>
                <Dialog.Header>
                    <Dialog.Title color='black'>Create New Challenge</Dialog.Title>
                </Dialog.Header>
                    <Dialog.Body>
                        <Input color='black' width='85%' type="text" marginBottom='10px' marginTop='10px' placeholder="Enter new game" _placeholder={{ color: 'gray.600' }} value={gameInput} onChange={(e) => setGameInput(e.target.value)} />
                        <Input color='black' width='85%' type="number" marginBottom='10px' marginTop='10px' placeholder="Enter amount" _placeholder={{ color: 'gray.600' }} value={gameAmount} onChange={(e) => setGameAmount(e.target.value)} />                            
                        <Button variant='outline' backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' marginTop='20px' size='lg'onClick={handleSubmit}>Create</Button>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

export default CreateGameModal;