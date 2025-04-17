import React, { useState } from 'react';
import Split from "@uiw/react-split";
import Editor from './Editor';
import SettingsPanel from './SettingsPanel';
import UsersPanel from './UsersPanel';
import ChatPanel from './ChatPanel';   
import { dracula } from '@uiw/codemirror-themes-all';
import Sidebar from './Sidebar';

function EditorComponent() {
  const [code, setCode] = useState('function sayHi() {\n  console.log("👋 Hello world!");\n}\n\nsayHi()');
  const [theme, setTheme] = useState(dracula);
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('monospace');

  const [selectedPanel, setSelectedPanel] = useState(null);

  const togglePanel = (panelName) => {
    setSelectedPanel(prev => (prev === panelName ? null : panelName));
  };

  return (
    <Split className="split" style={{ height: "100vh" }} sizes={[7, 23, 70]} direction="horizontal" visible={false}>
      <Sidebar onSelect={togglePanel} selected={selectedPanel} />
      
      {/* Only render the selected panel */}
      <div>
        {selectedPanel === "settings" && (
          <SettingsPanel
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
        )}
        {selectedPanel === "users" && <UsersPanel />}
        {selectedPanel === "chat" && <ChatPanel />}
        {/* Add other panels like Run, Files, etc */}
      </div>

      <Editor
        value={code}
        onChange={setCode}
        theme={theme}
        language={language}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
    </Split>
  );
}

export default EditorComponent;
