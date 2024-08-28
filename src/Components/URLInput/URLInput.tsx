import React, { useContext } from 'react';
import { NetworkContext } from '../../Contexts/NetworkContext';
import { DataContext } from '../../Contexts/DataContext';

export default function URLInput() {
  const { values: { url }, actions: { setUrl } } = useContext(DataContext);
  const { sendOperation, loading } = useContext(NetworkContext);

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <input
          type="text"
          id="url"
          className="bg-gray-800 text-gray-300 p-2 px-4 text-sm flex-grow"
          value={url}
          placeholder="Endpoint"
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="bg-purple-600 text-white p-2 px-4 text-sm"
          type="button"
          onClick={sendOperation}
        >
          {loading ? 'Sending' : 'Send'}
        </button>
      </div>
    </div>
  );
}
