import React, {useState, useEffect} from 'react'
import axios from 'axios'

function PlayersLists() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/players')
        console.log(response.data)
        setPlayers(response.data)
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    }
    fetchData();
  },[])


  return (
    <div>
      {players.map((player) => (
        <div key={player.id}>
          <h3>{player.firstName}</h3>
        </div>
      ))}
    </div>
  )
}

export default PlayersLists
