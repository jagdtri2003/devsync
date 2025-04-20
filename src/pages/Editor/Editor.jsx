import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { socket } from '../../socket/socket';

function Editor({ value, onChange, theme, language, fontSize,fontFamily }) {
  const getExtensions = () => {
    return [javascript()];
  };
  useEffect(() => {
    socket.on('requestCodeSync', ({toSocketId}) => {
      socket.emit("codeSync",{to:toSocketId,value})
    });
    return () => {
      socket.off('requestCodeSync');
    };
  }, [value]);

  return (
    <div className="editor-container" style={{ minHeight: '100%', width: '100%', overflow: 'auto' }}>
      <CodeMirror
        value={value || ""}
        minHeight="100vh"
        width='100%'
        theme={theme}
        extensions={getExtensions()}
        onChange={(value, viewUpdate) => onChange(value)}
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
