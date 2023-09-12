import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './codeConverter.css'
import emailjs from '@emailjs/browser';



const CodeConverter = () => {
  const [input, setInput] = useState('');
  const [language,setLanguage] = useState('');
  const [loading,setLoading]=useState(false)
  const [converter, setConverter] = useState('');
  const [languageError, setLanguageError] = useState('')
  const [inputError, setInputError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
   const [submit,setSubmit] = useState(false)

  // console.log("input",input)
  const selectRef = useRef(null);

  useEffect(() => {
    if (converter !== '' && converter !== 'No output produced') {
      console.log("res-setConverter", converter);
    }
  }, [converter]);


  const axiosInstance = axios.create({
    // Remove the transformResponse configuration
    responseType: 'json',
  });
  

const handleRunCode = async () => {
  if (input.trim() === '') {
    setInputError('Please fill in the input field.');
    return;
  }
  setLoading(true)
  try {
    setLoading(true)
    const response = await axiosInstance.post('https://fine-plum-dibbler-hat.cyclic.cloud/runCode', {
      input: input,
    });

    console.log('Response from backend:', response.data);
    
    if (response.data !== undefined) {
      let parsedData = response.data;
      if (typeof parsedData === 'string') {
        // Try to parse the data if it's a JSON string
        try {
          parsedData = JSON.parse(parsedData);
        } catch (error) {
          console.log('Error parsing JSON:', error);
        }
      }

      console.log('Output from backend:', parsedData);
      setConverter(parsedData);

      // Log object properties and values
      for (const key in parsedData) {
        if (parsedData.hasOwnProperty(key)) {
          console.log(`Key: ${key}, Value: ${parsedData[key]}`);
        }
      }
      
    } else if (response.data && response.data.error) {
      console.log("Error running code:", response.data.error);
     
    } else {
      console.log("No output produced");
      
    }
  } catch (error) {
    console.log(error);
    
  }finally {
    setLoading(false); // Set loading state back to false
  }
};



  const handleConvert= async () => {
    if (input.trim() === '') {
      setInputError('Please fill in the input field.');
      return;
    }
    try {
      if (!language) {
        setLanguageError('Please select a language');
       
        selectRef.current.focus();
        return;
      } else{
        setLanguageError('')
      }

      setLoading(true)
      const response = await axios.post(`https://fine-plum-dibbler-hat.cyclic.cloud/convert?language=${language}`, {
       
        input: input,
      });
  
      if (!response.data || response.data.error) {
        console.log('Code not converted!!');
      } else {
     //   console.log(response.data);
      
        setConverter(response.data);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // Set loading state back to false
    }
  };


  
  const handleDebug = async () => {
    if (input.trim() === '') {
      setInputError('Please fill in the input field.');
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post('https://fine-plum-dibbler-hat.cyclic.cloud/debug', {
        input: input,
      });
  
      if (!response.data || response.data.error) {
        console.log('Error debugging code!!');
      } else {
        //console.log(response.data);
        setConverter(response.data); 
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleQualityCheck = async (input) => {
    if (input.trim() === '') {
      setInputError('Please fill in the input field.');
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post('https://fine-plum-dibbler-hat.cyclic.cloud/qualityCheck', {
        input: input,
      });
  
      if (!response.data || response.data.error) {
        console.log('Error performing quality check!!');
      } else {
       // console.log(response.data);
        setConverter(response.data); 
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleQualityCheckButtonClick = () => {
    
    handleQualityCheck(input);
  };

  const handleClear = () => {
    setInput('');
    setConverter('');
  };




  
  
  return (
    <div className="main-container">
      <div id='heading'><h1>Effortless Code Conversion, Debugging, and Quality Assurance</h1></div>
         
      <div className="code-converter-container">
          <div className="buttons-container" >
          
                   <select className="custom-select"   ref={selectRef} value={language}  onChange={(e) => setLanguage(e.target.value)}>
                         <option value=""> Select Language</option>
                          <option value="Python">Python</option>
                          <option value="Java">Java</option>
                         <option value="JavaScript">JavaScript</option>
                          <option value="C++">C++</option>
                         <option value="PHP">PHP</option>
                   </select>
               </div>
       
        {/* Code input */}
        <div className="code-editor-container">
          <div className="code-input-container">
            <textarea
              
              id="code-input"
              rows={10}
              cols={50}
              placeholder="Enter code here..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setInputError('');
              }}
              
            />
              {inputError && <p className="error-message">{inputError}</p>}
          </div>

          {/* Output */}
          <div className="code-output-container">
            <textarea
            id="code-output"
              rows={10}
              cols={50}
              value={loading ? "loading..." : converter}
              // value={loading ? "Loading..." : JSON.stringify(converter, null, 2)}
              readOnly
              placeholder="Output will appear here..."
            />
            {/* {output} */}
          </div>
        </div>
   
      </div>

      <div id='btm-button'>
        <button onClick={handleRunCode}>Run Code</button>
          <button onClick={handleConvert}>Convert </button>
          <button onClick={handleDebug}>Debug </button>
          <button onClick={() => handleQualityCheck(input)}>Check Quality</button>
          <button onClick={handleClear}>Clear </button>
        </div>

       

      

    </div>
  );
};

export default CodeConverter;