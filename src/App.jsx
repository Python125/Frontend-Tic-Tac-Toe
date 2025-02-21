import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { Text, Button, Input, Link, Box } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');
  // const [walletAddress, setWalletAddress] = useState('');
  
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

  // function addWalletAddress(e) {
  //   setWalletAddress(e.target.value);
  // }

  function submitUser(e) {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const newUser = {
      id: users.length + 1,
      username: userInput,
      // walletAddress: walletAddress,
      games: [],
    }
    console.log(newUser);

    axios.post(`${apiURL}/users`, newUser).then(response => {
      setUsers([...users, response.data]);
      setUserInput('');
      // setWalletAddress('');
    })
  }

  return (
    <Box>
      <Text color='black' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Login to your account</Text>
      <form onSubmit={submitUser}>
        <Input type="text" width='200px' placeholder="Enter username" value={userInput} onChange={addUser} />
        {/* <Input type="text" width='200px' placeholder="Enter wallet address" value={walletAddress} onChange={addWalletAddress} /> */}
        <Button type='submit' marginLeft='5px' marginBottom='5px' width='70px' fontWeight='bold' onClick={submitUser}>Login</Button>
        <Text fontWeight='bold' fontSize='xl' marginTop='0.5rem' color='black'>Find your username below</Text>
      </form>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/${user.id}`} color='black'>{user.username}</Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default App;