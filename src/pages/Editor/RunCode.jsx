import React, { useState } from 'react';

function RunCode({ getCode }) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    const files = [
      {
        name: 'index.js',
        content: getCode()
      }
    ]
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language:'javascript', stdin:'' ,version:'1.32.3',files })
      })
      const data = await response.json();
      setOutput(data.run.output || 'No output returned.');

    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    
    setIsRunning(false);
  };
  
  return (
    <div>
      <h3 className="panel-title">Run Code</h3>
      
      <div className="panel-section">
        <button 
          className="panel-button primary" 
          onClick={executeCode}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      
      <div className="panel-section">
        <label className="panel-label">Output</label>
        <div className="code-output">
          {output ? output : 'Code output will appear here...'}
        </div>
      </div>
    </div>
  );
}

export default RunCode;
