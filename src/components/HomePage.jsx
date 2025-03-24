import { React } from 'react';
import AuthHeader from './AuthHeader';
import { Box, Heading, Link } from '@chakra-ui/react';
import ConnectWalletButton from './ConnectWalletButton';
import { useAccount } from 'wagmi';

function HomePage() {
    const { isConnected } = useAccount();

    return (
        <>
            <AuthHeader />
            <Box backgroundColor='gray.900' height='100%' justifyContent='center' alignItems='center' display='flex'>
                <Heading size='6xl' color='white'>Hardcore TicTacToe</Heading>
                <Box>
                    {!isConnected && 
                        <ConnectWalletButton />
                    }

                    <Link backgroundColor='black' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>
                </Box>
            </Box>
        </>
    )
}

export default HomePage;