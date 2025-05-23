import { Box, Text, Button, Heading } from '@chakra-ui/react';
import ConnectWalletButton from './ConnectWalletButton';
import { useAccount, useDisconnect } from 'wagmi';

function AuthHeader() {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <Box color='white' height='64px' borderBottom='1px solid white' width='100%' backgroundColor='gray.900' display='flex' justifyContent='space-between' alignItems='center' padding='0 100px' position='sticky' top='0' zIndex='10'>
            <Heading size='xl' color='white'>Hardcore TicTacToe</Heading>
            {isConnected ? (
                <>
                    <Text marginLeft='67%'>{address}</Text>
                    <Button backgroundColor='gray.800' color='white' borderRadius='md' onClick={() => disconnect()}>Disconnect</Button>
                </>
            ) : (
                <ConnectWalletButton />
            )}
        </Box>
    )
}

export default AuthHeader;