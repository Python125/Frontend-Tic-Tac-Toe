import { React, useEffect } from "react";
import AuthHeader from './AuthHeader';
import { Text, Box } from '@chakra-ui/react';
import CreateGameModal from './CreateGameModal';
import AvailableGames from './AvailableGames';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import { setAllGames } from '../features/games/gameSlice';
import axios from 'axios';

const apiURL = import.meta.env.VITE_URL;
// console.log(apiURL);

function GamesPage() {
  const { isConnected } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${apiURL}/games`);
        const gamesData = Array.isArray(response.data) ? response.data : [];
        const activeGames = gamesData.filter(game => game.status !== 'COMPLETED');
        dispatch(setAllGames(activeGames));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  return (
    <>
      <AuthHeader />
      <Box backgroundColor='gray.900' color='white' display='flex' justifyContent='space-between' padding='0 600px'>
        {isConnected && (
          <>
            <Text fontWeight='300' fontSize='2xl' marginTop='20px'>Available Games</Text>
            <CreateGameModal />
          </>
        )}
      </Box>

      <Box backgroundColor='gray.900' minHeight='100vh' color='white'>
        <AvailableGames />
      </Box>
    </>
  )
}

export default GamesPage;