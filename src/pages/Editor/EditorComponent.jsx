import React, { useState, useEffect, useContext } from 'react';
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
import { useParams } from 'react-router-dom';
import { socket } from '../../socket/socket';
import { useUser } from '@clerk/clerk-react';
import { ThemeContext } from '../../App';
import './EditorPanel.css';

function EditorComponent() {
  const [code, setCode] = useState('function sayHi() {\n  console.log("👋 Hello world!");\n}\n\nsayHi()');
  const [theme, setTheme] = useState(dracula);
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('monospace');
  const {user} = useUser();
  const [selectedPanel, setSelectedPanel] = useState('Files');
  const { theme: appTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const params = useParams();

  useEffect(() => {
    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });
    socket.on("roomUsersUpdate",(user)=>{
      setUsers(user);
    })
    socket.on("message",(msgData)=>{
      setMessages(prev=>[...prev,msgData]);
    })
    if(params.id){
      const roomId= params.id;
      socket.emit("joinRoom",{roomId,user:user.username});
    }
    return () => {
      socket.off("codeChange");
      socket.off("roomUsersUpdate")
      socket.off("joinRoom")
    };
  }, [params.id,user.username]);

  const getCode = () => {
    return code;
  }
  
  const handleCodeChange = (value) =>{
    setCode(value);
    if(params.id){
      const roomId = params.id;
      socket.emit("codeChange",{roomId,value});
    }
  }

  const togglePanel = (panelName) => {
    setSelectedPanel(prev => (prev === panelName ? null : panelName));
  };

  const sendMsg = (message) => {
    const msgData = {message,user:user.username,time:new Date().toLocaleTimeString()};
    socket.emit('message',{roomId:params.id,message:msgData});
  }

  return (
    <Split className={`split ${appTheme}`} style={{ height: "100vh" }} sizes={[8, 27, 65]} direction="horizontal" visible={false}>
      <Sidebar onSelect={togglePanel} selected={selectedPanel} />
      
      {/* Only render the selected panel */}
      {selectedPanel && <div className={`editor-panel ${appTheme}`}>
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
        {selectedPanel === "Users" && <UsersPanel users={users} />}
        {selectedPanel === "Chat" && <ChatPanel sendMsg={sendMsg} messages={messages} />}
        {selectedPanel === "Files" && <Files />}
        {selectedPanel === "Run" && <RunCode getCode={getCode} />}
        {selectedPanel === "Invite Users" && <InviteUsers />} 
      </div>}

      <Editor
        value={code}
        onChange={handleCodeChange}
        theme={theme}
        language={language}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
    </Split>
  );
}

export default EditorComponent;
