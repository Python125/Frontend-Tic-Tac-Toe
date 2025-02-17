import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import { Provider } from './components/ui/provider';
import App from './App';
import TicTacToe from './components/ticTacToe';

function User() {
  const { userId } = useParams();
  return (<TicTacToe userId={userId} />)
}

function Game() {
  const { userId, gameId } = useParams();
  return (<TicTacToe userId={userId} gameId={gameId} />)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:userId" element={<User />} />
            <Route path="/:userId/games" element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)