import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StatsContext = createContext();

export const useStats = () => {
 return useContext(StatsContext);
};

export const StatsProvider = ({ children }) => {
 const [stats, setStats] = useState([]);

 // Fetch (GET) Stats
 useEffect(() => {
  const fetchStats = async () => {
   try{
    const response = await axios.get('http://localhost:5050/api/stats');
    setStats(response.data);
   } catch (error) {
    console.error('Error fetching stats:', error)
   }
  };
  fetchStats();
 }, []);

 // Create (POST) Stat
 const addStats = async (statData) => {
  try {
   const response = await axios.post('http://localhost:5050/api/stats', statData);
   setStats((prevStat) => [...prevStat, response.data]);
  } catch (error) {
   console.error('Error creating stat:', error)
  }
 };

 // Fetch (GET) Stat by ID
 const getStatById = async (id) => {
  try {
   const response = await axios.get(`http://localhost:5050/api/stats/${id}`);
   return response.data
  } catch (error) {
   console.error('Error fetching stat by ID:', error)
   return null;
  }
 };

 // Edit (PUT) Stat
 const editStat = async (id, updatedData) => {
  try {
   const response = await axios.put(`http://localhost:5050/api/stats/${id}`, updatedData);
   setStats((prevStats) => 
    prevStats.map((stat) => (stat.id === id ? response.data : stat))
   );
  } catch (error) {
   console.error('Error updating stat:', error);
  }
 };

 // Delete (DELETE) Stat

 const deleteStat = async (id) => {
  try {
   await axios.delete(`http://localhost:5050/api/stats/${id}`);
   setStats((prevStat) => prevStat.filter((stat) => stat.id !== id));
  } catch (error) {
   console.error('Error deleting stat:', error);
  }
 };

 return (
  <StatsContext.Provider value={{ stats, addStats, editStat, deleteStat, getStatById}}>
   {children}
  </StatsContext.Provider>
 );
};