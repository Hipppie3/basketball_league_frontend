import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './PlayerForm.css';

function PlayerForm() {
const [playerFormData, setPlayerFormData] = useState({firstName: "", lastName: "", age: "", position: "", number: ""});
const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState('');

const handlePlayerChange = (e) => {
  const { name, value } = e.target;
  setPlayerFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handlePlayerSubmit = async (e) => {
  e.preventDefault();
  const formattedData = {
    ...playerFormData,
    age: playerFormData.age === '' ? null : Number(playerFormData.age),
    number: playerFormData.number === '' ? null : Number(playerFormData.number),
  };
  console.log('Submitting:', formattedData); // Check formatted values before sending

  try {
    await axios.post('http://localhost:5050/api/players', formattedData);
    //Set success message
    setMessage(`Player created successfully: ${formattedData.firstName} ${formattedData.lastName}`)
    setMessageType('success');
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);

    //Clear form inputs after submission 
    // setPlayerFormData('') won't work because playerFormData is an object, not a single value
    setPlayerFormData({
      firstName: "",
      lastName: "",
      age: "",
      position: "",
      number: ""
    });
  } catch (error) {
    console.error('Error submitting player:', error);
    setMessage('Failed to create player. Please try again.');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000)
  }
};

  return (
    <div className='player_form_container'>
      <div className={`message ${messageType === 'success' ? 'success-message' : ''} ${messageType === 'error' ? 'error-message' : ''}`}>
        {message}
      </div>
      <form className='player_form' onSubmit={handlePlayerSubmit}>
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
        <button type='submit'>Create Player</button>
      </form>
    </div>
  )
}

export default PlayerForm
