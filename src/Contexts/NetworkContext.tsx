import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { gql } from 'graphql-tag';
import { OperationDefinitionNode, print } from 'graphql';
import { DataContext } from './DataContext';

type NetworkContextType = {
  loading: boolean;
  sendOperation: () => void;
};

export const NetworkContext = createContext<NetworkContextType>({
  loading: false,
  sendOperation: () => {},
});

function NetworkProvider({ children }: { children: React.ReactNode }) {
  const {
    values: { url, headers, codeValue },
    actions: { registerResponse },
  } = useContext(DataContext);
  const [isPendingData, startData] = useTransition();
  const [loading, setLoading] = useState(false);

  const sendOperation = useCallback(async () => {
    setLoading(true);

    try {
      const query = gql(codeValue);
      const queryDef = query.definitions?.[0] as OperationDefinitionNode;
      const operationName = queryDef.name?.value;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(headers ?? {}),
        },
        body: JSON.stringify({
          operationName,
          query: print(query),
        }),
      });

      const result = await response.json() as JSON;

      startData(() => {
        registerResponse(result);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
    url,
    headers,
    codeValue,
    registerResponse,
    setLoading,
  ]);

  const value = useMemo(() => ({
    loading: isPendingData || loading,
    sendOperation,
  }), [
    sendOperation,
    isPendingData,
    loading,
  ]);

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkProvider;
