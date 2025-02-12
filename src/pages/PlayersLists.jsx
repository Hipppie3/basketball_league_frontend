import React from 'react';
import { usePlayers } from '../context/PlayersContext.jsx';
import './PlayersLists.css';
import { NavLink } from 'react-router-dom'

function PlayersLists() {
  const { players } = usePlayers(); // Get players from context

  return (
    <div className="players_list_container">
      {players.map((player) => (
        <div key={player.id} className="player_card">
          <NavLink to={`/players/${player.id}`}>
          <h3>{player.firstName} {player.lastName}</h3>
          <p>Position: {player.position}</p>
          <p>Age: {player.age}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default PlayersLists;
