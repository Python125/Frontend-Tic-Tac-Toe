import { useState, useEffect } from "react";
import axios from "axios";
import { Box, List, Link, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useDispatch } from 'react-redux';
import { setAllGames, addGame } from '../features/games/gameSlice';

const apiURL = import.meta.env.VITE_URL;

function AvailableGames() {
    const [games, setGames] = useState([]);
    const [gameInput, setGameInput] = useState('');
    const { isConnected } = useAccount();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGames = async () => {
          const response = await axios.get(`${apiURL}/games`);
          const gamesData = Array.isArray(response.data) ? response.data : [];
          // setGames(gamesData);
          dispatch(setAllGames(gamesData));
        }
        fetchGames();
    }, []);

    function submitGame(e) {
        e.preventDefault();
        if (!gameInput.trim()) return;

        const newGame = {
            id: games.length + 1,
            name: gameInput,
            maxParticipantCount: 2,
            minBuyInAmount: 0,
            maxBuyInAmount: 0,
            status: 'Active',
            // userId: Number(userId),
        }
        console.log(newGame);

        axios.post(`${apiURL}/games`, newGame).then(response => {
           // setGames([...games, response.data]);
           dispatch(addGame(response.data));
           setGameInput('');
        })
        // console.log('games',games);
    }

    return (
        <Box>
            <List.Root onSubmit={submitGame}>
                {games.map(game => {
                    return (
                    <List.Item key={game.id}>
                        {isConnected ? (
                            <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/games/${game.id}`} color='white'>{game.name}</Link>
                        ) : (
                            <Text color='white'>{game.name}</Text>
                        )}
                    </List.Item>
                    )
                })}
            </List.Root>
        </Box>
    )
}

export default AvailableGames;