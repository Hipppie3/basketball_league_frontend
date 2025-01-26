import React, {useState, useEffect} from 'react'
import axios from 'axios'

const TeamsLists = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    try{
      const response = await axios.get('http://localhost:5050/api/teams')
      console.log(response.data)
      setTeams(response.data)
    } catch (error) {
      console.error('Error fetching teams:', error)
    } 
  }
    fetchData();
  },[])


  return (
    <div>
      <h2>Teams</h2>
      {teams.map((team) => (
        <div key={team.id}>
          <h3>{team.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default TeamsLists
