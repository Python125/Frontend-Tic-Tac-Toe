import {React, useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Button, Link, Box } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

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

  function addPassword(e) {
    setPasswordInput(e.target.value);
  }
  
  function submitUser(e) {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const newUser = {
      id: users.length + 1,
      username: userInput,
      password: passwordInput,
      games: [],
    }
    console.log(newUser);

    axios.post(`${apiURL}/users`, newUser).then(response => {
      setUsers([...users, response.data]);
      setUserInput('');
      setPasswordInput('');
    })
  }

  return (
    <Box>
      <Text color='white' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Login to your account</Text>
      <form onSubmit={submitUser}>
        <input type="text" placeholder="Enter username" onChange={addUser} value={userInput} />
        <input type="password" placeholder="Enter password" onChange={addPassword} value={passwordInput} />
        <Button type='submit' onClick={submitUser}>Login</Button>
        <Text fontWeight='bold' fontSize='xl' marginTop='0.5rem' color='white'>Find your username below</Text>
      </form>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/user/${user.id}`} color='white'>{user.username}</Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default App;