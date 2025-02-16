import {React, useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Button, Link, Box } from '@chakra-ui/react';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {})

  return (
    <div>
      <Text color='white' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Login Page</Text>
      <input type="text" placeholder="Enter username" />
      <input type="password" placeholder="Enter password" />
      <Button>Login</Button>
    </div>
  )
}

export default App;