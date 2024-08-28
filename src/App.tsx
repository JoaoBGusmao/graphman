import React from 'react';
import NetworkProvider from './Contexts/NetworkContext';
import Panel from './Components/Panel/Panel';
import DataProvider from './Contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <NetworkProvider>
        <Panel />
      </NetworkProvider>
    </DataProvider>
  );
}

export default App;
