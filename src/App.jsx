import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import PlayersLists from './pages/PlayersLists.jsx'
import TeamsLists from './pages/TeamsLists.jsx'
import PlayerForm from './forms/PlayerForm.jsx'
import StatForm from './forms/StatForm.jsx'
import TeamForm from './forms/TeamForm.jsx'
import AppProviders from './context/AppProviders.jsx'

function App() {
  return (
    <AppProviders>
    <div className='app_container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playersLists' element={<PlayersLists />} />
        <Route path='/teamsLists' element={<TeamsLists />} />
        <Route path='/playerForm' element={<PlayerForm />} />
        <Route path='/statForm' element={<StatForm />} />
        <Route path='teamForm' element={<TeamForm />} />
      </Routes>
    </div>
    </AppProviders>
  )
}

export default App
