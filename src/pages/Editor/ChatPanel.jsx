import React, { useState, useEffect } from 'react';
import { socket } from '../../socket/socket';
import { useUser } from '@clerk/clerk-react';

function ChatPanel({ sendMsg, messages }) {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  
  const handleSend = () => {
    messages.push({message,user:user.username,time:new Date().toLocaleTimeString()});
    sendMsg(message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSend();
      }
    }
  };

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div>
      <h3 className="panel-title">Chat</h3>
      
      <div className="panel-section chat-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isCurrentUser = msg.user === user.username;
            return (
              <div 
                key={index} 
                className={`chat-message ${isCurrentUser ? 'my-message' : 'other-message'}`}
              >
                <span className="chat-message-user">{isCurrentUser ? 'You' : msg.user}</span>
                <span className="chat-message-time">{msg.time}</span>
                <span className="chat-message-content">{msg.message}</span>
              </div>
            );
          })
        ) : (
          <div className="chat-message-placeholder">No messages yet</div>
        )}
      </div>
      
      <div className="panel-section">
        <textarea 
          className="panel-textarea" 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <button 
          className="panel-button primary" 
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
