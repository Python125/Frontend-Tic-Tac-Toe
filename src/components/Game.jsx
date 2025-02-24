import { useState, React, useEffect } from "react";
import axios from "axios";
import { Text, Button, Box, Link, Input } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_URL;
console.log('API URL:', apiURL);

function Game() {

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold">Welcome to your game session</Text>
        </Box>
    )
}

export default Game;