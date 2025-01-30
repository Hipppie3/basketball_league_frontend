import React, { useState } from 'react';
import axios from 'axios';
import { useTeams } from '../context/TeamsContext'; // Import TeamsContext
import './TeamForm.css'

function TeamForm() {
  const { teams, setTeams } = useTeams(); // Get teams and setTeams from context
  const [teamFormData, setTeamFormData] = useState({ name: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showTeams, setShowTeams] = useState(false);

  const toggleTeams = () => setShowTeams((prev) => !prev);

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/teams', teamFormData);
      
      // Update TeamsContext state directly
      setTeams((prevTeams) => [...prevTeams, response.data]);

      setMessage(`Team created successfully: ${teamFormData.name}`);
      setMessageType('success');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

      setTeamFormData({ name: "" });
    } catch (error) {
      console.error('Error submitting team:', error);
      setMessage('Failed to create team. Please try again.');
      setMessageType('error');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  return (
    <div className='team_form_container'>
      {message && (
        <div className={`message ${messageType === 'success' ? 'success-message' : ''} ${messageType === 'error' ? 'error-message' : ''}`}>
          {message}
        </div>
      )}

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
      <div>
        <button onClick={toggleTeams}>
          {showTeams ? "Hide Teams" : "View Teams"}
        </button>
      </div>

      <div>
        {showTeams && teams.length > 0 && teams.map((team) => (
          <div key={team.id}>
          {team.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamForm;
