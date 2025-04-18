import React, { useState } from 'react';
import Split from "@uiw/react-split";
import Editor from './Editor';
import SettingsPanel from './SettingsPanel';
import UsersPanel from './UsersPanel';
import ChatPanel from './ChatPanel';   
import { dracula } from '@uiw/codemirror-themes-all';
import Sidebar from './Sidebar';
import Files from './Files';
import RunCode from './RunCode';
import InviteUsers from './InviteUsers';
function EditorComponent() {
  const [code, setCode] = useState('function sayHi() {\n  console.log("👋 Hello world!");\n}\n\nsayHi()');
  const [theme, setTheme] = useState(dracula);
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('monospace');

  const [selectedPanel, setSelectedPanel] = useState('Files');

  const togglePanel = (panelName) => {
    setSelectedPanel(prev => (prev === panelName ? null : panelName));
  };

  return (
    <Split className="split" style={{ height: "100vh" }} sizes={[7, 23, 70]} direction="horizontal" visible={false}>
      <Sidebar onSelect={togglePanel} selected={selectedPanel} />
      
      {/* Only render the selected panel */}
      <div>
        {selectedPanel === "Settings" && (
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
        {selectedPanel === "Users" && <UsersPanel />}
        {selectedPanel === "Chat" && <ChatPanel />}
        {selectedPanel === "Files" && <Files />}
        {selectedPanel === "Run" && <RunCode />}
        {selectedPanel === "Invite Users" && <InviteUsers />} 
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
