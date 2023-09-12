import React from 'react'
import {Routes,Route, Router} from 'react-router-dom'
import CodeConverter from './codeConveter'
import Home from './home'


export const Allroutes = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
         
          <Route path="/codeConverter" element={<CodeConverter/>} />
        </Routes>
    </div>
  )
}
