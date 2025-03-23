import { useAccount } from 'wagmi';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import WalletOptions from './WalletOptions';

function Header() {
    const { isConnected, address } = useAccount();
    const { signature } = useSelector(state => state.wallet);

    return (
        <Box position="fixed" top="0" left="0" right="0" bg="white" p={4} borderBottom="1px" borderColor="gray.200" zIndex="1000">
            <Flex justify="center" align="center" gap={4}>
                {isConnected ? (
                    <Box>
                        <Text fontWeight="bold">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</Text>
                        {signature && (
                            <Text color="green.500" fontSize="sm">Wallet Verified</Text>
                        )}

                        {/* {signature ? (
                            <>
                                <Text fontWeight="bold">Connected: {address}</Text>
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(address);
                                        alert("Address copied to clipboard");
                                    }}
                                    style={{ cursor: "pointer" }}
                                    title="Copy address to clipboard"
                                    size="sm"
                                    ml={2}
                                >
                                    Copy address
                                </Button>
                                <Text color="green.500" fontSize="sm">Wallet verified! Your data has been saved.</Text>
                            </>
                        ) : (
                            <Text>Please sign the message to verify your wallet ownership...</Text>
                        )} */}
                    </Box>
                ) : (
                    <WalletOptions />
                )}
            </Flex>
        </Box>
    );
}

export default Header;