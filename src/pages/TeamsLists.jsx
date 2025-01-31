import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTeams } from '../context/TeamsContext';

function TeamsList() {
  const { teams } = useTeams(); // ✅ Get teams from context

  if (!teams.length) return <p>Loading teams...</p>;

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {/* ✅ Clickable Link to Team Details */}
            <NavLink to={`/teams/${team.id}`}>{team.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;
