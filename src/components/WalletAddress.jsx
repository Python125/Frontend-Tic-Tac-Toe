import { useAccount, useSignMessage } from 'wagmi';
import { Box } from '@chakra-ui/react';
import WalletVerification from './WalletVerification';

function WalletAddress() {
    const { address } = useAccount();
    const { data: signature, signMessage } = useSignMessage();
    
    return (
        <Box>
            <WalletVerification />
            {signature ? (
                <>
                    <p>Address: {address}</p>
                    {/* <p>Nonce: {nonce}</p> */}
                    {/* <p>Signature: {signature}</p> */}
                    <p>Wallet verified! Your data has been saved.</p>
                </>
            ) : (
                <p>Please sign the message to verify your wallet ownership...</p>
            )}
        </Box>
    )
}

export default WalletAddress;