import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

type DataContextType = {
  values: {
    codeValue: string;
    url: string;
    lastResponse: JSON | null;
    headers: {
      [key: string]: string;
    } | undefined,
  }
  actions: {
    setUrl: (url: string) => void;
    registerResponse: (response: JSON) => void;
    setHeaders: (headers: { [key: string]: string } | undefined) => void;
    setCodeValue: (codeValue: string) => void;
  },
};

const defaultMockValue = `query Teste {
  pokemon(id: "UG9rZW1vbjowMDE=") {
    id
    name
    height {
      minimum
      maximum
    }
  }

  pokemons(first: 2) {
    id
    name
  }
}`;

export const DataContext = createContext<DataContextType>({
  values: {
    codeValue: defaultMockValue,
    url: '',
    headers: undefined,
    lastResponse: null,
  },
  actions: {
    setUrl: () => {},
    registerResponse: () => {},
    setHeaders: () => {},
    setCodeValue: () => {},
  },
});

function DataProvider({ children }: { children: React.ReactNode }) {
  const [codeValue, setCodeValue] = useState<string>(defaultMockValue);
  const [url, setUrl] = useState('https://graphql-pokemon2.vercel.app/');
  const [response, setResponse] = useState<JSON | null>(null);
  const [headers, setHeaders] = useState<{ [key: string]: string } | undefined>(undefined);

  const registerResponse = useCallback((incomingResponse: JSON) => {
    setResponse(incomingResponse);
  }, []);

  const value = useMemo(() => ({
    values: {
      codeValue,
      url,
      lastResponse: response,
      headers,
    },
    actions: {
      setUrl,
      registerResponse,
      setHeaders,
      setCodeValue,
    },
  }), [
    response,
    url,
    headers,
    codeValue,
    setCodeValue,
    registerResponse,
  ]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
