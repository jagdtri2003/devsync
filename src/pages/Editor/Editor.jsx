import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function Editor({ value, onChange, theme, language, fontSize,fontFamily }) {
  // Fix for the theme extension error
  const getExtensions = () => {
    // Always include JavaScript extension as the default
    return [javascript()];
  };

  return (
    <div className="editor-container" style={{ minHeight: '100%', width: '100%', overflow: 'auto' }}>
      <CodeMirror
        value={value || ""}
        minHeight="100vh"
        width='100%'
        theme={theme}
        extensions={getExtensions()}
        onChange={onChange}
        style={{ fontSize: `${fontSize}px`  }}
        className={`font-${fontFamily.replace(/\s+/g, '-')}`}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}

export default Editor;
