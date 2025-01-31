import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const TeamsContext = createContext();


// Custom hook for consuming the context
export const useTeams = () => {
  return useContext(TeamsContext);
};

// Provider Component
export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  // ✅ Fetch teams from API on mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  // ✅ Create (POST) Team
  const addTeam = async (teamData) => {
    try {
      const response = await axios.post('http://localhost:5050/api/teams', teamData);
      setTeams((prevTeams) => [...prevTeams, response.data]);
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  // ✅ Fetch (GET) Team by ID
  const getTeamById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/teams/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetch team by ID:', error);
      return null;
    }
  } 

  // ✅ Edit (PUT) Team
  const editTeam = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5050/api/teams/${id}`, updatedData);
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.id === id ? response.data : team))
      );
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  // ✅ Delete (DELETE) Team
  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/teams/${id}`);
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <TeamsContext.Provider value={{ teams, addTeam, editTeam, deleteTeam, getTeamById }}>
      {children}
    </TeamsContext.Provider>
  );
};
