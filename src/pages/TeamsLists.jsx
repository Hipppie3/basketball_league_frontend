import React from 'react'
import { useTeams } from '../context/TeamsContext.jsx'

function TeamsLists() {
  const { teams } = useTeams(); // Get teams from context
  console.log(teams)
  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}>
          <h3>{team.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default TeamsLists
