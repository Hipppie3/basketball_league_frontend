import React from 'react';
import { PlayersProvider } from './PlayersContext';
import { TeamsProvider } from './TeamsContext';
import { StatsProvider } from './StatsContext';

const AppProviders = ({ children }) => {
 return (
 <StatsProvider>
  <TeamsProvider>
   <PlayersProvider>
    {children}
   </PlayersProvider>
  </TeamsProvider>
 </StatsProvider>
 );
};

export default AppProviders;