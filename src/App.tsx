import React from 'react';
import GraphQLEditor from './Components/GraphQLEditor/GraphQLEditor';
import URLInput from './Components/URLInput/URLInput';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <URLInput />

      <div className="flex flex-1 h-full w-full">
        <GraphQLEditor />

        <div className="bg-[#1e1e2e] w-[300px]">Hello World</div>
      </div>

      <input type="text" className="bg-purple-600" />
    </div>
  );
}

export default App;
