import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import './App.css'

function App() {

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/games/:id' element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
