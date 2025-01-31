import React from "react";
import { useParams } from "react-router-dom";
import { usePlayers } from "../context/PlayersContext";
import { NavLink } from 'react-router-dom'

function PlayerDetails() {
  const { id } = useParams();
  const { players } = usePlayers();

  if (!players.length) return <p>Loading players...</p>; // ✅ Prevents .find() error

  const player = players.find((p) => p.id === Number(id));

  if (!player) return <p>Player not found.</p>; // ✅ Handles invalid ID case

  return (
    <div>
      <h2>Player Details</h2>
      <h3>{player.firstName} {player.lastName}</h3>
      <p>Position: {player.position}</p>
      <p>Age: {player.age}</p>
      <p>Number: {player.number}</p>
      <p>Team: <NavLink to={`/teams/${player.team.id}`}>
    {player.team.name}
  </NavLink></p>
    </div>
  );
}

export default PlayerDetails;
