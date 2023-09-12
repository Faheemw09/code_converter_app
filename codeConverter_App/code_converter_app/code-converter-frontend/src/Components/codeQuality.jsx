

import React, { useState } from 'react';
import axios from 'axios';
import './codeConverter.css'

const CodeQualityChecker = () => {
  const [code, setCode] = useState('');
  const [qualityResult, setQualityResult] = useState('');

  const handleCheckQuality = () => {
    axios
      .post('/api/check-quality', { code })
      .then((response) => {
        setQualityResult(response.data.qualityResult);
      })
      .catch((error) => {
        console.error('Error checking code quality:', error);
      });
  };

  return (
    <div>
      <h2>Code Quality Checker</h2>
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
        <button onClick={handleCheckQuality}>Check Quality</button>
      </div>
      <div>
        <h3>Quality Result:</h3>
        <pre>{qualityResult}</pre>
      </div>
    </div>
  );
};

export default CodeQualityChecker;