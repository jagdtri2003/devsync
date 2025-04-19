import React, { useState } from 'react';

function ChatPanel() {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    // Implementation for sending message would go here
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div>
      <h3 className="panel-title">Chat</h3>
      
      <div className="panel-section chat-messages">
        {/* Chat messages would be displayed here */}
        <div className="chat-message-placeholder">No messages yet</div>
      </div>
      
      <div className="panel-section">
        <textarea 
          className="panel-textarea" 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
