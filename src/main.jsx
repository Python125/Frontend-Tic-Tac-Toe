import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import { Provider } from './components/ui/provider';
import App from './App';
import AllGames from './components/AllGames';
import Game from './components/Game';

function User() {
  const { userId } = useParams();
  return (<AllGames userId={userId} />)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:userId" element={<User />} />
            <Route path="/:userId/:gameId" element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)