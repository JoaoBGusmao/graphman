import React, { useContext } from 'react';
import { Editor } from '@monaco-editor/react';
import { Resizable } from 're-resizable';
import { DataContext } from '../../Contexts/DataContext';
import setMonacoTheme from '../../Utils/monaco-theme';

export default function ResponsePanel() {
  const { values: { lastResponse } } = useContext(DataContext);

  return (
    <div className="grid grid-rows-[minmax(0,1fr)] grid-cols-[minmax(0,1fr) h-full">
      <Resizable
        className="h-full border-l-8 border-black/10 responsePanel"
        defaultSize={{
          width: 700,
          height: 'auto',
        }}
        enable={{
          left: true,
        }}
      >
        <Editor
          height="100%"
          defaultLanguage="json"
          theme="playground"
          value={lastResponse ? JSON.stringify(lastResponse, null, 2) : ''}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            lineNumbers: 'off',
            scrollBeyondLastLine: false,
            // @ts-ignore
            renderIndentGuides: false,
            automaticLayout: true,
            fontSize: 14,
            wordWrap: 'on',
            folding: false,
          }}
          beforeMount={setMonacoTheme}
        />
      </Resizable>
    </div>
  );
}
