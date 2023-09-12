// home.jsx

import React, { useRef, useState } from 'react';
import './home.css';
import localImage from './images/codeconv.png'; // Import the local image
import localVideo from './images/code-convert-demo.mp4';
import { Link } from 'react-router-dom';
import { Allroutes } from './Allroutes';
import emailjs from '@emailjs/browser'
const Home = () => {
    const [inputError, setInputError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
   const [submit,setSubmit] = useState(false)
   const form=useRef()
   const handleContactSubmit = (e)=>{
    setSubmit(true)
    e.preventDefault()
    emailjs.sendForm(
       "service_ybdbvlg",
       "template_58lgnfh",
       form.current,
       "lwZOPaDuS1TnsLbzQ"
    )
    .then((res)=>{
      console.log(res.text)
    },(error)=>{
      console.log(error.text)
    })
    setUserEmail("")
    setUserMessage("")
    setTimeout(()=>{setSubmit(false)},3000)
}

    return (
      <div id='home_bc'>
        <div className="home-page">
            <div className="centered-content">
                <h1>Your Go-To Solution for One-Click Code Conversion</h1>
                <img
                    src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQmTbb3RE89MYqodDaElNgr0_1-BcpxgEPqs7yBbxKfh6829Ijz' // Use the imported local image
                    alt="CodeMorpher"
                    className="app-logo"
                />
                <h5>Streamline Code Conversion and Save Hours of Time Without the Hassle of Learning a New Language</h5>

                <Link to='/codeConverter'>
                <button className="get-started-button">Get Started</button>
                </Link>
            </div>
           
        </div>
        <div className="additional-content">
          
              <video
                    autoPlay
                    muted
                    loop
                    className="additional-video"
                >
                    <source src={localVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
               
            </div>

            <div className="languages">
                <div className="lang-content">
                <h1>Programming Languages</h1>
<h5>Easily Convert Code Between a Wide Variety of Programming Languages</h5>

                    <img
                        src='https://res.cloudinary.com/practicaldev/image/fetch/s--YMmPmrcz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/qsnlr85xl4bnaz8jkkn9.png'
                        alt="Additional Image"
                        className="lang-image"
                    />
                </div>
            </div>

            <div className="why_con">
            <div className='why_heading'>
    <h1>Why Opt for Code Conversion with Us?</h1>
</div>

<div className='outer-box'>
    <div className="inner-box">
        <h2>Time-Saving</h2>
        <p>Automate code conversion to eliminate the manual rewriting of code in a different language.</p>
    </div>
    
    <div className="inner-box">
        <h2>No Setup Needed</h2>
        <p>Say goodbye to downloading or installing software. Simply paste your code, click, and watch it transform seamlessly into your chosen programming language.</p>
    </div>

    <div className="inner-box">
        <h2>User-Friendly</h2>
        <p>Our tool features a beginner-friendly interface and an intuitive process, making it accessible to those new to programming.</p>
    
</div>
              </div>
                
         </div>
         <div id='contact'>
            <h1>Contact</h1>
            <p>Excited to connect with you! Feel free to get in touch using the form below for sharing your feedback or questions.</p>

            <div className='contact'>
              <form ref={form} onSubmit={handleContactSubmit}>
                <input type='email' placeholder='Enter your email ' name='email'value={userEmail}
                         onChange={(e) => setUserEmail(e.target.value)} required/>

                <textarea placeholder='Enter Message' name='message' value={userMessage}
                         onChange={(e) => setUserMessage(e.target.value)} required/>

           {submit ? (<div className='msg'>Message sent successfully</div>) : (<></>)}

                <button type='submit'>Submit</button>
              </form>  
            </div>

        </div>





         <div className='bottom'>
                  <div className='image'><img src='https://web-eau.net/images/svg/undraw_coder.svg'/></div>
                  <div className='content'>
                  <h1>Begin Your Journey Today, No Charges or Login Required!</h1>
<p>There's no requirement for credit card information or logging in.</p>
                    <Link to="/CodeConverter">
                     <button id='content'>Try for free</button>
                     </Link>
                  </div>
              </div>

          <div className='fotter'> 
          <div>Contact Us</div>
    <div>Tutorials</div>
    <div>Feedback</div>
    <div>Privacy Notice</div>
    <div>User Agreement</div>
         </div>    

         {/* <Allroutes/> */}

    </div>
    );
}

export default Home;


