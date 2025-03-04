import { Text, Box, Link } from '@chakra-ui/react';
import { useState, React, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from '../wagmi.config';
import { Account } from './account';
import WalletOptions from './WalletOptions';

function HomePage() {
    const [isConnected, setIsConnected] = useState(false);

    function ConnectWallet() {
        const { isConnected } = useAccount();
        useEffect(() => {
          setIsConnected(isConnected);
        }, [isConnected]);
        if (isConnected) return <Account />;
        return <WalletOptions />;
      }

      const queryClient = new QueryClient();
    
    return (
        <Box>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {isConnected ? (
                        <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Wallet is connected</Text>
                    ) : (
                        <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Connect your wallet to create and join games</Text>
                    )}
                    <div>
                        <ConnectWallet />
                        {isConnected && <Link backgroundColor='blue' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>}
                    </div>
                </QueryClientProvider>
            </WagmiProvider>
        </Box>
    )
}

export default HomePage;