import React from 'react';
import { Editor } from '@monaco-editor/react';

const val = `query SearchQuery(
  $term: String
  $filter: ProductFilterInput
  $productsPage: Int = 1
  $sort: ProductSortInput
) {
  products: search (
    search: $term
    filter: $filter
    pageSize: 100
    currentPage: $productsPage
    test: null
    sort: $sort
  ) {
    items {
      id @export(as: "product_id")
      sku
      name
    }
    total_count
  }
}`;

const configuration = {
  comments: {
    lineComment: '#',
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"""', close: '"""', notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"""', close: '"""' },
    { open: '"', close: '"' },
  ],
  folding: {
    offSide: true,
  },
};

export default function GraphQLEditor() {
  const editorWillMount = (monaco: any) => {
    monaco.languages.register({ id: 'graphql-new' });

    monaco.languages.setMonarchTokensProvider('graphql-new', {
      defaultToken: 'invalid',
      typeKeywords: ['Int', 'Float', 'String', 'Boolean', 'ID'],
      keywords: [
        'query',
        'mutation',
        'subscription',
        'null',
        'true',
        'false',
        'fragment',
        'on',
      ],
      operator: ['=', '!', '?', ':', '&', '|'],
      symbols: /[=!?:&|]+/,
      escapes: /\\(?:["\\/bfnrt]|u[0-9A-Fa-f]{4})/,
      tokenizer: {
        root: [
          [
            /query|mutation|subscription/,
            {
              cases: {
                '@keywords': 'keyword',
                '@default': 'key.identifier',
              },
            },
          ],
          [/[()]/, { token: 'delimiter', bracket: '@open', next: '@functionWrap' }],
          [/[{}[\]()]/, '@brackets'],
          { include: '@common' },
        ],
        common: [
          [
            /\b[A-Z][\w$]*\b/,
            {
              cases: {
                '@typeKeywords': 'typeKeyword',
                '@default': 'type.identifier',
              },
            },
          ],
          [/\$[a-zA-Z_]\w*/, 'variable'],
          [/[a-zA-Z_]\w*(?=\s*:)/, 'alias'],
          [/\b[A-Z][a-zA-Z_]\w*\b/, 'type'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
          [/\d+/, 'number'],
          [/[,:]/, 'delimiter'],
          [/#.*$/, 'comment'],
          [/@symbols/, { cases: { '@operator': 'operator', '@default': '' } }],
          [/@\s*[a-zA-Z_$][\w$]*/, { token: 'annotation' }],
          [
            /\w+(?=\s*\()/,
            {
              cases: {
                '@keywords': 'keyword',
                '@default': 'key.identifier',
              },
            },
          ],
          [
            /[a-z_][\w$]*/,
            'field',
          ],
        ],
        functionWrap: [
          [/[a-zA-Z_]\w*(?=\s*:)/, 'parameter'],
          { include: '@common' },
          [/[)]/, { token: 'delimiter', bracket: '@close', next: '@pop' }],
        ],
        string: [
          [/[^\\"]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration('graphql-new', configuration);

    monaco.editor.defineTheme('playground', {
      base: 'vs-dark',
      // inherit: true,
      rules: [
        { token: 'typeKeyword', foreground: 'f07178', fontStyle: 'bold' },
        { token: 'keyword', foreground: 'c792ea', fontStyle: 'bold' },
        { token: 'key.identifier', foreground: 'c792ea' },
        { token: 'variable', foreground: '82aaff' },
        { token: 'alias', foreground: '36bcda', fontStyle: 'bold' },
        { token: 'parameter', foreground: 'ffa700' },
        { token: 'type', foreground: 'ffcb6b' },
        { token: 'field', foreground: 'a6accd' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'delimiter', foreground: '9e9e9e' },
        { token: 'operator', foreground: '9e9e9e' },
        { token: 'annotation', foreground: '98a848' },
        { token: 'comment', foreground: '676e95', fontStyle: 'italic' },
        { token: 'invalid', foreground: 'ff5370', background: '2d2a2e' },
      ],
      colors: {
        'editor.background': '#1e1e2e', // Background color of the editor
        'editor.foreground': '#ffffff', // Default text color
        'editor.lineHighlightBackground': '#2c2c3e', // Line highlight color
        'editorCursor.foreground': '#ffcc00', // Cursor color
        'editor.selectionBackground': '#5c5c7e77', // Selection color
        'editor.inactiveSelectionBackground': '#5c5c7e55', // Inactive selection color
      },
    });
  };

  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,1fr)]">
      <Editor
        height="100%"
        defaultLanguage="graphql-new"
        language="graphql-new"
        defaultValue={val}
        theme="playground"
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
        }}
        beforeMount={editorWillMount}
      />
    </div>
  );
}
