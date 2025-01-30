import React from 'react';
import { PlayersProvider } from './PlayersContext';
import { TeamsProvider } from './TeamsContext';

const AppProviders = ({ children }) => {
 return (
  <TeamsProvider>
   <PlayersProvider>
    {children}
   </PlayersProvider>
  </TeamsProvider>
 );
};

export default AppProviders;