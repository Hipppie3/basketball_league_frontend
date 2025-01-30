import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const TeamsContext = createContext();

// Provider Component
export const TeamsProvider = ({ children }) => {
 const [teams, setTeams] = useState([]);

// Fetch teams from API
useEffect(() => {
 const fetchTeams = async () => {
  try{
   const response = await axios.get('http://localhost:5050/api/teams');
   console.log(response.data);
   setTeams(response.data)
  } catch (error) {
   console.error('Error fetching teams:', error)
  }
 };
  fetchTeams();
}, []);

return(
 <TeamsContext.Provider value={{ teams, setTeams }}>
  {children}
 </TeamsContext.Provider>
 );
};

// Custom hook for consuming the context
export const useTeams = () => {
 return useContext(TeamsContext);
};