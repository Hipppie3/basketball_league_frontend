import React, { useState } from 'react';
import { useTeams } from '../context/TeamsContext';
import { usePlayers } from '../context/PlayersContext';
import './PlayerForm.css';

function PlayerForm() {
  const { teams } = useTeams();
  const { players, addPlayer, editPlayer, deletePlayer } = usePlayers();

  const [playerFormData, setPlayerFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    position: "",
    number: "",
    team_id: "",
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPlayers, setShowPlayers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handlePlayerChange = (e) => {
    const { name, value } = e.target;
    setPlayerFormData((prev) => ({
      ...prev,
      [name]: name === 'team_id' ? Number(value) || "" : value,
    }));
  };

  const togglePlayers = () => setShowPlayers((prev) => !prev);

  const handleEditClick = (player) => {
    setPlayerFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      age: player.age || "",
      position: player.position,
      number: player.number || "",
      team_id: player.team_id || "",
    });
    setSelectedPlayerId(player.id);
    setIsEditing(true);
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...playerFormData,
      age: playerFormData.age === '' ? null : Number(playerFormData.age),
      number: playerFormData.number === '' ? null : Number(playerFormData.number),
      team_id: playerFormData.team_id === '' ? null : Number(playerFormData.team_id),
    };

    try {
      if (isEditing) {
        await editPlayer(selectedPlayerId, formattedData);
        setMessage(`Player updated successfully: ${formattedData.firstName} ${formattedData.lastName}`);
      } else {
        await addPlayer(formattedData);
        setMessage(`Player created successfully: ${formattedData.firstName} ${formattedData.lastName}`);
      }

      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

      setPlayerFormData({
        firstName: "",
        lastName: "",
        age: "",
        position: "",
        number: "",
        team_id: "",
      });

      setIsEditing(false);
      setSelectedPlayerId(null);
    } catch (error) {
      console.error('Error submitting player:', error);
      setMessage('Failed to process request. Please try again.');
      setMessageType('error');

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
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

        <label>Team  
          <select 
            name='team_id'
            value={playerFormData.team_id}
            onChange={handlePlayerChange}
          >
            <option value=''>Select a Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <button type='submit'>{isEditing ? "Update Player" : "Create Player"}</button>
      </form>

      <button onClick={togglePlayers} className='view_player_btn'>
        {showPlayers ? "Hide Players" : "View Players"}
      </button>

      {showPlayers && players.length > 0 && (
        <div className="players_table_container">
          <table className="players_table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Number</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.firstName}</td>
                  <td>{player.lastName}</td>
                  <td>{player.age}</td>
                  <td>{player.position}</td>
                  <td>{player.number}</td>
                  <td>{player.team ? player.team.name : "No Team"}</td>
                  <td>
                    <button className="edit_btn" onClick={() => handleEditClick(player)}>Edit</button>
                    <button className="delete_btn" onClick={() => deletePlayer(player.id)}>Delete</button>
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

export default PlayerForm;
