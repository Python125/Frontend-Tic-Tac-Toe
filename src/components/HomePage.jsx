import { React } from 'react';
import AuthHeader from './AuthHeader';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import ConnectWalletButton from './ConnectWalletButton';
import { useAccount } from 'wagmi';
// import UserWallet from './UserWallet';
import WalletVerification from './WalletVerification';

function HomePage() {
    const { isConnected, isVerified } = useAccount();

    return (
        <>
            <AuthHeader />
            <Box backgroundColor='gray.900' height='100%' justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
                <Heading fontWeight='400' size='6xl' color='white'>Hardcore TicTacToe</Heading>
                <Text fontWeight='300' color='white' fontSize='2xl'>Your gateway to decentralized gaming</Text>
                {/* <UserWallet />*/}
                {isConnected && !isVerified && (
                    <WalletVerification />
                )}
                <Box display='flex' gap='1rem' justifyContent='center' alignItems='center' marginTop='1rem'>
                    {!isConnected &&
                        <ConnectWalletButton />
                    }

                    <Link backgroundColor='gray.900' color='white' border='1px solid white' borderRadius='md' padding='0.5rem' href={'/games'}>See Games</Link>
                </Box>
            </Box>
        </>
    )
}

export default HomePage;