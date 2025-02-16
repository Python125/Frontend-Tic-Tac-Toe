import { useState } from "react";
import { Text, Button, Link, Box } from '@chakra-ui/react';

function TicTacToe({ userId }) {
  return (
    <div>
      <Text color='white' fontSize='2xl' fontWeight='bold' marginBottom='1rem'>Tic Tac Toe</Text>
    </div>
  )
}

export default TicTacToe;