import React, {useState} from 'react'
import './PlayerForm.css'

function PlayerForm() {
const [playerFormData, setPlayerFormData] = useState({firstName: "", lastName: "", age: "", position: "", number: ""})
const [playerLists, setPlayerLists] = useState([])

const handlePlayerChange = (e) => {
  const {name, value} = e.target;
  console.log(e.target.name);
  console.log(e.target.value)
  setPlayerFormData(prev => ({...prev, [name]: value}))
}
console.log(playerLists)
  return (
    <div className='player_form_container'>
      <form className='player_form'>
        <label>First Name
          <input 
          type='text'
          name='firstName'
          value={playerFormData.firstName}
          onChange={handlePlayerChange}
          />
        </label>
        <label>Last Name
          <input 
          type='text'
          name='lastName'
          value={playerFormData.lastName}
          onChange={handlePlayerChange}
          />
        </label>
        <label>Age
          <input 
          type='number'
          name='age'
          value={playerFormData.age}
          onChange={handlePlayerChange}
          />
        </label>
        <label>Position
          <input 
          type='text'
          name='position'
          value={playerFormData.position}
          onChange={handlePlayerChange}
          />
        </label>
        <label>Number
          <input 
          type='number'
          name='number'
          value={playerFormData.number}
          onChange={handlePlayerChange}
          />
        </label>
        <button type='submit'>Submit Player</button>
      </form>
    </div>
  )
}

export default PlayerForm
