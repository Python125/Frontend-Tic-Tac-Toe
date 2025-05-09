import { React } from "react";
import { Text, Box, Container } from '@chakra-ui/react';
import TicTacToe from './TicTacToe';
import AuthHeader from './AuthHeader';

function SingleGamePage() {
    return (
        <Box backgroundColor='gray.900' height='100%'>
            <AuthHeader />
            <Container maxW={{ base: '95%', md: '80%', lg: '60%' }} py={1} px={1} centerContent>
                <Text fontWeight='500' fontSize={{ base: '3xl', md: '3xl' }} mt={{ base: 4, md: 6 }} color='white' textAlign='center'>Welcome to your game session</Text>
                <TicTacToe />
            </Container>
        </Box>
    )
}

export default SingleGamePage;