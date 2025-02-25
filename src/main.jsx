import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import { Provider } from './components/ui/provider';
import AllGames from './components/AllGames';
import SetupGame from './components/SetupGame';
// import App from './App';

function GameList() {
  const { userId } = useParams();
  return (<AllGames userId={userId} />)
}

function GameSetup() {
  const { gameId } = useParams();
  return (<SetupGame gameId={gameId} />)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/games/:gameId" element={<GameSetup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)