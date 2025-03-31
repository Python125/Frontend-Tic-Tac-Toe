import { StrictMode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi.config';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import GamesPage from './components/GamesPage';
import HomePage from './components/HomePage';
import SingleGamePage from './components/SingleGamePage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Provider store={store}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
                  <Toaster />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/games/:gameId" element={<SingleGamePage />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </QueryClientProvider>
          </WagmiProvider>
      </Provider>
    </ChakraProvider>
  </StrictMode>
)