import React, { useContext } from 'react';
import { Editor } from '@monaco-editor/react';
import { DataContext } from '../../Contexts/DataContext';
import setMonacoTheme from '../../Utils/monaco-theme';

export default function GraphQLEditor() {
  const {
    values: { codeValue },
    actions: { setCodeValue },
  } = useContext(DataContext);

  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,1fr)] grid-cols-[minmax(0,1fr)]">
      <Editor
        height="100%"
        defaultLanguage="graphql-new"
        language="graphql-new"
        defaultValue={codeValue}
        theme="playground"
        onChange={(value) => setCodeValue(value ?? '')}
        options={{
          // @ts-ignore
          renderIndentGuides: false,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
          stickyScroll: {
            enabled: true,
          },
          fontSize: 14,
          scrollBeyondLastLine: false,
          scrollbar: {
            verticalScrollbarSize: 15,
          },
        }}
        beforeMount={setMonacoTheme}
      />
    </div>
  );
}
