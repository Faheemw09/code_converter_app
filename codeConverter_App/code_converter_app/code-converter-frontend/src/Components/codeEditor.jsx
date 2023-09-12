

import React, { useState } from 'react';
import axios from 'axios';
import './codeConverter.css'

const CodeConverter = () => {
  const [input, setInput] = useState('');
  const [Language,setLanguage] = useState('');

  const [converter, setConverter] = useState('');

  const languages = ['JavaScript', 'Python', 'Java', 'C', 'C++']; // Add more supported languages

  
  const handleConvert= async()=>{
    try{
       
        const response = await fetch(`http://localhost:8080/convert?language=${Language}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({input:input}),
        });
        if(!response.ok){
          console.log("code not converted!!")
        }
        const converterData= await response.json();
      
    
        console.log('Converter Data:', converterData);
        setConverter(converterData);
        
    }
    catch(err){
      console.log(err)
    }
  }
  




    
  return (
    <div className="code-converter-container">
      <h2>Code Converter, Debugger, Quality Checker App</h2>
      {/* Language selection and buttons */}
      <div className="buttons-container">
        
        <select value={Language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <button onClick={handleConvert}>Convert</button>
        <button >Debug</button>
        <button >Check Quality</button>
      </div>
      {/* Code input */}
      <div className="code-editor-container">
        <textarea
          className="code-input"
          rows={10}
          cols={50}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* Output */}
        <div className="code-output">
          <h3>Output:</h3>
          <textarea rows={10} cols={50} value={converter} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CodeConverter;