import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import PlayersLists from './pages/PlayersLists.jsx'
import PlayerForm from './forms/PlayerForm.jsx'
import StatForm from './forms/StatForm.jsx'
import TeamForm from './forms/TeamForm.jsx'

function App() {
  return (
    <div className='app_container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playerslists' element={<PlayersLists />} />
        <Route path='/playerForm' element={<PlayerForm />} />
        <Route path='/statForm' element={<StatForm />} />
        <Route path='teamForm' element={<TeamForm />} />
      </Routes>
    </div>
  )
}

export default App
