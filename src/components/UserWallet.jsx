import { useAccount } from 'wagmi';
import { Box, Link } from '@chakra-ui/react';
import { Account } from './Account';
import WalletOptions from './WalletOptions';
import WalletVerification from './WalletVerification';

function UserWallet() {
    const { isConnected } = useAccount();

    return (
        <Box>
            {isConnected ? (
                <>
                    <Account />
                    <WalletVerification />
                    <Link backgroundColor='black' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>
                </>
            ) : (
                <>
                    <WalletOptions />
                    <br></br>
                    <Link backgroundColor='black' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>
                </>
            )}
        </Box>
    )
}

export default UserWallet;