import { StrictMode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi.config';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import AllGames from './components/AllGames';
import Game from './components/Game';
import HomePage from './components/HomePage';
import WalletVerification from './components/WalletVerification';
import { store } from './app/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

function GameList() {
  const { gameId } = useParams();
  return (<AllGames gameId={gameId} />)
}

function SingleGame() {
  const { gameId } = useParams();
  return (<Game gameId={gameId} />)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
                <WalletVerification />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/games" element={<GameList />} />
                  <Route path="/games/:gameId" element={<SingleGame />} />
                </Routes>
              </div>
            </BrowserRouter>
          </QueryClientProvider>
        </WagmiProvider>
      </Provider>
    </ChakraProvider>
  </StrictMode>
)