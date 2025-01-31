import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeams } from '../context/TeamsContext';
import { NavLink } from 'react-router-dom'

function TeamDetails() {
  const { id } = useParams(); // Get team ID from URL
  const { teams } = useTeams(); // ✅ Use teams from context


  if (!teams.length) return <p>Loading team...</p>;
  // ✅ Find team in context instead of fetching again
  const team = teams.find((t) => t.id === Number(id));

  if (!team) return <p>Team not found. </p>

  return (
    <div>
      <h2>{team.name}</h2>
      <h3>Players:</h3>
      {team.players && team.players.length > 0 ? (
        <ul>
          {team.players.map((player) => (
            <li key={player.id}>
              <NavLink to={`/players/${player.id}`}>{player.firstName} {player.lastName}</NavLink> - {player.position} #{player.number}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players in this team.</p>
      )}
    </div>
  );
}

export default TeamDetails;
