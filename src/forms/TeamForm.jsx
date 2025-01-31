import React, { useState } from 'react';
import { useTeams } from '../context/TeamsContext';
import './TeamForm.css';

function TeamForm() {
  const { teams, addTeam, editTeam, deleteTeam } = useTeams();
  const [teamFormData, setTeamFormData] = useState({ name: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showTeams, setShowTeams] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const toggleTeams = () => setShowTeams((prev) => !prev);

  const handleTeamChange = (e) => {
    setTeamFormData({ name: e.target.value });
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await editTeam(selectedTeamId, teamFormData);
        setMessage(`Team updated successfully: ${teamFormData.name}`);
      } else {
        await addTeam(teamFormData);
        setMessage(`Team created successfully: ${teamFormData.name}`);
      }

      setMessageType('success');
      resetForm();
    } catch (error) {
      setMessage('Failed to process request. Please try again.');
      setMessageType('error');
    }
  };

  const handleEditClick = (team) => {
    setTeamFormData({ name: team.name });
    setSelectedTeamId(team.id);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteTeam(id);
    setMessage('Team deleted successfully');
    setMessageType('success');
  };

  const resetForm = () => {
    setTeamFormData({ name: '' });
    setIsEditing(false);
    setSelectedTeamId(null);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
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
        <button type='submit'>{isEditing ? 'Update Team' : 'Create Team'}</button>
      </form>

      <button onClick={toggleTeams}>
        {showTeams ? "Hide Teams" : "View Teams"}
      </button>

      {showTeams && teams.length > 0 && (
        <div className="teams_table_container">
          <table className="teams_table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>
                    <button className="edit_btn" onClick={() => handleEditClick(team)}>Edit</button>
                    <button className="delete_btn" onClick={() => handleDeleteClick(team.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamForm;
