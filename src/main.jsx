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
import Header from './components/Header';
// import WalletVerification from './components/WalletVerification';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
  // <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
                  <Header />
                  <div style={{ paddingTop: '80px' }}>
                    {/* <WalletVerification /> */}
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/games" element={<GameList />} />
                      <Route path="/games/:gameId" element={<SingleGame />} />
                    </Routes>                  
                  </div>
                </div>
              </BrowserRouter>
            </QueryClientProvider>
          </WagmiProvider>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  // </StrictMode>
)