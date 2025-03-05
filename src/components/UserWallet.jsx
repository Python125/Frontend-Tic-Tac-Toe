import { useAccount } from 'wagmi';
import { Text, Box, Link } from '@chakra-ui/react';
import { Account } from './Account';
import WalletOptions from './WalletOptions';
import { useParams } from 'react-router';

function ConnectWallet() {
    const { isConnected } = useAccount();
    const { userId } = useParams();

    return (
        <Box>
            {isConnected ? (
                <>
                    <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Wallet is connected</Text>
                    <Account />
                    <Link backgroundColor='black' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={`/users`}>Add Username</Link>
                </>
            ) : (
                <>
                    <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Connect your wallet to create and join games</Text>
                    <WalletOptions />
                </>
            )}
            <div>
                {isConnected && <Link backgroundColor='black' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>}
            </div>
        </Box>
    )
}

export default ConnectWallet;