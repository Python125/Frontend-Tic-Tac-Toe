import { useState, React, useEffect } from "react";
// import axios from "axios";
import { Text, Box } from '@chakra-ui/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider, useAccount } from 'wagmi';
// import { config } from '../wagmi.config';
// import { Account } from './Account';
// import WalletOptions from './WalletOptions';
import TicTacToe from './TicTacToe';

function SingleGamePage() {
    // const [isConnected, setIsConnected] = useState(false);
    // const { gameId } = useParams();
  
    // function ConnectWallet() {
    //   const { isConnected } = useAccount();
    //   useEffect(() => {
    //     setIsConnected(isConnected);
    //   }, [isConnected]);
    //   if (isConnected) return <Account />;
    //   return <WalletOptions />;
    // }

    // const queryClient = new QueryClient();

    return (
        <Box>
            {/* <ConnectWallet /> */}
            <Text fontWeight='bold' fontSize='2xl'>Welcome to your game session</Text>
            <TicTacToe />
        </Box>
    )
}

export default SingleGamePage;