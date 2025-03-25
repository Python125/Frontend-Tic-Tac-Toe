import { Box, List, Link, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useSelector } from 'react-redux';

const apiURL = import.meta.env.VITE_URL;

function AvailableGames() {
    const games = useSelector((state) => state.games.games);
    const { isConnected } = useAccount();

    return (
        <Box>
            <List.Root>
                {games.map(game => {
                    return (
                        <List.Item key={game.id}>
                            {isConnected ? (
                                <Link variant='plain' _hover={{textDecoration: 'underline', color: 'blue.600'}} href={`/games/${game.id}`} color='white'>{game.name}: ${game.maxBuyInAmount}</Link>
                            ) : (
                                <Text color='black'>{game.name}: {game.minBuyInAmount} - {game.maxBuyInAmount}</Text>
                            )}
                        </List.Item>
                    )
                })}
            </List.Root>
        </Box>
    )
}

export default AvailableGames;