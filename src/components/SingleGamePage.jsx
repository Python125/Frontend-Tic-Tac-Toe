import { React } from "react";
import { Text, Box } from '@chakra-ui/react';
import TicTacToe from './TicTacToe';
import AuthHeader from './AuthHeader';

function SingleGamePage() {
    return (
        <Box backgroundColor='gray.900' height='100%' display='flex' flexDirection='column'>
            <AuthHeader />
            <Text fontWeight='500' fontSize='2xl' marginTop='20px' color='white'>Welcome to your game session</Text>
            <TicTacToe />
        </Box>
    )
}

export default SingleGamePage;