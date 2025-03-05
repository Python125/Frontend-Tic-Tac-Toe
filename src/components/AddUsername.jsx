import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { Text, Box, Link, Input } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { config } from '../wagmi.config';
import { Account } from './Account';
import WalletOptions from './WalletOptions';

const apiURL = import.meta.env.VITE_URL;
// console.log(`API URL: ${apiURL}`);

function AddUsername() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${apiURL}/users`);
            setUsers(response.data);
        }
        fetchUsers();
    }, []);

    const addUser = (e) => {
        setUserInput(e.target.value);
    }

    const submitUser = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newUser = {
            id: users.length + 1,
            username: userInput,
            games: [],
        }
        console.log(newUser);

        axios.post(`${apiURL}/users`, newUser).then(response => {
            setUsers([...users, response.data]);
            setUserInput('');
        })
    }

    function ConnectWallet() {
        const { isConnected } = useAccount();
        if (isConnected) return <Account />;
        return <WalletOptions />;
    }

    const queryClient = new QueryClient();

    return (
        <Box>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <ConnectWallet />
                    {isConnected && (
                        <>
                            <Text fontWeight='bold' fontSize='2xl'>Create a username</Text>
                            <form onSubmit={submitUser}>
                                <Input type="text" width='200px' marginBottom='10px' marginTop='10px' placeholder="Enter username" onChange={addUser} value={userInput} />
                                <Link backgroundColor='blue' color='white' padding='0.5rem' borderRadius='0.3rem' marginTop='1rem' href={'/games'}>View Games</Link>
                            </form>
                        </>
                    )}
                </QueryClientProvider>
            </WagmiProvider>
        </Box>
    )
}

export default AddUsername;