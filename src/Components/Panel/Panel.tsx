import React from 'react';
import URLInput from '../URLInput/URLInput';
import GraphQLEditor from '../GraphQLEditor/GraphQLEditor';
import ResponsePanel from '../ResponsePanel/ResponsePanel';

export default function Panel() {
  return (
    <div className="flex flex-col h-screen bg-[#1e1e2e]">
      <URLInput />

      <div className="flex flex-1 h-full w-full">
        <GraphQLEditor />

        <ResponsePanel />
      </div>

      <input type="text" className="bg-purple-600" />
    </div>
  );
}
