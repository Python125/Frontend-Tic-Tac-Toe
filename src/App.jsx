import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { Text, Button, Input, Link, Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from './wagmi.config';
import { Account } from './components/Account';
import WalletOptions from './components/WalletOptions';
import AllGames from './components/AllGames';

const apiURL = import.meta.env.VITE_URL;
// console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [userId, setUserId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  function addUser(e) {
    setUserInput(e.target.value);
  }

  function addWalletAddress(e) {
    setWalletAddress(e.target.value);
  }

  function submitUser(e) {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const newUser = {
      id: users.length + 1,
      username: userInput,
      walletAddress: walletAddress,
      games: [],
    }
    console.log(newUser);

    axios.post(`${apiURL}/users`, newUser).then(response => {
      setUsers([...users, response.data]);
      setUserInput('');
      setWalletAddress('');
    })
  }

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
            <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Connect to your wallet to play games</Text>
          )}
          <div>
            <ConnectWallet />
            {isConnected && <AllGames />}
          </div>

          <Link backgroundColor='blue' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>

        </QueryClientProvider>
      </WagmiProvider>
    </Box>
  )
}

export default App;