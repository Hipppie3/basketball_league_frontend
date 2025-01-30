import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const PlayersContext = createContext();

// Custom hook for consuming the context
export const usePlayers = () => {
  return useContext(PlayersContext);
};

// Provider Component
export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  // ✅ Fetch players from API on mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  // ✅ Create (POST) Player
  const addPlayer = async (playerData) => {
    try {
      const response = await axios.post('http://localhost:5050/api/players', playerData);
      setPlayers((prevPlayers) => [...prevPlayers, response.data]);
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  // ✅ Edit (PUT) Player
  const editPlayer = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5050/api/players/${id}`, updatedData);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => (player.id === id ? response.data : player))
      );
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  // ✅ Delete (DELETE) Player
  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/players/${id}`);
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <PlayersContext.Provider value={{ players, addPlayer, editPlayer, deletePlayer }}>
      {children}
    </PlayersContext.Provider>
  );
};
