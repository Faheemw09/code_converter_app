

import React, { useState } from 'react';
import axios from 'axios';
import './codeConverter.css'
const CodeDebugger = () => {
  const [code, setCode] = useState('');
  const [debuggedCode, setDebuggedCode] = useState('');

  const handleDebug = () => {
    axios
      .post('/api/debug', { code })
      .then((response) => {
        setDebuggedCode(response.data.debuggedCode);
      })
      .catch((error) => {
        console.error('Error debugging code:', error);
      });
  };

  return (
    <div>
      <h2>Code Debugger</h2>
      <div>
        <textarea
          rows={10}
          cols={50}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ fontFamily: 'monospace', fontSize: '14px', width: '100%' }}
        />
      </div>
      <div>
        <button onClick={handleDebug}>Debug</button>
      </div>
      <div>
        <h3>Debugged Code:</h3>
        <pre>{debuggedCode}</pre>
      </div>
    </div>
  );
};

export default CodeDebugger;