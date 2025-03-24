import { Box, Text, Button } from '@chakra-ui/react';
import ConnectWalletButton from './ConnectWalletButton';
import { useAccount, useDisconnect } from 'wagmi';

function AuthHeader() {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <Box color='white' height='64px' width='100%' backgroundColor='gray.900'>
            {isConnected ? (
                <>
                    <Button onClick={() => disconnect()}>Disconnect</Button>
                    <Text>Address: {address}</Text>
                </>
            ) : (
                <ConnectWalletButton />
            )}
        </Box>
    )
}

export default AuthHeader;