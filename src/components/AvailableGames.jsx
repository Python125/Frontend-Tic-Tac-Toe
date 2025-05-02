import { useState, React, useEffect } from "react";
import { Box, List, Text, Container, Link, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useSelector } from 'react-redux';
import { socket } from '../socket';

// const apiURL = import.meta.env.VITE_URL;

function AvailableGames() {
    const games = useSelector((state) => state.games.games);
    const { isConnected } = useAccount();

    console.log(games);

    function handleGameJoined(gameId) {
        socket.connect();
        socket.emit('joinGame', gameId);
    }

    useEffect(() => {
        const onGameJoined = (data) => {
            console.log(data);
        }

        socket.on('gameJoined', onGameJoined);

        return () => {
            socket.off('gameJoined', onGameJoined);
        }
    }, []);
    
    return (
        <Box display='flex' flexDirection="column" justifyContent='center'>
            <List.Root>
                {games.map(game => {
                    return (
                        <List.Item key={game.id}>
                            {isConnected ? (
                                <Box>
                                    <Container display='flex' justifyContent='space-between' alignItems='center' backgroundColor='gray.600' padding='10px' borderRadius='md' color='white' width='45%' height='70px' marginTop='20px'>
                                        <Flex flex='1' flexDirection='column' justifyContent='flex-start' alignItems='flex-start' marginLeft='5px'>
                                            <Text fontSize='lg' textDecoration='none'>{game.name}</Text>
                                            {game.user && (
                                                <Text fontSize='sm' textDecoration='none'>{game.user.username}</Text>
                                            )}
                                        </Flex>
                                        <Text fontSize='lg' textDecoration='none' marginRight='10px'>{game.maxBuyInAmount} ETH</Text>
                                        <Link backgroundColor='gray.800' color='white' fontSize='lg' padding='10px' borderRadius='md' _hover={{backgroundColor: 'blue.600'}} href={`/games/${game.id}`} onClick={() => handleGameJoined(game.id)}>Accept</Link>
                                    </Container>
                                </Box>
                            ) : (
                                <Box>
                                    <Container display='flex' justifyContent='space-between' alignItems='center' backgroundColor='gray.600' padding='10px' borderRadius='md' color='white' width='45%' height='70px' marginTop='20px'>
                                        <Flex flex='1'>
                                            <Text fontSize='lg' textDecoration='none'>{game.name}</Text>
                                        </Flex>
                                        <Text fontSize='lg' textDecoration='none' marginRight='10px'>{game.maxBuyInAmount} ETH</Text>
                                    </Container>
                                </Box>
                            )}
                        </List.Item>
                    )
                })}
            </List.Root>
        </Box>
    )
}

export default AvailableGames;