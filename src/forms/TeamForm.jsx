import React, {useState} from 'react'
import axios from 'axios'

function TeamForm() {
  const [teamFormData, setTeamFormData] = useState({name: ''})
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5050/api/teams', teamFormData);
      setMessage(`Team created successfully: ${teamFormData.name}`);
      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      setTeamFormData({
        name: ""
      });
    } catch (error) {
      console.error('Error submitting team:', error);
      setMessage('Failed to create team. Please try again.');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000)
    }
  };

  return (
    <div className='team_form_container'>
      <div classname={`message ${messageType === 'success' ? 
        'success-message' : ''} ${messageType === 'error' ? 'error-message':
        ''
      }`}>
        {message}
      </div>
      <form onSubmit={handleTeamSubmit}>
        <label>Team Name 
          <input 
          type='text'
          name='name'
          value={teamFormData.name}
          onChange={handleTeamChange}
          />
        </label>
        <button type='submit'>Create Team</button>
      </form>
    </div>
  )
}

export default TeamForm
